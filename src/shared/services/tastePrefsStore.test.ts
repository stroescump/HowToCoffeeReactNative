import { strict as assert } from "assert";
import {
  clearTastePrefs,
  createSkippedTastePrefs,
  getTastePrefs,
  setTastePrefs,
  setTastePrefsStorageOverride,
} from "./tastePrefsStore";
import {
  DRINK_STYLE,
  TastePrefs,
  TASTE_LEVEL,
  USER_EXPERIENCE,
} from "../domain/tastePrefs";

class MemoryStorage {
  private store = new Map<string, string>();

  async getItem(key: string) {
    return this.store.has(key) ? (this.store.get(key) as string) : null;
  }

  async setItem(key: string, value: string) {
    this.store.set(key, value);
  }

  async removeItem(key: string) {
    this.store.delete(key);
  }
}

describe("tastePrefsStore", () => {
  const memory = new MemoryStorage();

  beforeEach(async () => {
    setTastePrefsStorageOverride(memory);
    await clearTastePrefs();
  });

  after(() => {
    setTastePrefsStorageOverride(undefined);
  });

  it("saves and loads taste preferences", async () => {
    const prefs: TastePrefs = {
      userExperience: USER_EXPERIENCE.BEGINNER,
      bitterness: TASTE_LEVEL.MEDIUM,
      drinkStyle: DRINK_STYLE.ALL,
      createdAtMillis: 123,
    };

    await setTastePrefs(prefs);
    const loaded = await getTastePrefs();

    assert.deepEqual(loaded, prefs);
  });

  it("marks skip path with medium acidity", async () => {
    const skipped = createSkippedTastePrefs();
    await setTastePrefs(skipped);

    const loaded = await getTastePrefs();

    assert.equal(loaded?.acidity, TASTE_LEVEL.MEDIUM);
    assert.ok((loaded?.createdAtMillis ?? 0) > 0);
  });
});
