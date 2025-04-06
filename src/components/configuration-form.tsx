"use client";

import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { UseConfigurationStore } from "@/hooks/use-coniguration-store";
import { aspectRatioKeys, VIEWPORTS } from "@/lib/viewports";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export const ConfigurationFormSchema = z.object({
  fullPage: z.boolean().optional(),
  viewport: z.enum(aspectRatioKeys).optional(),
  delay: z.number().int().min(0).optional(),
});

const ConfigurationForm = () => {
  const setConfiguration = UseConfigurationStore(
    (state) => state.setConfiguration
  );
  const configuration = UseConfigurationStore((state) => state.configuration);

  const form = useForm<z.infer<typeof ConfigurationFormSchema>>({
    resolver: zodResolver(ConfigurationFormSchema),
    defaultValues: {
      fullPage: configuration?.fullPage || true,
      viewport: configuration?.viewport || "16:9",
      delay: configuration?.delay || 0,
    },
  });

  const handleAspectRatioSelect = (value: string) => {
    form.setValue("viewport", value);
    setConfiguration({
      ...configuration,
      viewport: value as keyof typeof VIEWPORTS.aspectRatios,
    });
  };

  const currentViewport = form.watch("viewport");

  return (
    <Form {...form}>
      <form className="grid gap-6">
        <FormField
          control={form.control}
          name="viewport"
          render={() => (
            <FormItem>
              <FormLabel className="text-base font-medium mb-3">
                Screen size
              </FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {aspectRatioKeys.map((key) => {
                  const { width, height } =
                    VIEWPORTS.aspectRatios[
                      key as keyof typeof VIEWPORTS.aspectRatios
                    ];

                  // Calculate card dimensions to maintain proper aspect ratio
                  const isWider = width > height;
                  const scaleFactor = isWider ? 80 / width : 80 / height;
                  const scaledWidth = width * scaleFactor;
                  const scaledHeight = height * scaleFactor;

                  return (
                    <div
                      key={key}
                      onClick={() => handleAspectRatioSelect(key)}
                      className={cn(
                        "relative cursor-pointer rounded-lg border-2 p-3 flex flex-col items-center transition-all hover:border-primary",
                        currentViewport === key
                          ? "border-primary bg-primary/5"
                          : "border-muted bg-background"
                      )}
                    >
                      {currentViewport === key && (
                        <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}

                      <div
                        className="bg-slate-200 border border-slate-300 mx-auto mb-2"
                        style={{
                          width: `${scaledWidth}px`,
                          height: `${scaledHeight}px`,
                        }}
                      />

                      <div className="text-center space-y-1">
                        <p className="text-sm font-medium">{key}</p>
                        <p className="text-xs text-muted-foreground">
                          {width} × {height}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ConfigurationForm;
