import { VIEWPORTS } from "@/lib/viewports";

type UserConfiguration = {
  fullPage?: boolean;
  viewport?: keyof (typeof VIEWPORTS)["aspectRatios"];
  delay?: number;
};
