type PayloadType = {
    userCode: string;
    language: string;
    problemName: string;
    repoName: string;
    token: string
}

const pushCodeToGithub = async(payload:PayloadType) => {
    const {language,problemName,repoName,token,userCode} = payload;


    const checkFile = await fetch(`https://api.github.com/repos/${repoName}/contents/solutions/${problemName}.${language}`, 
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    )
    const fileData = checkFile.ok ? await checkFile.json() : null;
    const sha = fileData?.sha ?? undefined;
    
    const content = btoa(userCode);

    const response = await fetch(
        `https://api.github.com/repos/${repoName}/contents/solutions/${problemName}.${language}`,
        {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "add two-sum solution", 
                content: content,
                sha: sha                          
            })
        }
    )

    const responseData = await response.json();

    if (!response.ok) {
        chrome.runtime.sendMessage({
            type: "GITHUB_SYNC_FAILD",
            content: {
                message: responseData?.message ?? "GitHub sync failed",
                status: response.status,
                data: responseData
            }
        });
        throw new Error(responseData?.message ?? "GitHub sync failed");
    }

    chrome.runtime.sendMessage({
        type: "GITHUB_SYNC_SUCCEED",
        content: responseData
    });

    return responseData;

}


export { pushCodeToGithub };
