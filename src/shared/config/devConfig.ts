import Constants from "expo-constants";

type ExtraConfig = Record<string, unknown>;

function getExtraConfig(): ExtraConfig | null {
  return (
    Constants.expoConfig?.extra ??
    (Constants.manifest as { extra?: ExtraConfig } | null)?.extra ??
    (Constants.manifest2 as { extra?: ExtraConfig } | null)?.extra ??
    null
  );
}

export function getDevJwt(): string | null {
  if (!__DEV__) {
    return null;
  }

  const extra = getExtraConfig();
  const raw = extra?.DEV_JWT;
  if (typeof raw !== "string") {
    return null;
  }

  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : null;
}
