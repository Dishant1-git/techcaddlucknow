import { field, generate, respond, ToolError } from "@/lib/ai";
import {
  BODY_MAX,
  goalIds,
  goals,
  recipientIds,
  recipients,
  SUBJECT_MAX,
  trackLabels,
} from "@/lib/resources/tools/coldEmail";

const system = `You edit cold outreach emails written by Indian engineering students and freshers who are looking for internships, fresher jobs, referrals or project feedback.

Improve the draft you are given:
- Keep it under 150 words, warm, direct and specific to the recipient type and goal. One clear, low-friction ask.
- Keep every fact exactly as given: names, company, degree, skills, project, links and phone placeholders. Never invent achievements, numbers, job IDs, mutual connections or details about the company.
- Remove clichés ("I hope this finds you well"), filler and exaggeration. Keep the sign-off with the sender's name and links.
- Indian English is fine. No emojis.

Reply in plain text only, no markdown, in exactly this format:
Subject: <subject line, under 80 characters>

<email body>`;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const subject = field(body, "subject", SUBJECT_MAX);
  const draft = field(body, "body", BODY_MAX);
  const track = field(body, "track", 80);
  const goal = field(body, "goal", 20);
  const recipientType = field(body, "recipientType", 20);
  const recipientName = field(body, "recipientName", 80);
  const company = field(body, "company", 120);

  return respond(async () => {
    if (!draft) throw new ToolError("There is no draft to improve yet.", 400);
    if (!trackLabels.includes(track)) throw new ToolError("Please choose a track.", 400);
    if (!goalIds.includes(goal)) throw new ToolError("Please choose an outreach goal.", 400);
    if (!recipientIds.includes(recipientType)) throw new ToolError("Please choose who you are messaging.", 400);

    const prompt = [
      `Track: ${track}`,
      `Goal: ${goals.find((g) => g.id === goal)?.label}`,
      `Recipient type: ${recipients.find((r) => r.id === recipientType)?.label}`,
      `Recipient name: ${recipientName || "(not given)"}`,
      `Company: ${company || "(not given)"}`,
      "",
      "Draft to improve:",
      `Subject: ${subject}`,
      "",
      draft,
    ].join("\n");
    return generate(system, prompt);
  });
}
