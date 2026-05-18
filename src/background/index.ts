import browser from "webextension-polyfill";
import { pushCodeToGithub } from "../shared/github";
import { initiateGithubAuth, pollForTokenOnce } from "../shared/github-auth";
import { storage } from "../shared/storage";

const AUTH_POLL_ALARM = "github-auth-poll";

type AuthState = {
    status?: "pending" | "completed" | "failed";
    user_code?: string;
    device_code?: string;
    interval?: number;
    github_repo?: string;
};

browser.runtime.onInstalled.addListener((): void => {
    console.log("Extension installed");
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name !== AUTH_POLL_ALARM) {
        return;
    }

    pollGithubAuthState().catch(async () => {
        await storage.set("auth_state", { status: "failed" });
        chrome.alarms.clear(AUTH_POLL_ALARM);
    });
});

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
    if (message.type === "SUBMISSION_DETECTED") {
        console.log("DONE DONA DONE");
        handleSubmission(message.payload)
            .then((result) => sendResponse({ success: true, data: result }))
            .catch((err) => sendResponse({ success: false, error: err.message }));
        console.log("DONE DONA DONE : PART - 2");
        return true;
    }

    if (message.type === "GITHUB_SYNC_FAILED") {
        console.log("FAILEDDDD");
        sendResponse({ success: false, data: "Nothing" });
    }

    if (message.type === "INITIATE_AUTH") {
        connectToGithub(sendResponse).catch((error: unknown) => {
            sendResponse({
                error: error instanceof Error ? error.message : "Failed to start auth",
            });
        });
        return true;
    }

    //    if(message.type === "HEALTH"){
    //         console.log("DONE DONA DONE");
    //    }

    if (message.type === "GITHUB_SYNC_SUCCEED") {
        console.log("its working");
        sendResponse({ success: true, data: "DONE!!!!!!!!!" });
    }
});

const handleSubmission = async (message: any) => {
    const code = message.userCode as string;
    const language = message.language as string;
    const problemName = message.problemName as string;

    const payload = {
        userCode: code,
        language,
        problemName,
        repoName: "test-repo",
    };

    const response = pushCodeToGithub(payload).then((res) => res);
    return response;
};

const connectToGithub = async (sendResponse: (response?: any) => void) => {
    const response = await initiateGithubAuth();

    if (response) {
        await storage.set("auth_state", {
            user_code: response.user_code,
            device_code: response.device_code,
            interval: response.interval,
            status: "pending",
        });

        sendResponse({
            user_code: response?.user_code,
            device_code: response?.device_code,
            interval: response?.interval,
        });

        scheduleAuthPoll(response.interval);
        return true;
    }

    await storage.set("auth_state", {
        status: "failed",
    });
    return false;
};

const scheduleAuthPoll = (intervalSeconds = 5) => {
    const delayInMinutes = Math.max(intervalSeconds / 60, 0.1);
    chrome.alarms.create(AUTH_POLL_ALARM, { delayInMinutes });
};

const pollGithubAuthState = async () => {
    const state = await storage.get<AuthState>("auth_state");

    if (!state || state.status !== "pending" || !state.device_code) {
        chrome.alarms.clear(AUTH_POLL_ALARM);
        return;
    }

    const currentInterval = state.interval ?? 5;
    const result = await pollForTokenOnce(state.device_code, currentInterval);

    if (result.status === "completed") {
        await storage.set("auth_state", { status: "completed" });
        chrome.alarms.clear(AUTH_POLL_ALARM);
        return;
    }

    if (result.status === "failed") {
        await storage.set("auth_state", { status: "failed" });
        chrome.alarms.clear(AUTH_POLL_ALARM);
        return;
    }

    if (result.status === "slow_down") {
        await storage.set("auth_state", {
            ...state,
            interval: result.interval,
            status: "pending",
        });
        scheduleAuthPoll(result.interval);
        return;
    }

    scheduleAuthPoll(currentInterval);
};
