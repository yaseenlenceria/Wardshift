export type SubmitResult = { ok: true } | { ok: false; message: string };

export async function submitForm(
  form: "contact" | "growth-review",
  fields: Record<string, string>,
): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ form, website: "", referrer: window.location.href, ...fields }),
    });
    const payload = (await res.json().catch(() => null)) as
      | { ok?: boolean; errors?: Record<string, string> }
      | null;
    if (res.ok && payload?.ok) return { ok: true };
    const firstError = payload?.errors && Object.values(payload.errors)[0];
    if (typeof firstError === "string") return { ok: false, message: firstError };
    return { ok: false, message: "Something went wrong sending your message. Please try again." };
  } catch {
    return { ok: false, message: "Network error — please check your connection and try again." };
  }
}
