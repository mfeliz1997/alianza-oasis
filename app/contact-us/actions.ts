"use server";

export async function submitContactForm(formData: FormData): Promise<void> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!name || !email || !message) return;

  // Integrar Resend, SendGrid o webhook de WhatsApp Business API
  console.info("[contact]", { name, email, messageLength: message.length });
}
