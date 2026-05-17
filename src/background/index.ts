import browser from "webextension-polyfill";
import { pushCodeToGithub } from "../shared/github";
import { initiateGithubAuth, pollForToken } from "../shared/github-auth";
import { storage } from "../shared/storage";

browser.runtime.onInstalled.addListener((): void => {
  console.log("Extension installed");
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
    sendResponse({ success: false, data: "NOthing" });
  }

  if (message.type === "INITIATE_AUTH") {
    connectToGithub(sendResponse);
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
      status: "pending",
    });

    sendResponse({
      user_code: response?.user_code,
      device_code: response?.device_code,
      interval: response?.interval,
    });

    chrome.tabs.create({ url: "https://github.com/login/device" });

    const token = pollForToken(response.device_code, response.interval);

    if (!token) {
      await storage.set("auth_state", {
        status: "failed",
      });
      return false;
    }

    await storage.set("auth_state", {
      status: "completed",
    });
    return true;
  }

  await storage.set("auth_state", {
    status: "failed",
  });
  return false;
};
