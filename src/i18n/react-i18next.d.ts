// src/i18n/react-i18next.d.ts
import "react-i18next";
import type { defaultNS, resources } from "./i18n";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)["en"];
  }
}