import "i18next";
import type { defaultNS as DefaultNS, resources as Res } from "./i18n";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof DefaultNS;
    resources: {
      [K in keyof Res]: typeof Res[K];
    };
  }
}