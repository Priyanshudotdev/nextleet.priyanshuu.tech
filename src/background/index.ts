import { pushCodeToGithub } from "../shared/github";
import { storage } from "../shared/storage"

chrome.runtime.onMessage.addListener((message,_,sendResponse) => {
    if(message.type === "SUBMISSION_DETECTED"){
        handleSubmission(message.payload)
            .then(result => sendResponse({ success: true, data: result }))
            .catch(err => sendResponse({ success: false, error: err.message }));
        return true;
   }

    if(message.type === "GITHUB_SYNC_SUCCEED"){
        console.log("its working");
        sendResponse({ success: true, data: "DONE!!!!!!!!!" })
    }

})


const handleSubmission = async (message:any) => {
        
        const code = message.userCode as string;
        const language = message.language as string;
        const problemName = message.problemName as string;
        const token = await storage.get("token");

        const payload = {
            userCode: code,
            language,
            problemName,
            repoName: "test-repo",
            token: token
        }
        
        const response = pushCodeToGithub(payload).then(res => res);
            return response;

}