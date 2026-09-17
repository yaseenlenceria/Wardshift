import type { SVGProps } from "react";

/**
 * WardShift custom thin-line icon set — stroke 1.5, round caps, 24px.
 * Editorial/technical motifs only. Never crosses, hearts, stethoscopes,
 * ECG lines, pills or syringes.
 */

type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps) {
  return {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
}

export function IconBrowser(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M3 9h18" />
      <circle cx="6.2" cy="6.8" r="0.4" fill="currentColor" />
      <circle cx="8.6" cy="6.8" r="0.4" fill="currentColor" />
      <path d="M6.5 13h7M6.5 16h4.5" />
    </svg>
  );
}

export function IconSearchLens(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.3 15.3 20.5 20.5" />
      <path d="M8 10.5a2.5 2.5 0 0 1 2.5-2.5" />
    </svg>
  );
}

export function IconLayers(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.5 20.5 8 12 12.5 3.5 8 12 3.5Z" />
      <path d="M4.5 12 12 16l7.5-4" />
      <path d="M4.5 15.5 12 19.5l7.5-4" />
    </svg>
  );
}

export function IconTarget(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
      <path d="M12 1.8v3M12 19.2v3M1.8 12h3M19.2 12h3" />
    </svg>
  );
}

export function IconShield(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.2 19 6v5.2c0 4.3-2.9 7.6-7 9.3-4.1-1.7-7-5-7-9.3V6l7-2.8Z" />
      <path d="m8.8 11.8 2.3 2.3 4-4.3" />
    </svg>
  );
}

export function IconCompass(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function IconInbox(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 13.5 6.2 5.8A1.6 1.6 0 0 1 7.7 4.5h8.6a1.6 1.6 0 0 1 1.5 1.3L20 13.5" />
      <path d="M4 13.5h4.6l1 2h4.8l1-2H20v4.2a1.8 1.8 0 0 1-1.8 1.8H5.8A1.8 1.8 0 0 1 4 17.7v-4.2Z" />
    </svg>
  );
}

export function IconChatLoop(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 11.5a7.5 7.5 0 0 1-11 6.6L4.5 19.5l1.5-4A7.5 7.5 0 1 1 20 11.5Z" />
      <path d="m9.3 11.2 2 2 3.4-3.7" />
    </svg>
  );
}

export function IconChart(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 4v15.2a.8.8 0 0 0 .8.8H20" />
      <path d="m6.5 15 4-4.5 3 3 5-6.5" />
      <path d="M16 7h2.5v2.5" />
    </svg>
  );
}

export function IconGrowthArrow(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3.5 19.5 9 14l3.5 3.5L20.5 9" />
      <path d="M15.5 8.5H21V14" />
    </svg>
  );
}

export function IconDocument(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 3.5h7L19 8.5V20a.8.8 0 0 1-.8.8H7a.8.8 0 0 1-.8-.8V4.3a.8.8 0 0 1 .8-.8Z" />
      <path d="M13.5 3.8V9H19" />
      <path d="M9 13h6M9 16.2h4" />
    </svg>
  );
}

export function IconMapPin(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s6.5-5.6 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15.4 12 21 12 21Z" />
      <circle cx="12" cy="10.3" r="2.3" />
    </svg>
  );
}

export function IconTick(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m4.5 12.5 5 5L19.5 6.5" />
    </svg>
  );
}
