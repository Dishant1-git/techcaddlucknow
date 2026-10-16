"use client";

import { NavLink } from "../../NavLink";
import { useId, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Briefcase,
  Code,
  Lightbulb,
  Mail,
  MessageSquare,
  RefreshCw,
  RotateCcw,
  Send,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import {
  buildDrafts,
  defaultInputs,
  emailTracks,
  goals,
  LINKEDIN_LIMIT,
  parseEmail,
  recipients,
  tips,
  type EmailInputs,
  type RecipientId,
} from "@/lib/resources/tools/coldEmail";
import { callAiTool, CopyButton, Dots, ErrorNote } from "./ToolClient";
import { choiceClass, inputClass, labelClass } from "./styles";

const recipientIcons: Record<RecipientId, typeof Users> = {
  founder: Briefcase,
  hr: Users,
  tech_lead: Code,
  alumni: Target,
};

const tabs = [
  { id: "email", label: "Cold email & follow-up", icon: Mail },
  { id: "note", label: "LinkedIn note (300 chars)", icon: MessageSquare },
  { id: "dm", label: "LinkedIn DM / InMail", icon: Send },
] as const;

type AiDraft = { subject: string; body: string; raw: boolean };

function Block({ children }: { children: string }) {
  return (
    <div className="whitespace-pre-wrap break-words rounded-2xl border border-slate-100 bg-slate-50 p-4 text-[14px] leading-relaxed text-slate-700 sm:p-5">
      {children}
    </div>
  );
}

function CardHead({ eyebrow, heading, children }: { eyebrow: string; heading: string; children?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">{eyebrow}</p>
        <h3 className="mt-1 font-display text-lg font-bold text-navy">{heading}</h3>
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}

export function ColdEmailTool() {
  const id = useId();
  const [inputs, setInputs] = useState<EmailInputs>(defaultInputs);
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("email");
  const [ai, setAi] = useState<AiDraft | null>(null);
  const [showAi, setShowAi] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const drafts = buildDrafts(inputs);
  const usingAi = showAi && ai !== null;
  const subject = usingAi ? ai.subject : drafts.subject;
  const body = usingAi ? ai.body : drafts.body;
  const noteLength = drafts.linkedinNote.length;
  const noteOk = noteLength <= LINKEDIN_LIMIT;

  const set = <K extends keyof EmailInputs>(key: K, value: EmailInputs[K]) =>
    setInputs((s) => ({ ...s, [key]: value }));

  async function improve() {
    if (pending) return;
    setPending(true);
    setError("");
    const res = await callAiTool("/api/tools/cold-email", {
      subject,
      body,
      track: emailTracks.find((t) => t.id === inputs.track)?.label,
      goal: inputs.goal,
      recipientType: inputs.recipientType,
      recipientName: inputs.recipientName,
      company: inputs.company,
    });
    setPending(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    const parsed = parseEmail(res.text);
    setAi(parsed ? { ...parsed, raw: false } : { subject, body: res.text, raw: true });
    setShowAi(true);
  }

  const text = (key: keyof EmailInputs, label: string, placeholder?: string) => (
    <div>
      <label htmlFor={`${id}-${key}`} className={labelClass}>
        {label}
      </label>
      <input
        id={`${id}-${key}`}
        value={String(inputs[key])}
        placeholder={placeholder}
        onChange={(e) => set(key, e.target.value as never)}
        className={inputClass}
      />
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      {/* Setup */}
      <div className="space-y-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">1. Outreach setup &amp; audience</p>
          <p className="mt-2 text-sm text-slate-600">
            Select your target profile — the drafts update as you type.
          </p>
        </div>
        <div>
          <label htmlFor={`${id}-track`} className={labelClass}>
            Your target tech track
          </label>
          <select
            id={`${id}-track`}
            value={inputs.track}
            onChange={(e) => {
              const t = emailTracks.find((x) => x.id === e.target.value) ?? emailTracks[0];
              setInputs((s) => ({ ...s, track: t.id, skills: t.defaultSkills, project: t.defaultProject }));
            }}
            className={inputClass}
          >
            {emailTracks.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p id={`${id}-goal`} className={labelClass}>
            Outreach goal
          </p>
          <div role="group" aria-labelledby={`${id}-goal`} className="grid gap-2 sm:grid-cols-2">
            {goals.map((g) => (
              <button
                key={g.id}
                type="button"
                aria-pressed={inputs.goal === g.id}
                onClick={() => set("goal", g.id)}
                className={choiceClass(inputs.goal === g.id)}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p id={`${id}-recipient`} className={labelClass}>
            Who are you messaging?
          </p>
          <div role="group" aria-labelledby={`${id}-recipient`} className="grid gap-2 sm:grid-cols-2">
            {recipients.map((r) => {
              const Icon = recipientIcons[r.id];
              return (
                <button
                  key={r.id}
                  type="button"
                  aria-pressed={inputs.recipientType === r.id}
                  onClick={() => set("recipientType", r.id)}
                  className={`flex items-center gap-2.5 ${choiceClass(inputs.recipientType === r.id)}`}
                >
                  <Icon className="size-4 shrink-0 text-brand" />
                  {r.label}
                </button>
              );
            })}
          </div>
          <p className="mt-1.5 text-[12px] text-slate-500">Changes how the email opens.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {text("recipientName", "Recipient name", "e.g. Priya")}
          {text("company", "Target company", "e.g. Zomato / Google")}
          {text("yourName", "Your name")}
          {text("degree", "Degree / college")}
        </div>
        {text("skills", "Top technical skills")}
        {text("project", "Key capstone / project highlight")}
        {text("github", "GitHub / portfolio link")}
      </div>

      {/* Output */}
      <div className="min-w-0">
        <div role="tablist" aria-label="Message type" className="grid gap-2 sm:grid-cols-3">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`${id}-tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`${id}-panel`}
              onClick={() => setTab(t.id)}
              className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-[13px] font-bold transition ${
                tab === t.id
                  ? "border-navy bg-navy text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-brand/40 hover:text-brand"
              }`}
            >
              <t.icon className="size-4" />
              {t.label}
            </button>
          ))}
        </div>

        <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${tab}`} className="mt-5 space-y-5">
          {tab === "email" && (
            <>
              <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-lg shadow-hero-950/5 sm:p-6">
                <CardHead eyebrow="Primary cold email" heading={usingAi ? "AI-polished version" : "Short, specific, easy to reply to"}>
                  <CopyButton text={`Subject: ${subject}\n\n${body}`} label="Copy full email" />
                  <CopyButton text={subject} label="Copy subject" />
                </CardHead>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={improve}
                    disabled={pending}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-sky px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {pending ? (
                      <>
                        Improving <Dots />
                      </>
                    ) : (
                      <>
                        <Sparkles className="size-4" /> {usingAi ? "Improve again" : "Improve with AI"}
                      </>
                    )}
                  </button>
                  {!usingAi && (
                    <button
                      type="button"
                      onClick={() => set("variation", inputs.variation === 0 ? 1 : 0)}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-navy transition hover:border-brand hover:text-brand"
                    >
                      <RefreshCw className="size-4" /> Regenerate variation
                      <span className="text-[12px] font-normal text-slate-500">Style {inputs.variation + 1} of 2</span>
                    </button>
                  )}
                  {ai && (
                    <button
                      type="button"
                      onClick={() => setShowAi(!showAi)}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-navy transition hover:border-brand hover:text-brand"
                    >
                      {showAi ? (
                        <>
                          <RotateCcw className="size-4" /> Revert to template
                        </>
                      ) : (
                        <>
                          <Sparkles className="size-4" /> Show AI version
                        </>
                      )}
                    </button>
                  )}
                </div>
                {error && (
                  <div className="mt-4">
                    <ErrorNote>{error}</ErrorNote>
                  </div>
                )}
                {usingAi && (
                  <p className="mt-4 rounded-xl bg-brand/5 px-4 py-2.5 text-[13px] text-slate-600">
                    {ai.raw
                      ? "Showing the AI reply as written — check the subject line before sending."
                      : "Polished by AI from your draft. Your inputs no longer change this version — revert to edit the template."}{" "}
                    Read it through before you send.
                  </p>
                )}

                <div aria-live="polite" className={`mt-5 space-y-4 ${pending ? "opacity-60" : ""}`}>
                  <div>
                    <p className="mb-1.5 text-[12px] font-bold text-slate-500">Subject line:</p>
                    <Block>{subject}</Block>
                  </div>
                  <div>
                    <p className="mb-1.5 text-[12px] font-bold text-slate-500">Email body:</p>
                    <Block>{body}</Block>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-lg shadow-hero-950/5 sm:p-6">
                <CardHead eyebrow="Day 4 follow-up email" heading="Send 3–4 days later if there's no reply">
                  <CopyButton text={drafts.followUp} label="Copy follow-up" />
                </CardHead>
                <div className="mt-4">
                  <Block>{drafts.followUp}</Block>
                </div>
              </div>
            </>
          )}

          {tab === "note" && (
            <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-lg shadow-hero-950/5 sm:p-6">
              <CardHead eyebrow="LinkedIn connection request" heading="Hard 300-character limit checked">
                <CopyButton text={drafts.linkedinNote} label="Copy note" />
              </CardHead>
              <div className="mt-4">
                <Block>{drafts.linkedinNote}</Block>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[13px]">
                <span className={`font-semibold ${noteOk ? "text-emerald-600" : "text-rose-600"}`}>
                  Character count: {noteLength} / {LINKEDIN_LIMIT} characters
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                    noteOk ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                  }`}
                >
                  {noteOk ? "Safe to send ✓" : "Over 300 chars limit — shorten your inputs"}
                </span>
              </div>
            </div>
          )}

          {tab === "dm" && (
            <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-lg shadow-hero-950/5 sm:p-6">
              <CardHead eyebrow="LinkedIn direct message / InMail" heading="For 1st-degree connections">
                <CopyButton text={drafts.linkedinDm} label="Copy DM" />
              </CardHead>
              <div className="mt-4">
                <Block>{drafts.linkedinDm}</Block>
              </div>
            </div>
          )}

          <div className="rounded-3xl border border-sun/40 bg-sun/10 p-5 sm:p-6">
            <p className="flex items-center gap-2 font-display font-bold text-navy">
              <Lightbulb className="size-5 text-amber-500" /> {tips.heading}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-700">
              {tips.tips.map((t) => (
                <li key={t.label}>
                  <strong className="text-navy">{t.label}</strong> {t.text}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-slate-600">
              {tips.footer.text}{" "}
              <NavLink href={tips.footer.href} className="group inline-flex items-center gap-1 font-bold text-brand">
                {tips.footer.cta}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
