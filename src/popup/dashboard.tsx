"use client";

import { useEffect, useState } from "react";
import {
    BiCheckCircle,
    BiChevronDown,
    BiCog,
    BiCopy,
    BiHistory,
    BiHomeAlt,
    BiInfoCircle,
    BiLinkExternal,
    BiLogOut,
    BiRefresh,
    BiSidebar,
    BiStats,
} from "react-icons/bi";
import { FiArrowUpRight, FiDownload, FiRepeat } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { storage } from "../shared/storage";
import Layout from "./components/layout";
import Logo from "./components/logo";

type Tab = "status" | "history" | "settings";
type BottomNavTab = "dashboard" | "stats" | "explore";

const DashboardPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>("status");
    const [bottomTab, setBottomTab] = useState<BottomNavTab>("dashboard");
    const [githubUser, setGithubUser] = useState<string>("User");
    const [repoName, setRepoName] = useState<string>("Repository");
    const [repoUrl, setRepoUrl] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            const repo = await storage.get<string>("github_repo");
            if (repo) {
                // Extract repo name from URL if possible
                try {
                    const url = new URL(repo);
                    const paths = url.pathname.split("/").filter(Boolean);
                    if (paths.length >= 2) {
                        setGithubUser(paths[0]);
                        setRepoName(paths[1]);
                        setRepoUrl(`https://github.com/${paths[0]}/${paths[1]}`);
                    } else {
                        setRepoName(repo);
                        setRepoUrl(repo);
                    }
                } catch {
                    setRepoName(repo);
                    setRepoUrl(repo);
                }
            }
        };
        loadData();
    }, []);

    const handleLogout = async () => {
        await storage.remove("token");
        await storage.remove("auth_state");
        await storage.remove("github_repo");
        navigate("/login", { replace: true });
    };

    const handleCopyRepo = () => {
        const repoLink = repoUrl ?? `https://github.com/${githubUser}/${repoName}`;
        navigator.clipboard.writeText(repoLink);
    };

    return (
        <Layout>
            <section className="h-120 w-full flex items-center justify-center">
                <div className="z-10 mx-auto flex h-full w-full max-w-95 flex-col overflow-hidden bg-[#FEF6F8] shadow-xl">
                    {/* Top Header */}
                    <header className="flex items-center justify-between px-4 py-3 shrink-0 border-b border-rose-100/50">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-200 text-rose-700 font-bold text-xs uppercase">
                            {githubUser.charAt(0)}
                        </div>
                        
                        <div className="flex items-center gap-1 bg-white/50 px-3 py-1 rounded-full border border-rose-200 cursor-pointer hover:bg-white transition-colors">
                            <Logo className="size-4" />
                            <span className="text-xs font-semibold text-neutral-800">{githubUser}</span>
                            <BiChevronDown className="text-neutral-500" />
                            <div className="h-3 w-px bg-rose-200 mx-1" />
                            <button onClick={handleCopyRepo} className="hover:text-rose-500 transition-colors">
                                <BiCopy size={14} className="text-neutral-500" />
                            </button>
                        </div>

                        <button className="p-1.5 rounded-lg hover:bg-rose-100 transition-colors text-neutral-600">
                            <BiSidebar size={20} />
                        </button>
                    </header>

                    {/* Main Content Area */}
                    <div className="flex-1 overflow-y-auto px-4 pb-4">
                        {bottomTab === "dashboard" && (
                            <>
                                {/* Sub Navigation Tabs */}
                                <nav className="flex justify-center gap-6 py-3 shrink-0">
                                    {(["status", "history", "settings"] as Tab[]).map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`text-sm font-medium capitalize transition-colors ${
                                                activeTab === tab
                                                    ? "text-neutral-900"
                                                    : "text-neutral-400 hover:text-neutral-600"
                                            }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </nav>

                                {activeTab === "status" && (
                                    <div className="flex flex-col items-center pt-4">
                                        {/* Hero Status Section */}
                                        <div className="text-center mb-8">
                                            <div className="relative inline-block mb-2">
                                                <h2 className="text-4xl font-bold text-neutral-900 tracking-tight">
                                                    Synced
                                                </h2>
                                                <button className="absolute -right-8 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-rose-500">
                                                    <BiRefresh size={20} />
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-center gap-1.5">
                                                <span className="text-emerald-500 font-medium text-sm">Successfully</span>
                                                <span className="text-emerald-500/50 font-medium text-sm">pushed</span>
                                            </div>
                                        </div>

                                        {/* Action Buttons Row */}
                                        <div className="flex justify-between w-full max-w-xs mb-8">
                                            <div className="flex flex-col items-center gap-2">
                                                <button className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500 text-white shadow-lg shadow-rose-200 hover:bg-rose-600 transition-all active:scale-95">
                                                    <FiDownload size={20} />
                                                </button>
                                                <span className="text-[11px] font-medium text-neutral-600">Sync</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-2">
                                                <button 
                                                    onClick={() => window.open(repoUrl ?? `https://github.com/${githubUser}/${repoName}`, "_blank")}
                                                    className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500 text-white shadow-lg shadow-rose-200 hover:bg-rose-600 transition-all active:scale-95"
                                                >
                                                    <FiArrowUpRight size={20} />
                                                </button>
                                                <span className="text-[11px] font-medium text-neutral-600">Repo</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-2">
                                                <button 
                                                    onClick={() => setActiveTab("settings")}
                                                    className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500 text-white shadow-lg shadow-rose-200 hover:bg-rose-600 transition-all active:scale-95"
                                                >
                                                    <FiRepeat size={20} />
                                                </button>
                                                <span className="text-[11px] font-medium text-neutral-600">Settings</span>
                                            </div>
                                        </div>

                                        {/* Banner / Alert */}
                                        <div className="w-full bg-white/60 border border-rose-200 rounded-2xl p-4 flex items-start gap-3 mb-4">
                                            <div className="h-10 w-10 shrink-0 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
                                                <BiInfoCircle size={24} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold text-neutral-900">Beta Version</h4>
                                                <p className="text-xs text-neutral-500 leading-relaxed mt-0.5">
                                                    We are not storing any of your data except GitHub keys for now. Enjoy syncing!
                                                </p>
                                            </div>
                                        </div>

                                        {/* Item List (Recent Sync Placeholder) */}
                                        <div className="w-full space-y-3">
                                            <div className="flex items-center justify-between px-1">
                                                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Recent Activity</span>
                                                <button className="text-xs font-medium text-rose-500 hover:underline">See all</button>
                                            </div>
                                            
                                            <div className="group bg-white/40 hover:bg-white/60 border border-rose-100 rounded-2xl p-3 flex items-center gap-3 transition-colors cursor-pointer">
                                                <div className="h-10 w-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
                                                    <BiCheckCircle size={20} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h5 className="text-sm font-semibold text-neutral-800 truncate">Connection Healthy</h5>
                                                    <p className="text-xs text-neutral-500 truncate">GitHub Auth is active</p>
                                                </div>
                                                <div className="text-right shrink-0">
                                                    <p className="text-sm font-bold text-neutral-800">Active</p>
                                                    <p className="text-[10px] text-emerald-500 font-medium">Verified</p>
                                                </div>
                                            </div>

                                            <button 
                                                onClick={() => setActiveTab("history")}
                                                className="w-full py-2 text-xs font-medium text-neutral-400 flex items-center justify-center gap-1.5 hover:text-neutral-600 transition-colors"
                                            >
                                                <BiHistory size={14} />
                                                View sync history
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "history" && (
                                    <div className="flex flex-col items-center justify-center h-full pt-10 text-center">
                                        <div className="h-16 w-16 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 mb-4">
                                            <BiHistory size={32} />
                                        </div>
                                        <h3 className="text-lg font-bold text-neutral-900">Sync History</h3>
                                        <p className="text-sm text-neutral-500 mt-2 max-w-[200px]">
                                            Detailed history is coming soon in the next update.
                                        </p>
                                    </div>
                                )}

                                {activeTab === "settings" && (
                                    <div className="space-y-4 pt-4">
                                        <div className="bg-white/60 border border-rose-200 rounded-2xl p-4">
                                            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">Repository Config</h4>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="text-[10px] font-bold text-neutral-500 uppercase ml-1">Current Repo</label>
                                                    <div className="mt-1 flex items-center gap-2 bg-white border border-rose-100 rounded-xl px-3 py-2">
                                                        <BiLinkExternal className="text-rose-400" size={16} />
                                                        <span className="text-sm text-neutral-700 truncate">{githubUser}/{repoName}</span>
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={() => navigate("/repo-setup")}
                                                    className="w-full py-2.5 bg-rose-50 text-rose-600 text-sm font-bold rounded-xl border border-rose-200 hover:bg-rose-100 transition-colors"
                                                >
                                                    Change Repository
                                                </button>
                                            </div>
                                        </div>

                                        <div className="bg-white/60 border border-rose-200 rounded-2xl p-4">
                                            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">Account</h4>
                                            <button 
                                                onClick={handleLogout}
                                                className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-50 text-red-600 text-sm font-bold rounded-xl border border-red-100 hover:bg-red-100 transition-colors"
                                            >
                                                <BiLogOut size={18} />
                                                Disconnect GitHub
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {bottomTab === "stats" && (
                            <div className="flex flex-col items-center justify-center h-full pt-20 text-center px-6">
                                <div className="h-16 w-16 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 mb-4">
                                    <BiStats size={32} />
                                </div>
                                <h3 className="text-lg font-bold text-neutral-900">Sync Statistics</h3>
                                <p className="text-sm text-neutral-500 mt-2">
                                    Track your progress and sync metrics here.
                                </p>
                                <div className="mt-6 p-4 bg-white/60 border border-rose-200 rounded-2xl w-full">
                                    <p className="text-xs font-bold text-rose-500 uppercase tracking-widest">Coming Soon</p>
                                    <p className="text-xs text-neutral-400 mt-1">Beta version focuses on core sync functionality.</p>
                                </div>
                            </div>
                        )}

                        {bottomTab === "explore" && (
                            <div className="flex flex-col items-center justify-center h-full pt-20 text-center px-6">
                                <div className="h-16 w-16 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 mb-4">
                                    <BiCog size={32} />
                                </div>
                                <h3 className="text-lg font-bold text-neutral-900">Settings & Explore</h3>
                                <p className="text-sm text-neutral-500 mt-2">
                                    Customize your experience and explore new features.
                                </p>
                                <div className="mt-6 p-4 bg-white/60 border border-rose-200 rounded-2xl w-full">
                                    <p className="text-xs font-bold text-rose-500 uppercase tracking-widest">Coming Soon</p>
                                    <p className="text-xs text-neutral-400 mt-1">More configuration options are on the way.</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bottom Navigation */}
                    <footer className="flex items-center justify-around px-6 py-4 border-t border-rose-100 bg-white/50 backdrop-blur-sm shrink-0">
                        <button 
                            onClick={() => setBottomTab("dashboard")}
                            className={`flex flex-col items-center gap-1 transition-colors ${
                                bottomTab === "dashboard" ? "text-rose-600" : "text-neutral-400 hover:text-neutral-600"
                            }`}
                        >
                            <BiHomeAlt size={22} />
                            <span className="text-[10px] font-bold uppercase tracking-tighter">Dashboard</span>
                        </button>
                        <button 
                            onClick={() => setBottomTab("stats")}
                            className={`flex flex-col items-center gap-1 transition-colors ${
                                bottomTab === "stats" ? "text-rose-600" : "text-neutral-400 hover:text-neutral-600"
                            }`}
                        >
                            <BiStats size={22} />
                            <span className="text-[10px] font-bold uppercase tracking-tighter">Stats</span>
                        </button>
                        <button 
                            onClick={() => setBottomTab("explore")}
                            className={`flex flex-col items-center gap-1 transition-colors ${
                                bottomTab === "explore" ? "text-rose-600" : "text-neutral-400 hover:text-neutral-600"
                            }`}
                        >
                            <BiCog size={22} />
                            <span className="text-[10px] font-bold uppercase tracking-tighter">Settings</span>
                        </button>
                    </footer>
                </div>
            </section>
        </Layout>
    );
};

export default DashboardPage;
