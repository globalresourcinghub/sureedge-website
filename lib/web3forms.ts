/** Web3Forms expects simple JSON values; checkbox groups work best as comma-separated strings. */

export function joinFieldList(values: FormDataEntryValue[]): string {
  return values
    .map((v) => (typeof v === "string" ? v : ""))
    .filter(Boolean)
    .join(", ");
}

type Web3FormsJson = {
  success?: boolean;
  message?: string;
  body?: { message?: string };
};

export function web3FormsErrorMessage(data: unknown): string | undefined {
  if (!data || typeof data !== "object") return undefined;
  const d = data as Web3FormsJson;
  if (typeof d.message === "string" && d.message) return d.message;
  const m = d.body?.message;
  if (typeof m === "string" && m) return m;
  return undefined;
}

export async function submitToWeb3Forms(payload: Record<string, unknown>): Promise<{
  ok: boolean;
  message?: string;
}> {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data: unknown = await res.json().catch(() => ({}));
  const success = typeof data === "object" && data !== null && "success" in data
    ? (data as { success: boolean }).success
    : undefined;

  const ok = res.ok && success !== false;
  const message = web3FormsErrorMessage(data);

  return { ok, message: ok ? undefined : message };
}
