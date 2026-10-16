// Class names shared by the tool forms (safe to import from client components).
/** Text input / select on a light card. 16px on phones so iOS does not zoom. */
export const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-navy outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10 sm:text-sm";

export const labelClass = "mb-2 block text-[13px] font-bold text-navy";

/** Option button in a single-choice group. */
export const choiceClass = (on: boolean) =>
  `rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
    on
      ? "border-brand bg-brand/5 text-navy ring-2 ring-brand/15"
      : "border-slate-200 bg-white text-slate-600 hover:border-brand/40 hover:text-navy"
  }`;

export const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-full bg-navy px-7 py-3.5 font-bold text-white transition hover:bg-brand disabled:cursor-not-allowed disabled:opacity-60";

export const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-60";
