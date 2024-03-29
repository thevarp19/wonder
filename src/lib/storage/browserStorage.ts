import { doIfWindowExists, tryWithErrorLog } from "@/utils/shared.util";

class BrowserStorage {
    private readonly storage: Storage;

    constructor(storage: Storage) {
        this.storage = storage;
    }

    get<V = any>(key: string) {
        return tryWithErrorLog(() => {
            const stringValue = this.storage.getItem(key);
            if (!stringValue) {
                throw new Error(`No value for key "${key}"`);
            }
            const value = JSON.parse(stringValue) as V;
            return value || null;
        });
    }

    set(key: string, value: unknown) {
        tryWithErrorLog(() => {
            this.storage.setItem(key, JSON.stringify(value));
        });
    }

    modify<V = any>(key: string, modifier: (value: V) => V) {
        tryWithErrorLog(() => {
            const initialValue = this.get(key);
            const modifiedValue = modifier(initialValue);
            this.set(key, modifiedValue);
        });
    }

    remove(key: string) {
        tryWithErrorLog(() => {
            this.storage.removeItem(key);
        });
    }

    clear() {
        tryWithErrorLog(() => {
            this.storage.clear();
        });
    }
}

let rawLocalStorage = null;

doIfWindowExists(() => {
    rawLocalStorage = new BrowserStorage(localStorage);
    Object.freeze(rawLocalStorage);
});

export const myLocalStorage: BrowserStorage | null = rawLocalStorage;

let rawSessionStorage = null;

doIfWindowExists(() => {
    rawSessionStorage = new BrowserStorage(sessionStorage);
    Object.freeze(rawSessionStorage);
});

export const mySessionStorage: BrowserStorage | null = rawSessionStorage;
