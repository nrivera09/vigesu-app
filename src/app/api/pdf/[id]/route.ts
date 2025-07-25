import puppeteer from "puppeteer";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // o usar req.nextUrl.pathname.split("/").pop()

  const type = url.searchParams.get("type") || "default"; // o 'workorder'
  const locale = "es";
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // 🧠 Construir la URL según el tipo
  let pdfUrl = "";

  switch (type) {
    case "liftgate":
      pdfUrl = `${baseUrl}/${locale}/dashboard/orders/inspections/generate-pdf/${id}?preview=true`;
      break;
    default:
      pdfUrl = `${baseUrl}/${locale}/dashboard/orders/work-orders/generate-pdf/${id}?preview=true`;
      break;
  }

  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 8000 });

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
