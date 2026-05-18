import { storage } from "./storage";

const CLIENT_ID = import.meta.env.VITE_GITHUB_OAUTH_CLIENT_ID;
const SCOPE = "public_repo";

type PollTokenResult =
    | { status: "completed"; token: string }
    | { status: "pending" }
    | { status: "slow_down"; interval: number }
    | { status: "failed" };

export const initiateGithubAuth = async () => {
    try {
        const response = await fetch("https://github.com/login/device/code", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ client_id: CLIENT_ID, scope: SCOPE }),
        });

        if (response.ok) {
            const data = await response.json();
            return {
                device_code: data.device_code,
                user_code: data.user_code,
                interval: data.interval,
                expires_in: data.expires_in,
            };
        }
    } catch (error: any) {
        throw new Error(
            error?.message ?? "Failed to initiate GitHub device authorization flow"
        );
    }
};

export const pollForToken = async (device_code: string, interval: number) => {
    let currentInterval = interval;

    while (true) {
        await new Promise((resolve) => setTimeout(resolve, currentInterval * 1000));

        const response = await fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                client_id: CLIENT_ID,
                device_code,
                grant_type: "urn:ietf:params:oauth:grant-type:device_code",
            }),
        });

        const data = await response.json();

        if (data.access_token) {
            await storage.set("token", data.access_token);
            return data.access_token as string;
        }

        if (data.error === "authorization_pending") {
            continue;
        }

        if (data.error === "slow_down") {
            currentInterval = data.interval ?? currentInterval + 5;
            continue;
        }

        if (data.error === "access_denied" || data.error === "expired_token") {
            return null;
        }
    }
};

export const pollForTokenOnce = async (
    deviceCode: string,
    currentInterval = 5
): Promise<PollTokenResult> => {
    const response = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            client_id: CLIENT_ID,
            device_code: deviceCode,
            grant_type: "urn:ietf:params:oauth:grant-type:device_code",
        }),
    });

    const data = await response.json();

    if (data.access_token) {
        await storage.set("token", data.access_token);
        return { status: "completed", token: data.access_token as string };
    }

    if (data.error === "authorization_pending") {
        return { status: "pending" };
    }

    if (data.error === "slow_down") {
        return {
            status: "slow_down",
            interval: data.interval ?? currentInterval + 5,
        };
    }

    if (
        data.error === "access_denied" ||
        data.error === "expired_token" ||
        data.error === "incorrect_device_code"
    ) {
        return { status: "failed" };
    }

    if (!response.ok) {
        return { status: "failed" };
    }

    return { status: "pending" };
};
