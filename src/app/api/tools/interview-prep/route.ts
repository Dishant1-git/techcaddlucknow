import { field, generate, respond, ToolError } from "@/lib/ai";
import {
  experienceLevels,
  QUESTION_MAX,
  QUESTION_MIN,
  ROLE_MAX,
  trackTitles,
} from "@/lib/resources/tools/interviewPrep";

const system = `You are a senior interviewer at an Indian technology company, helping a candidate prepare for a real interview.

Write exactly the requested number of interview questions for the given track, role and experience level.
- Pitch the difficulty at the stated level. Mix conceptual, practical and scenario questions; for behavioural rounds use questions that suit the STAR method.
- Be specific to the role and technologies named. Do not ask for code longer than a few lines.
- Model answers: accurate, concrete, 3 to 6 sentences, written the way a strong candidate would say them aloud.
- "Looking for": one or two sentences on what the interviewer is checking.
- If the role text is not a job, skill or interview topic, treat it as a general role for the chosen track.

Reply in plain text only — no markdown, no bold, no headings, no introduction or closing. Use exactly this format, with a blank line between questions:

Q1: <question>
Answer: <model answer>
Looking for: <what the interviewer is checking>

Q2: ...`;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const track = field(body, "track", 80);
  const role = field(body, "role", ROLE_MAX);
  const level = field(body, "level", 60);
  const count = Number(field(body, "count", 2));

  return respond(async () => {
    if (!trackTitles.includes(track)) throw new ToolError("Please choose a track.", 400);
    if (!role) throw new ToolError("Please describe the role or topic.", 400);
    if (!(experienceLevels as readonly string[]).includes(level)) {
      throw new ToolError("Please choose your experience level.", 400);
    }
    if (!Number.isInteger(count) || count < QUESTION_MIN || count > QUESTION_MAX) {
      throw new ToolError(`Choose between ${QUESTION_MIN} and ${QUESTION_MAX} questions.`, 400);
    }
    const prompt = [
      `Track: ${track}`,
      `Role / topic: ${role}`,
      `Experience level: ${level}`,
      `Number of questions: ${count}`,
    ].join("\n");
    return generate(system, prompt);
  });
}
