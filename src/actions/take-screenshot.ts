"use server";
import { ConfigurationFormSchema } from "@/components/configuration-form";
import { ensureHttps } from "@/lib/utils";
import { VIEWPORTS } from "@/lib/viewports";
import puppeteer from "puppeteer";
import { z } from "zod";

const DEFAULT_VIEWPORT = { width: 1920, height: 1080, deviceScaleFactor: 2 };

export async function Shot(
  url: string,
  userConfiguration?: z.infer<typeof ConfigurationFormSchema> | null
) {
  if (!url) {
    throw new Error("URL is required");
  }

  if (userConfiguration) {
    console.log("Config", userConfiguration.viewport);
  }

  url = ensureHttps(url);

  console.log("taking a screenshot, Smile :)", url);

  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  const viewportConfig =
    userConfiguration?.viewport &&
    userConfiguration.viewport in VIEWPORTS.aspectRatios
      ? VIEWPORTS.aspectRatios[
          userConfiguration.viewport as keyof typeof VIEWPORTS.aspectRatios
        ]
      : DEFAULT_VIEWPORT;

  console.log("viewportConfig", viewportConfig);

  await page.setViewport(viewportConfig);
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
  await page.waitForSelector("body");

  const screenshotBuffer = await page.screenshot({
    fullPage: userConfiguration?.fullPage ?? false,
  });
  await browser.close();
  console.log("tada! screenshot taken");

  return `data:image/png;base64,${Buffer.from(screenshotBuffer).toString(
    "base64"
  )}`;
}
