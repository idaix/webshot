"use server";
import { ensureHttps } from "@/lib/utils";
import puppeteer from "puppeteer";

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function Shot(url: string) {
  if (!url) {
    throw new Error("URL is required");
  }
  url = ensureHttps(url);

  console.log("taking a screenshot, Smile :)", url);

  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: "networkidle2" });
  await page.waitForSelector("body");
  await delay(6000);

  const screenshotBuffer = await page.screenshot({ fullPage: true });
  await browser.close();
  console.log("tada! screenshot taken");

  return `data:image/png;base64,${Buffer.from(screenshotBuffer).toString(
    "base64"
  )}`;
}
