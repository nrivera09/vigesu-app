import { EmailTemplate } from "@/features/orders/inspections/components/emailTemplates/EmailTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    const { data, error } = await resend.emails.send({
      from: "Inspections <onboarding@resend.dev>",
      to: [email],
      subject: "Confirmación de Inspección",
      react: <EmailTemplate recipientName={name || "Usuario"} />, // ✅ JSX aquí
    });

    if (error) {
      console.error("Error Resend:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error general:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
