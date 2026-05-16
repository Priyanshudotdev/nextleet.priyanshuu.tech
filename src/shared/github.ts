import { Octokit } from "octokit";
import { cleanWhitespace, getLanguageExtension } from "./helper";


type PayloadType = {
    userCode: string;
    language: string;
    problemName: string;
    repoName: string;
    token?: string
}

const octokit = new Octokit({
    auth: import.meta.env.VITE_GITHUB_TOKEN
})


const pushCodeToGithub = async(payloadData:PayloadType) => {
        const extension = getLanguageExtension(payloadData.language.toLowerCase());
        const filePath = `solutions/${payloadData.problemName}.${extension}`;

        // const pretty = await prettier.format(payloadData.userCode, { parser: "babel", plugins: [parserBabel] });

        // await storage.set("pretty", pretty);

        let s = payloadData.userCode;
        s = s.replace(/\/\*\-/g, "/*\n-");
        s = s.replace(/\- /g, "\n- ");
        s = s.replace(/(\.)([A-Z0-9])/g, "$1\n$2");

        const cleanedContent = cleanWhitespace(payloadData.userCode);

        try {
            const sha = await getRepoShaId({owner:"Priyanshudotdev", repo:"test-repo", path: filePath });

            const response = await octokit.rest.repos.createOrUpdateFileContents({
                    owner: "Priyanshudotdev",
                    repo: "test-repo",
                    path: filePath,
                    message: `Sync leetcode submission: ${payloadData.problemName}`,
                    content: btoa(
                        String.fromCharCode(...new TextEncoder().encode(cleanedContent))
                    ),
                    sha : sha ?? ""
            });


                if(response.status === 200 || response.status === 201){
                    chrome.runtime.sendMessage({type : "GITHUB_SYNC_SUCCEED", content : {
                        status: response.status,
                        message: response.data
                    }})
                }    
        } catch (error: any) {
            chrome.runtime.sendMessage({
                type: "GITHUB_SYNC_FAILED",
                content: {
                    status: 400,
                    message: `Failed to push code to Github:  + ${error}`
                }
            })
            console.error('Failed to push code to GitHub:', error);
            throw new Error(error?.message ?? "GitHub sync failed");
        }    
}


const getRepoShaId = async ({owner,repo,path}:{owner:string,repo:string,path:string}): Promise<string | null> => {
    try{
        const { data: existing } = await octokit.rest.repos.getContent({ owner, repo, path });

        if (existing && typeof existing === 'object' && 'sha' in existing) {
            //@ts-ignore
            return (existing as any).sha as string;
        }

        // If path is a directory, GitHub returns an array of items
        if (Array.isArray(existing)) {
            return null;
        }

        return null;
    } catch (err: any) {
        if (err.status === 404) return null;
        throw err;
    }
}

export { pushCodeToGithub };

