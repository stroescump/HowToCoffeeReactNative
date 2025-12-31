import TextRecognition, {
  TextRecognitionScript,
} from "@react-native-ml-kit/text-recognition";

export type TextRecognitionLanguage =
  | "latin"
  | "chinese"
  | "devanagari"
  | "japanese"
  | "korean";

export type TextRecognitionOptions = {
  language?: TextRecognitionLanguage;
};

export type TextRecognitionResult = {
  text: string;
};

export type TextRecognitionAdapter = {
  recognize: (
    imageUri: string,
    options?: TextRecognitionOptions,
  ) => Promise<TextRecognitionResult>;
};

const SCRIPT_MAP: Record<TextRecognitionLanguage, TextRecognitionScript> = {
  latin: TextRecognitionScript.LATIN,
  chinese: TextRecognitionScript.CHINESE,
  devanagari: TextRecognitionScript.DEVANAGARI,
  japanese: TextRecognitionScript.JAPANESE,
  korean: TextRecognitionScript.KOREAN,
};

function createMlKitAdapter(): TextRecognitionAdapter {
  return {
    async recognize(imageUri, options) {
      const script = SCRIPT_MAP[options?.language ?? "latin"];
      const result = await TextRecognition.recognize(imageUri, script);
      return { text: result.text ?? "" };
    },
  };
}

let adapter: TextRecognitionAdapter = createMlKitAdapter();

export function setTextRecognitionAdapter(next?: TextRecognitionAdapter) {
  adapter = next ?? createMlKitAdapter();
}

export function recognizeText(
  imageUri: string,
  options?: TextRecognitionOptions,
) {
  return adapter.recognize(imageUri, options);
}
