import browser from "webextension-polyfill";
import { pushCodeToGithub } from "../shared/github";

browser.runtime.onInstalled.addListener((): void => {
  console.log('Extension installed');
});

chrome.runtime.onMessage.addListener((message,_,sendResponse) => {
    if(message.type === "SUBMISSION_DETECTED"){
        console.log("DONE DONA DONE");
        handleSubmission(message.payload)
        .then(result => sendResponse({ success: true, data: result }))
        .catch(err => sendResponse({ success: false, error: err.message }));
        console.log("DONE DONA DONE : PART - 2");
        return true;

   }

   if(message.type === "GITHUB_SYNC_FAILED"){
    console.log("FAILEDDDD");
    sendResponse({success: false, data: "NOthing"});
   }

//    if(message.type === "HEALTH"){
//         console.log("DONE DONA DONE");
//    }

    if(message.type === "GITHUB_SYNC_SUCCEED"){
        console.log("its working");
        sendResponse({ success: true, data: "DONE!!!!!!!!!" })
    }

})


const handleSubmission = async (message:any) => {
        
        const code = message.userCode as string;
        const language = message.language as string;
        const problemName = message.problemName as string;

        const payload = {
            userCode: code,
            language,
            problemName,
            repoName: "test-repo",
        }
        
        const response = pushCodeToGithub(payload).then(res => res);
        return response;

}