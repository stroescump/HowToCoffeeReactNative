import { useEffect, useState } from "react";
import { usePathname, useRouter } from "expo-router";
import { getTastePrefs } from "@/src/shared/services/tastePrefsStore";

export function useOnboardingGate() {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    const hydrate = async () => {
      try {
        const prefs = await getTastePrefs();
        if (!prefs && pathname !== "/onboardingTaste") {
          router.replace("/onboardingTaste");
        }
      } finally {
        if (mounted) {
          setReady(true);
        }
      }
    };

    hydrate();

    return () => {
      mounted = false;
    };
  }, [pathname, router]);

  return { ready };
}
