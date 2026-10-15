"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { useEnquiry } from "./Enquiry";
import { NavLink } from "./NavLink";

const promises = ["Free career counselling", "No registration fee", "Placement support included"];

/**
 * Closing call to action on the home page: a mobile number field that hands
 * the number to the enquiry popup (which collects the name and course), and a
 * call button.
 */
export function HomeCta() {
  const { open } = useEnquiry();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    open(undefined, phone);
  };

  return (
    <section
      id="contact"
      className="relative isolate overflow-clip bg-slate-50 px-5 pb-14 pt-16 text-center lg:pb-20 lg:pt-24"
    >
      <div
        aria-hidden
        className="orb absolute left-1/2 top-1/2 -z-10 size-[34rem] -translate-x-1/2 -translate-y-1/2 [--orb:rgba(47,125,255,0.12)]"
      />

      <h2
        data-split
        className="mx-auto max-w-3xl font-display text-[clamp(2rem,4.6vw,3.5rem)] font-[800] leading-[1.02] tracking-[-0.04em] text-navy"
      >
        Start building
        <br />
        your career today.
      </h2>
      <p data-reveal className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
        Talk to a counsellor today. One call is usually enough to know which
        track fits your degree, your schedule and the job you want.
      </p>

      <form
        data-reveal
        onSubmit={onSubmit}
        noValidate
        className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-center"
      >
        <label className="sr-only" htmlFor="cta-phone">
          Your mobile number
        </label>
        <input
          id="cta-phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          maxLength={10}
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value.replace(/\D/g, ""));
            setError("");
          }}
          placeholder="Your mobile number"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "cta-phone-error" : undefined}
          className="min-w-0 flex-1 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-base text-navy shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand/50 focus:ring-4 focus:ring-brand/10 sm:text-[15px]"
        />
        <span className="relative isolate shrink-0">
          {/* Soft glow behind the button */}
          <span
            aria-hidden
            className="orb absolute left-1/2 top-1/2 -z-10 size-56 -translate-x-1/2 -translate-y-1/2 [--orb:rgba(255,210,63,0.35)]"
          />
          <button
            type="submit"
            className="w-full rounded-full bg-sun px-8 py-3.5 text-[15px] font-bold text-hero-950 shadow-lg shadow-sun/30 transition hover:brightness-105 sm:w-auto"
          >
            Book Demo
          </button>
        </span>
      </form>
      <p
        id="cta-phone-error"
        role="alert"
        className="mx-auto mt-2 min-h-5 max-w-xl text-left text-sm font-semibold text-red-600 sm:pl-6"
      >
        {error}
      </p>

      <div data-reveal className="mt-4">
        <NavLink
          href={site.phoneHref}
          data-magnetic
          className="inline-flex items-center gap-3 rounded-full bg-brand py-2 pl-2 pr-7 text-left text-white shadow-[0_24px_60px_-18px] shadow-brand transition-colors hover:bg-brand-600"
        >
          <span className="grid size-10 place-items-center rounded-full bg-white/20">
            <Phone className="size-4" />
          </span>
          <span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/75">
              Call now
            </span>
            <span className="block font-display text-lg font-extrabold tracking-tight">
              {site.phone}
            </span>
          </span>
        </NavLink>
      </div>

      <ul
        data-stagger
        className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-2.5 text-sm text-slate-600 sm:flex-row sm:justify-center sm:gap-0 sm:divide-x sm:divide-slate-300 sm:text-[15px]"
      >
        {promises.map((p) => (
          <li key={p} className="flex items-center gap-2 sm:px-6">
            <CheckCircle2 className="size-4 text-brand" />
            {p}
          </li>
        ))}
      </ul>
    </section>
  );
}
