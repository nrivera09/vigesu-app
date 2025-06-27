// app/api/pdf/[id]/route.ts
import puppeteer from "puppeteer";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // Extrae el ID desde la URL

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const locale = "es";

  const pdfUrl = `${baseUrl}/${locale}/dashboard/orders/work-orders/generate-pdf/${id}?preview`;

  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();

  await page.goto(pdfUrl, { waitUntil: "networkidle0" });
  const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
  await browser.close();

  return new Response(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="WorkOrder-${id}.pdf"`,
    },
  });
}
