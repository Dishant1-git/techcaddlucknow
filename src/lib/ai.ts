// Server-only helper behind the AI tools (/api/tools/*). Reads ANTHROPIC_API_KEY
// (or an `ant auth login` profile) from the environment.
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export class ToolError extends Error {
  constructor(
    message: string,
    public status = 500,
  ) {
    super(message);
  }
}

/** One short generation. Returns the reply's text. */
export async function generate(system: string, prompt: string): Promise<string> {
  try {
    const response = await client.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 8000,
      // Short, interactive answers: low effort keeps the wait to a few seconds.
      output_config: { effort: "low" },
      // If the model declines for policy reasons, the API retries on its default fallback.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system,
      messages: [{ role: "user", content: prompt }],
    });
    if (response.stop_reason === "refusal") {
      throw new ToolError("We couldn't generate that. Please rephrase and try again.", 422);
    }
    const text = response.content
      .flatMap((b) => (b.type === "text" ? [b.text] : []))
      .join("")
      .trim();
    if (!text) throw new ToolError("The tool returned an empty answer. Please try again.");
    return text;
  } catch (error) {
    if (error instanceof ToolError) throw error;
    if (error instanceof Anthropic.RateLimitError) {
      throw new ToolError("The tool is busy right now. Please try again in a minute.", 429);
    }
    // No credentials at all fails before any request, as a plain Error (no typed class).
    const noCredentials =
      !(error instanceof Anthropic.APIError) &&
      error instanceof Error &&
      error.message.includes("Could not resolve authentication method");
    if (error instanceof Anthropic.AuthenticationError || noCredentials) {
      console.error("AI tools: missing or invalid ANTHROPIC_API_KEY");
      throw new ToolError("The AI tools are not configured yet.", 503);
    }
    if (error instanceof Anthropic.APIError) {
      console.error(`AI tools: API error ${error.status}:`, error.message);
    } else {
      console.error("AI tools:", error);
    }
    throw new ToolError("Something went wrong. Please try again.");
  }
}

/** Trimmed string field from a JSON body, capped so prompts stay small. */
export const field = (body: unknown, key: string, max = 400) =>
  String((body as Record<string, unknown> | null)?.[key] ?? "")
    .trim()
    .slice(0, max);

export async function respond(run: () => Promise<string>) {
  try {
    return Response.json({ ok: true, text: await run() });
  } catch (error) {
    const e = error instanceof ToolError ? error : new ToolError("Something went wrong.");
    return Response.json({ ok: false, error: e.message }, { status: e.status });
  }
}
