"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useTransition } from "react";
import { useScreenshotStore } from "@/hooks/screenshot.store";
import { useConfigurationModal } from "@/hooks/use-configuration-modal";

export const VIEWPORTS = {
  aspectRatios: {
    "16:9": { width: 1920, height: 1080, deviceScaleFactor: 2 },
    "21:9": { width: 2560, height: 1080, deviceScaleFactor: 2 },
    "32:9": { width: 3840, height: 1080, deviceScaleFactor: 2 },
    "4:3": { width: 768, height: 1024, deviceScaleFactor: 2 },
    "3:2": { width: 1280, height: 853, deviceScaleFactor: 2 },
  },
};

const aspectRatioKeys = Object.keys(VIEWPORTS.aspectRatios) as [
  string,
  ...string[]
];

export const ConfigurationFormSchema = z.object({
  fullPage: z.boolean().optional(),
  viewport: z.enum(aspectRatioKeys).optional(),
  delay: z.number().int().min(0).optional(),
});

const ConfigurationForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const setScreenBlob = useScreenshotStore((state) => state.setScreenBlob);
  const openConfigurationModal = useConfigurationModal((state) => state.onOpen);

  const form = useForm<z.infer<typeof ConfigurationFormSchema>>({
    resolver: zodResolver(ConfigurationFormSchema),
  });

  return (
    <Form {...form}>
      <form className="grid gap-3">
        <FormField
          control={form.control}
          name="viewport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Screen size</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select screen size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {aspectRatioKeys.map((key) => (
                    <SelectItem key={key} value={key}>{`${key} (${
                      VIEWPORTS.aspectRatios[
                        key as keyof typeof VIEWPORTS.aspectRatios
                      ].width
                    } x ${
                      VIEWPORTS.aspectRatios[
                        key as keyof typeof VIEWPORTS.aspectRatios
                      ].height
                    })`}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ConfigurationForm;
