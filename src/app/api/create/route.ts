import { ensureHttps } from "@/lib/utils";
import { VIEWPORTS } from "@/lib/viewports";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

const DEFAULT_VIEWPORT = { width: 1920, height: 1080, deviceScaleFactor: 2 };

export async function GET(request: NextRequest) {
  console.log("API_CREATE_GET");
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");
  const viewportKey = searchParams.get("viewport") || "16:9";
  const fullPage = searchParams.get("fullPage") === "true" || false;

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  const httpsUrl = ensureHttps(url);

  // Create a streaming response using the ReadableStream API.
  const stream = new ReadableStream({
    async start(controller) {
      function sendStatus(message: string) {
        controller.enqueue(`data: ${message}\n\n`);
      }

      try {
        sendStatus("Opening the browser...");
        const browser = await puppeteer.launch({
          headless: true,
        });
        const page = await browser.newPage();
        const viewportConfig =
          viewportKey && viewportKey in VIEWPORTS.aspectRatios
            ? VIEWPORTS.aspectRatios[
                viewportKey as keyof typeof VIEWPORTS.aspectRatios
              ]
            : DEFAULT_VIEWPORT;

        await page.setViewport(viewportConfig);
        sendStatus(`Navigating to ${httpsUrl}...`);
        await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
        sendStatus("Waiting for page to load...");
        await page.waitForSelector("body");

        sendStatus("Taking screenshot...");
        const screenshotBuffer = await page.screenshot({
          fullPage,
        });
        sendStatus("Screenshot captured. Closing browser...");
        await browser.close();

        const base64Image = Buffer.from(screenshotBuffer).toString("base64");
        sendStatus(`DONE: data:image/png;base64,${base64Image}`);

        controller.close();
      } catch (error: any) {
        sendStatus(`Error: ${error.message}`);
        controller.close();
      }
    },
  });

  return new NextResponse(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
