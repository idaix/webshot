"use client";

import { useScreenshotStore } from "@/hooks/screenshot.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, PenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { base64ToBlobUrl } from "@/lib/utils";

const Result = () => {
  const screenshotBlob = useScreenshotStore((state) => state.screenBlob);
  const router = useRouter();

  if (!screenshotBlob) {
    return null;
  }

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = screenshotBlob;
    link.download = `webshot-${new Date().toISOString().slice(0, 10)}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid gap-4">
      <div className="flex gap-2 items-center">
        <h1 className="">Tada 🎉 Your screenshot is ready!</h1>
        <div className="flex gap-2 ms-auto">
          <Button variant="ghost" asChild>
            <Link href="edit">
              <PenIcon className="h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      <Link
        href={base64ToBlobUrl(screenshotBlob) || "#"}
        target="_blank"
        className="w-full h-full"
      >
        <figure className="w-full h-full overflow-hidden border rounded-lg ">
          <img
            src={screenshotBlob}
            alt="Screenshot"
            className="width-full h-full object-cover"
            loading="lazy"
          />
        </figure>
      </Link>
    </div>
  );
};

export default Result;
