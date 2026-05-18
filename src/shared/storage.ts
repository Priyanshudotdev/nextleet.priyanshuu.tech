const storage = {
    set: async (key: string, value: unknown) => {
        await chrome.storage.sync.set({ [key]: value });
    },

    get: async <T = unknown>(key: string): Promise<T | undefined> => {
        const result = await chrome.storage.sync.get(key);
        return result[key] as T | undefined;
    },

    remove: async (key: string) => {
        await chrome.storage.sync.remove(key);
    },

    setObj: async (obj: Record<string, unknown>) => {
        await chrome.storage.sync.set(obj);
    },
};

export { storage };
