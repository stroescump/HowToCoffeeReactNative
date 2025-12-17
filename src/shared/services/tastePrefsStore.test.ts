import { strict as assert } from "assert";
import {
  clearTastePrefs,
  createSkippedTastePrefs,
  getTastePrefs,
  setTastePrefs,
  setTastePrefsStorageOverride,
} from "./tastePrefsStore";
import { TastePrefs } from "../domain/tastePrefs";

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
      acidityPreference: "LIKES",
      bitternessPreference: "NEUTRAL",
      drinkStyle: "DEPENDS",
      createdAtMillis: 123,
    };

    await setTastePrefs(prefs);
    const loaded = await getTastePrefs();

    assert.deepEqual(loaded, prefs);
  });

  it("marks skip path with neutral acidity", async () => {
    const skipped = createSkippedTastePrefs();
    await setTastePrefs(skipped);

    const loaded = await getTastePrefs();

    assert.equal(loaded?.acidityPreference, "NEUTRAL");
    assert.ok((loaded?.createdAtMillis ?? 0) > 0);
  });
});
