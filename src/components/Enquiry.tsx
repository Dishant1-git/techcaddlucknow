"use client";

import { NavLink } from "./NavLink";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ButtonHTMLAttributes,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  Code,
  Megaphone,
  RefreshCw,
  Shield,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { after12thCatalogue, courseCatalogue, coursesMenu, googleReviews, site } from "@/lib/site";
import { GoogleG } from "./ui";

/** Opens the enquiry popup, optionally with a course and mobile number filled in. */
const EnquiryContext = createContext<{ open: (course?: string, phone?: string) => void }>({
  open: () => {},
});

export const useEnquiry = () => useContext(EnquiryContext);

const popularTracks = [
  { label: "Artificial Intelligence", icon: Sparkles },
  { label: "Generative AI", icon: Sparkles },
  { label: "Data Science", icon: Sparkles },
  { label: "MERN Full Stack", icon: Code },
  { label: "Digital Marketing", icon: Megaphone },
  { label: "Cyber Security", icon: Shield },
];

const allCourses = Array.from(
  new Set(
    [...coursesMenu, ...courseCatalogue, ...after12thCatalogue].flatMap((col) => col.courses.map((c) => c.label)),
  ),
);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [course, setCourse] = useState("");
  const [phone, setPhone] = useState("");

  // Show the popup once per browser session, like the reference site.
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (sessionStorage.getItem("enquiry-shown")) return;
        sessionStorage.setItem("enquiry-shown", "1");
      } catch {
        return;
      }
      setIsOpen(true);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <EnquiryContext.Provider
      value={{
        open: (c, p) => {
          if (c) setCourse(c);
          if (p) setPhone(p);
          setIsOpen(true);
        },
      }}
    >
      {children}
      {isOpen && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-[100] flex items-center justify-center bg-hero-950/70 p-3 backdrop-blur-sm sm:p-5"
          onClick={() => setIsOpen(false)}
        >
          {/* The close button sits outside the scrolling panel so it never scrolls away */}
          <div className="relative w-full max-w-[54rem]" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur transition hover:bg-white/30 sm:right-4 sm:top-4"
            >
              <X className="size-5" />
            </button>

            <div
              role="dialog"
              aria-modal="true"
              aria-label="Course enquiry"
              className="no-scrollbar grid max-h-[calc(100dvh-1.5rem)] overflow-y-auto overscroll-contain rounded-3xl shadow-2xl sm:max-h-[calc(100dvh-2.5rem)] md:grid-cols-[1fr_1.05fr]"
            >
              {/* On phones the form comes first; this panel follows underneath */}
              <div className="relative isolate order-2 bg-hero-950 p-5 text-white sm:p-6 md:order-1">
                <div className="bg-grid-dark absolute inset-0 -z-10" />
                <div className="glow-dark absolute inset-0 -z-10" />
                <h2 className="font-display text-xl font-extrabold leading-tight tracking-tight sm:text-2xl">
                  👋 Still exploring?
                  <br />
                  Let us help
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                  Talk to a counsellor and we&apos;ll map the shortest route from
                  where you are to the job you want.
                </p>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Popular tracks — tap to pick
                </p>
                <div className="mt-2.5 grid grid-cols-1 gap-2 min-[420px]:grid-cols-2">
                  {popularTracks.map((t) => (
                    <button
                      key={t.label}
                      type="button"
                      aria-pressed={course === t.label}
                      onClick={() => setCourse(t.label)}
                      className={`flex items-center gap-2.5 rounded-xl border p-2 text-left text-[13px] font-semibold leading-tight transition ${
                        course === t.label
                          ? "border-cyan bg-cyan/10 text-white"
                          : "border-white/10 bg-white/5 text-slate-200 hover:border-white/30"
                      }`}
                    >
                      <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-white/10 text-cyan">
                        <t.icon className="size-3.5" />
                      </span>
                      {t.label}
                    </button>
                  ))}
                </div>
                <p className="mt-2.5 text-xs text-slate-400">
                  Not here? The dropdown lists all {allCourses.length} courses.
                </p>

                <NavLink
                  href={googleReviews.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-2.5 text-navy transition hover:-translate-y-0.5"
                >
                  <GoogleG className="size-6 shrink-0" />
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="flex items-center gap-1.5 font-display text-sm font-bold">
                      Google Verified <BadgeCheck className="size-4 fill-sky text-white" />
                    </span>
                    <span className="block text-xs text-slate-500">
                      {googleReviews.rating} from {googleReviews.count} reviews
                    </span>
                  </span>
                  <span className="hidden gap-0.5 text-sun min-[360px]:flex md:hidden lg:flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-slate-400 transition group-hover:text-brand" />
                </NavLink>

                <p className="mt-4 text-xs leading-relaxed text-slate-400">
                  You can also share your requirements at{" "}
                  <NavLink
                    href={`mailto:${site.email}`}
                    className="break-all font-semibold text-white underline underline-offset-2"
                  >
                    {site.email}
                  </NavLink>
                  , and our team will get back to you right away.
                </p>
              </div>

              <div className="order-1 bg-gradient-to-br from-brand via-brand to-sky p-5 text-white sm:p-6 md:order-2">
                <h3 className="pr-12 font-display text-lg font-bold leading-snug tracking-tight sm:text-xl">
                  Tell us your goal. We&apos;ll map it to a track.
                </h3>
                <EnquiryForm
                  course={course}
                  onCourseChange={setCourse}
                  defaultPhone={phone}
                  className="mt-4"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </EnquiryContext.Provider>
  );
}

