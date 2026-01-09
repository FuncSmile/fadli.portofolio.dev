export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export async function submitContact(payload: ContactPayload) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? "Failed to submit contact form");
  }

  return res.json();
}
