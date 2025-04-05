"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { ensureHttps } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LoaderPinwheel, Settings, Squircle } from "lucide-react";
import { useScreenshotStore } from "@/hooks/screenshot.store";
import { useConfigurationModal } from "@/hooks/use-configuration-modal";
import { UseConfigurationStore } from "@/hooks/use-coniguration-store";
import { motion } from "motion/react";
import { TextAnimate } from "./ui/text-animation";
type Props = {};
export const WebshotFormSchema = z.object({
  url: z.string().min(1, { message: "dont forget to add a url" }),
});

const WEBShotForm = (props: Props) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setScreenBlob = useScreenshotStore((state) => state.setScreenBlob);
  const openConfigurationModal = useConfigurationModal((state) => state.onOpen);
  const [status, setStatus] = useState<string[]>([]);
  const userConfiguration = UseConfigurationStore(
    (state) => state.configuration
  );

  const form = useForm<z.infer<typeof WebshotFormSchema>>({
    resolver: zodResolver(WebshotFormSchema),
    defaultValues: {
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof WebshotFormSchema>) {
    setStatus([]);
    setError(null);
    setIsPending(true);
    const url = ensureHttps(values.url);

    const eventSource = new EventSource(
      `/api/create?url=${encodeURIComponent(url)}&viewport=${
        userConfiguration?.viewport
      }&fullPage=${userConfiguration?.fullPage}`
    );

    eventSource.onmessage = (event) => {
      const message: string = event.data;
      if (message.startsWith("DONE:")) {
        const blob = message.replace("DONE: ", "");
        setScreenBlob(blob);
        eventSource.close();
        setIsPending(false);
        setError(null);
      } else {
        setStatus((prev) => [...prev, message]);
      }
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
      setIsPending(false);
      setError("Something went wrong! :(");
    };
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
        {error && <p className="text-red-500">{error}</p>}

        <div className="flex items-end gap-2">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website URL</FormLabel>
                <FormControl>
                  <div className="selection:bg-primary dark:bg-input/30 border-input flex h-9 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                    <span className="text-muted-foreground flex items-center justify-center">
                      https://
                    </span>
                    <Input
                      disabled={isPending}
                      className="bg-transparent border-0 ring-0 w-full h-full p-0 rounded-none focus-visible:border-0  focus-visible:ring-0"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="button"
            size="icon"
            variant="outline"
            disabled={isPending}
            onClick={openConfigurationModal}
          >
            <Settings className="w-4 h-4" />
          </Button>

          <Button type="submit" disabled={!form.formState.isValid || isPending}>
            {isPending ? <LoaderPinwheel className="animate-spin" /> : "Shot"}
          </Button>
        </div>

        {isPending && status.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="bg-muted-foreground h-1 w-1 animate-ping rounded-full" />
            <TextAnimate
              key={status[status.length - 1]}
              className="text-muted-foreground text-sm"
            >
              {status[status.length - 1]}
            </TextAnimate>
          </div>
        )}
      </form>
    </Form>
  );
};

export default WEBShotForm;
