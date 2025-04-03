import { VIEWPORTS } from "@/actions/take-screenshot";

type UserConfiguration = {
  fullPage?: boolean;
  viewport?: keyof typeof VIEWPORTS;
  delay?: number;
};
