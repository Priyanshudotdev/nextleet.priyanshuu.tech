const storage = {
  set: async (key: string, value: any) => {
    await chrome.storage.sync.set({ [key]: value });
  },

  get: async (key: string): Promise<string> => {
    return String(await chrome.storage.sync.get(key));
  },

  remove: async (key: string) => {
    await chrome.storage.sync.remove(key);
  },

  setObj: async (obj: any) => {
    await chrome.storage.sync.set(obj);
  },
};

export { storage };
