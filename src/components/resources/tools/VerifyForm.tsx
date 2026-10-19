"use client";
import { useSite } from "../../SiteContext";

import { NavLink } from "../../NavLink";
import { useId, useState, type FormEvent } from "react";
import { BadgeCheck, Mail, SearchX, ShieldCheck } from "lucide-react";
import { bgvMailto, CERT_PLACEHOLDER } from "@/lib/resources/tools/verifyCertificate";
import { Dots, ErrorNote } from "./ToolClient";
import { inputClass, labelClass, primaryButton } from "./styles";

type Found = { name: string; course: string; duration: string; issued: string; grade?: string };
type Outcome = { found: true; id: string; record: Found } | { found: false; id: string };

const MAX = 40;

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
};

export function VerifyForm() {
  const site = useSite(); // CMS Settings, over the built-in details
  const id = useId();
  const [value, setValue] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const clean = value.trim().toUpperCase().replace(/\s+/g, "");
    if (!clean) {
      setError("Enter the certificate or roll number.");
      return;
    }
    if (pending) return;
    setPending(true);
    setError("");
    setOutcome(null);
    try {
      const res = await fetch("/api/verify-certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: clean }),
      });
      const json = await res.json().catch(() => null);
      if (!json?.ok) setError(json?.error ?? "Something went wrong. Please try again.");
      else setOutcome(json.found ? { found: true, id: json.id, record: json.record } : { found: false, id: json.id });
    } catch {
      setError("We could not reach the server. Check your connection and try again.");
    }
    setPending(false);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
      <form onSubmit={submit} noValidate>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">Direct registry lookup</p>
        <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-navy">Verify a credential</h2>
        <p className="mt-2 text-sm text-slate-600">
          Enter the certificate or roll number exactly as printed on the certificate or internship letter.
        </p>
        <label htmlFor={`${id}-cert`} className={`${labelClass} mt-6`}>
          Certificate / roll number
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id={`${id}-cert`}
            required
            maxLength={MAX}
            autoComplete="off"
            spellCheck={false}
            placeholder={CERT_PLACEHOLDER}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (outcome) setOutcome(null);
            }}
            className={`${inputClass} uppercase placeholder:normal-case`}
          />
          <button type="submit" disabled={pending} className={`${primaryButton} shrink-0`}>
            {pending ? (
              <>
                Checking <Dots />
              </>
            ) : (
              <>
                <ShieldCheck className="size-4" /> Verify
              </>
            )}
          </button>
        </div>
        {error && (
          <div className="mt-4">
            <ErrorNote>{error}</ErrorNote>
          </div>
        )}
        <p className="mt-6 rounded-2xl bg-slate-50 px-4 py-3 text-[13px] leading-relaxed text-slate-600">
          <strong className="text-navy">For corporate BGV requests:</strong> you can also email a scanned copy of the
          credential to{" "}
          <NavLink href={bgvMailto()} className="font-semibold text-brand hover:underline">
            {site.email}
          </NavLink>{" "}
          with the candidate&apos;s consent letter for written verification on official letterhead.
        </p>
      </form>

      <div aria-live="polite">
        {!outcome && (
          <div className="flex h-full min-h-[14rem] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-brand/8 text-brand">
              <BadgeCheck className="size-7" />
            </span>
            <p className="mt-5 font-display text-lg font-bold text-navy">The result appears here</p>
            <p className="mt-2 max-w-sm text-sm text-slate-600">
              A matching record shows the candidate&apos;s name, course, duration and issue date.
            </p>
          </div>
        )}
        {outcome?.found && (
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-6 sm:p-7">
            <p className="flex items-center gap-2 font-display text-lg font-bold text-emerald-800">
              <BadgeCheck className="size-6" /> Record found
            </p>
            <p className="mt-1 text-sm text-emerald-800/80">Certificate number {outcome.id}</p>
            <dl className="mt-5 grid gap-4 rounded-2xl bg-white p-5 sm:grid-cols-2">
              {(
                [
                  ["Candidate", outcome.record.name],
                  ["Course", outcome.record.course],
                  ["Duration", outcome.record.duration],
                  ["Issued", formatDate(outcome.record.issued)],
                  ...(outcome.record.grade ? [["Grade", outcome.record.grade]] : []),
                ] as [string, string][]
              ).map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">{k}</dt>
                  <dd className="mt-1 font-semibold text-navy">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-[13px] text-slate-600">
              Need a signed confirmation on letterhead?{" "}
              <NavLink href={bgvMailto(outcome.id)} className="font-semibold text-brand hover:underline">
                Email {site.email}
              </NavLink>
              .
            </p>
          </div>
        )}
        {outcome && !outcome.found && (
          <div className="rounded-3xl border border-amber-200 bg-amber-50/60 p-6 sm:p-7">
            <p className="flex items-center gap-2 font-display text-lg font-bold text-amber-800">
              <SearchX className="size-6" /> No record found
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-700">
              We couldn&apos;t find a certificate numbered <strong>{outcome.id}</strong> in the online registry. Check
              the number against the certificate and try again. Some records may not be online yet, so for manual
              verification email our verification desk with a scan of the certificate and the candidate&apos;s
              consent.
            </p>
            <NavLink
              href={bgvMailto(outcome.id)}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-brand"
            >
              <Mail className="size-4" /> Email {site.email}
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
