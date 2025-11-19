import TasteFeedbackAcidicImage from "@/assets/images/steps/tasteFeedback_acidic.webp";
import TasteFeedbackBitterImage from "@/assets/images/steps/tasteFeedback_bitter.webp";
import TasteFeedbackTooWateryImage from "@/assets/images/steps/tasteFeedback_tooWatery.webp";
import { StringRes } from "@/src/i18n/strings";

// Discriminated union (sealed-class-style) for taste feedback pages
export type TasteFeedbackSubpage = (typeof PAGES)[number];

export type TasteKind = TasteFeedbackSubpage["kind"];

export type TasteFeedbackSubpageType<K extends TasteKind> = Extract<
  TasteFeedbackSubpage,
  { kind: K }
>;
export const R = StringRes.steps.tasteFeedback

export function assertNever(x: never): never {
  throw new Error(`Unhandled TasteFeedbackSubpage kind: ${x}`);
}

export const PAGES = [
  {
    kind: "sour",
    safeAreaColor: "#3B55FF",
    tasteTitleRes: R.sour,
    tasteDescriptionRes: R.sourDescription,
  },
  {
    kind: "bitter",
    safeAreaColor: "#E54817",
    tasteTitleRes: R.bitter,
    tasteDescriptionRes: R.bitterDescription,
    image: TasteFeedbackBitterImage,
  },
  {
    kind: "acidic",
    safeAreaColor: "#A117E5",
    tasteTitleRes: R.acidic,
    tasteDescriptionRes: R.acidicDescription,
    image: TasteFeedbackAcidicImage,
  },
  {
    kind: "watery",
    safeAreaColor: "#FF0033",
    tasteTitleRes: R.watery,
    tasteDescriptionRes: R.wateryDescription,
    image: TasteFeedbackTooWateryImage,
  },
  {
    kind: "noCoffee",
    safeAreaColor: "#FF0033",
    tasteTitleRes: R.noCoffeeExtracted,
    tasteDescriptionRes: R.noCoffeeExtractedDescription,
    image: undefined,
  },
] as const;