/**
 * Form submissions endpoint: POST /api/forms
 *
 * Body (JSON): { form: "contact" | "growth-review", website?, ...fields }
 * - Forwards every valid submission to Formspark (submit-form.com), which
 *   emails the account owner (yaseenlenceria@gmail.com).
 * - Best-effort archives the submission in the "Myforms" Edge Config store.
 */

const FORMSPARK_FORM_ID = process.env.FORMSPARK_FORM_ID ?? "CkVmmpWlo";

const EDGE_CONFIG_ID = process.env.EDGE_CONFIG_ID ?? "";
const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN ?? "";
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID ?? "";

const ALLOWED_FORMS = new Set(["contact", "growth-review"]);
const MAX_LENGTHS = {
  name: 120,
  email: 200,
  organisation: 160,
  practice: 160,
  role: 160,
  phone: 40,
  focus: 60,
  message: 4000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(value, max) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validate(form, body) {
  const data = {
    name: str(body.name, MAX_LENGTHS.name),
    email: str(body.email, MAX_LENGTHS.email),
    organisation: str(body.organisation, MAX_LENGTHS.organisation),
    practice: str(body.practice, MAX_LENGTHS.practice),
    role: str(body.role, MAX_LENGTHS.role),
    phone: str(body.phone, MAX_LENGTHS.phone),
    focus: str(body.focus, MAX_LENGTHS.focus),
    message: str(body.message, MAX_LENGTHS.message),
  };

  const errors = {};
  if (!data.name) errors.name = "Please enter your name.";
  if (!data.email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(data.email) || data.email.length > 254)
    errors.email = "Please enter a valid email address.";
  if (form === "contact" && !data.message) errors.message = "Please enter a message.";
  if (form === "growth-review" && !data.focus) errors.focus = "Please select what you'd like to improve.";

  return { data, errors };
}

async function forwardToFormspark(submission) {
  const res = await fetch(`https://submit-form.com/${FORMSPARK_FORM_ID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      "Form type": submission.form === "growth-review" ? "Growth Review request" : "Contact enquiry",
      "Received": submission.record.receivedAt,
      "Page": submission.record.referrer || "n/a",
      Name: submission.record.name,
      Email: submission.record.email,
      "Role / Specialty": submission.record.role || "",
      "Practice / Organisation": submission.record.organisation || submission.record.practice || "",
      Phone: submission.record.phone || "",
      "Wants to improve": submission.record.focus || "",
      Message: submission.record.message || "",
    }),
  });
  if (!res.ok) {
    console.warn(`[forms] Formspark forward failed: HTTP ${res.status} ${await res.text().catch(() => "")}`);
    return false;
  }
  return true;
}

async function storeSubmission(submission) {
  if (!EDGE_CONFIG_ID || !VERCEL_API_TOKEN) {
    console.warn("[forms] Edge Config not configured (EDGE_CONFIG_ID / VERCEL_API_TOKEN) — submission not stored");
    return false;
  }
  const teamQuery = VERCEL_TEAM_ID ? `?teamId=${encodeURIComponent(VERCEL_TEAM_ID)}` : "";
  const res = await fetch(
    `https://api.vercel.com/v1/edge-config/${encodeURIComponent(EDGE_CONFIG_ID)}/items${teamQuery}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${VERCEL_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [{ operation: "upsert", key: submission.key, value: submission.record }],
      }),
    },
  );
  if (!res.ok) {
    console.warn(`[forms] Edge Config write failed: HTTP ${res.status} ${await res.text().catch(() => "")}`);
    return false;
  }
  return true;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  let body;
  try {
    const raw = await new Promise((resolve, reject) => {
      let size = 0;
      const chunks = [];
      req.on("data", (chunk) => {
        size += chunk.length;
        if (size > 32_768) {
          reject(new Error("Payload too large"));
          req.destroy();
          return;
        }
        chunks.push(chunk);
      });
      req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      req.on("error", reject);
    });
    body = JSON.parse(raw || "{}");
  } catch {
    return res.status(400).json({ ok: false, error: "Invalid request body" });
  }

  const form = typeof body.form === "string" ? body.form : "";
  if (!ALLOWED_FORMS.has(form)) {
    return res.status(400).json({ ok: false, error: "Unknown form type" });
  }

  // Honeypot: bots that fill the hidden "website" field get a fake success.
  if (str(body.website, 200)) {
    return res.status(200).json({ ok: true });
  }

  const { data, errors } = validate(form, body);
  if (Object.keys(errors).length > 0) {
    return res.status(422).json({ ok: false, errors });
  }

  const receivedAt = new Date().toISOString();
  const key = `form-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const record = { ...data, form, receivedAt, referrer: str(body.referrer, 300) };
  const submission = { form, key, record };

  let emailed = false;
  let stored = false;
  try {
    [emailed, stored] = await Promise.all([forwardToFormspark(submission), storeSubmission(submission)]);
  } catch (err) {
    console.warn("[forms] delivery error:", err?.message ?? err);
  }

  if (!emailed && !stored) {
    return res.status(502).json({ ok: false, error: "Could not deliver your message. Please try again." });
  }

  return res.status(200).json({ ok: true, emailed, stored });
}
