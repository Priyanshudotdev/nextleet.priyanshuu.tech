// import { storage } from "../shared/storage";

let lastUrl = location.href;

/*
    - Observer with MutationObserver class which watch for change
    - Detect the url on right page for us its leetcode.com
    - Scrape data and Send to background worker
*/

const observer = new MutationObserver(() => {
    if (location.href !== lastUrl) {
        lastUrl = location.href;
        // run the on url change fn
        onUrlChange();
    }
});

observer.observe(document.body, { subtree: true, childList: true });

// let userCode = "";

// on url change fn
const onUrlChange = () => {
    // check if its leetcode and specifically the submission route or not
    // eg : https://leetcode.com/problems/two-sum/submissions/2004032197/
    if (location.href.includes("/submissions/")) {
        waitForElement(".monaco-mouse-cursor-text", scrapeAndSend);
    }
};

// wait for dom to be loaded properly
const waitForElement = (selector: string, callback: () => void) => {
    const el = document.querySelector(selector);

    if (el) {
        callback();
        return;
    }

    const timer = setInterval(() => {
        if (document.querySelector(selector)) {
            clearInterval(timer);
            callback();
        }
    }, 500);
};

const scrapeAndSend = async () => {
    const language = document.querySelector(
        "#editor button[aria-haspopup][aria-expanded]"
    )?.textContent;
    const textContent: HTMLCollection | undefined = document.querySelector(
        ".monaco-mouse-cursor-text"
    )?.children;
    let userCode: string | null = "";
    const problemName = location.href.split("/problems/")[1].split("/submissions/")[0];

    // chrome.runtime.sendMessage({type:"HEALTH", message: "DONE"});

    if (textContent) {
        Array.from(textContent).map((elem) => {
            userCode += elem.textContent.trim() ?? "";
        });
    }

    const payload = { language, userCode: userCode, problemName };

    await chrome.storage.sync.set(payload);

    try {
        chrome.runtime.sendMessage({ type: "PING" }, () => {
            if (chrome.runtime.lastError) return;
        });

        chrome.runtime.sendMessage({ type: "SUBMISSION_DETECTED", payload });
    } catch (error) {
        console.log("Extension reloaded, refresh the tab");
    }

    // chrome.runtime.onMessage()
};