const newSum = () => ({
  a: 2 + Math.floor(Math.random() * 8),
  b: 2 + Math.floor(Math.random() * 8),
});

export function EnquiryForm({
  course: controlledCourse,
  onCourseChange,
  defaultCourse,
  defaultPhone,
  className = "",
}: {
  /** Pass both to control the selected course from outside (the popup's track chips). */
  course?: string;
  onCourseChange?: (course: string) => void;
  /** Course selected when the form first appears, e.g. on a course page. */
  defaultCourse?: string;
  /** Mobile number already typed elsewhere, such as the home page call to action. */
  defaultPhone?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [ownCourse, setOwnCourse] = useState(defaultCourse ?? "");
  // The sum is created in the browser only, so server and client markup match.
  const [sum, setSum] = useState<{ a: number; b: number } | null>(null);
  const [answer, setAnswer] = useState("");

  const course = controlledCourse ?? ownCourse;
  const setCourse = onCourseChange ?? setOwnCourse;

  const refreshSum = () => {
    setSum(newSum());
    setAnswer("");
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => setSum(newSum()));
    return () => cancelAnimationFrame(frame);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    delete data.answer;
    if (!course) return setError("Please select a course.");
    if (!String(data.name).trim()) return setError("Please enter your name.");
    if (!/^[6-9]\d{9}$/.test(String(data.phone))) {
      return setError("Enter a valid 10-digit mobile number.");
    }
    if (!sum || Number(answer) !== sum.a + sum.b) {
      refreshSum();
      return setError("That answer is not right — please try the new sum.");
    }
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please call us instead.");
    }
  }

  if (status === "done") {
    return (
      <div className={`rounded-2xl bg-white/15 p-6 ${className}`}>
        <CheckCircle2 className="size-8 text-sun" />
        <p className="mt-3 font-display text-xl font-bold">Thank you!</p>
        <p className="mt-1 text-sm text-white/85">
          A counsellor will call you back shortly.
        </p>
      </div>
    );
  }

  // 16px text on phones stops them zooming in when a field is focused.
  const field =
    "w-full rounded-xl border border-white/30 bg-white/15 px-4 py-2.5 text-base text-white sm:text-sm placeholder:text-white/75 outline-none transition focus:border-white focus:bg-white/25";

  return (
    <form onSubmit={onSubmit} className={`space-y-2.5 ${className}`} noValidate>
      <div className="relative">
        <select
          name="course"
          required
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          aria-label="Course of interest"
          className={`${field} appearance-none pr-12 font-medium [&>option]:text-slate-900`}
        >
          <option value="" disabled>
            Select Your Course of Interest*
          </option>
          {allCourses.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-white/80" />
      </div>
      <input
        name="name"
        required
        autoComplete="name"
        placeholder="Full Name*"
        aria-label="Full name"
        className={field}
      />
      <input
        name="phone"
        required
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        maxLength={10}
        defaultValue={defaultPhone}
        placeholder="Contact Number (10 Digits)*"
        aria-label="Contact number"
        className={field}
      />

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="text-sm font-semibold">Security verification</span>
        <span className="flex items-center gap-2">
          <span className="rounded-full bg-white/20 px-3 py-1 font-mono text-xs font-bold tracking-widest">
            {sum ? `${sum.a} + ${sum.b} = ?` : "… + … = ?"}
          </span>
          <button
            type="button"
            onClick={refreshSum}
            aria-label="Get a new sum"
            className="grid size-7 place-items-center rounded-full border border-white/40 transition hover:rotate-180 hover:bg-white/15"
          >
            <RefreshCw className="size-3.5" />
          </button>
        </span>
      </div>
      <input
        name="answer"
        required
        inputMode="numeric"
        autoComplete="off"
        maxLength={2}
        value={answer}
        onChange={(e) => setAnswer(e.target.value.replace(/\D/g, ""))}
        placeholder="Answer"
        aria-label="Answer to the security sum"
        className={field}
      />

      {error && (
        <p role="alert" className="text-sm font-semibold text-sun">
          {error}
        </p>
      )}
      <p className="flex items-center gap-2 rounded-xl bg-cyan px-4 py-2.5 text-sm font-semibold text-hero-950">
        <CheckCircle2 className="size-4 shrink-0" /> Expert response within 5 minutes.
      </p>
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sun px-7 py-2.5 text-sm font-bold text-hero-950 transition hover:brightness-105 disabled:opacity-60 min-[420px]:w-auto"
      >
        {status === "sending" ? "Sending…" : "Submit"} <ArrowRight className="size-4" />
      </button>
    </form>
  );
}

export function BookDemoButton({
  children = "Book Demo",
  className = "",
  course,
  ...rest
}: {
  children?: ReactNode;
  className?: string;
  /** Preselects this course in the popup's form. */
  course?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type">) {
  const { open } = useEnquiry();
  return (
    <button type="button" onClick={() => open(course)} className={className} {...rest}>
      {children}
    </button>
  );
}
