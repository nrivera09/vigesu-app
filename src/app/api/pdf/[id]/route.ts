// app/api/pdf/[id]/route.ts
import { NextRequest } from "next/server";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl; // Next.js te da la URL parseada
    const id = url.pathname.split("/").pop() as string;
    const type = url.searchParams.get("type") || "default";
    const locale = "es";

    // En Netlify esto devuelve, por ejemplo:
    // https://tusitio--deploy-preview-123.netlify.app  (preview)
    // https://tusitio.netlify.app                    (prod)
    const baseUrl = url.origin;

    let pdfUrl = "";
    let fileNamePDF = "";

    switch (type) {
      case "liftgate":
        pdfUrl = `${baseUrl}/${locale}/dashboard/orders/inspections/generate-pdf/${id}?preview=true`;
        fileNamePDF = `Inspection-${id}.pdf`;
        break;
      default:
        pdfUrl = `${baseUrl}/${locale}/dashboard/orders/work-orders/generate-pdf/${id}?preview=true`;
        fileNamePDF = `WorkOrder-${id}.pdf`;
        break;
    }

    // ⚙️ Config Puppeteer serverless
    const executablePath = await chromium.executablePath();

    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath,
      headless: true,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 8000 });

    // Si tu página necesita auth/cookies, aquí deberías setearlas antes del goto
    await page.goto(pdfUrl, { waitUntil: "networkidle0", timeout: 60_000 });

    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();

    return new Response(Buffer.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileNamePDF}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err: unknown) {
    // Logea el error para ver en Netlify logs
    if (err instanceof Error) {
      console.error("PDF error:", err.message);
    } else {
      console.error("PDF error:", err);
    }
    return new Response("Failed to generate PDF", { status: 500 });
  }
}
