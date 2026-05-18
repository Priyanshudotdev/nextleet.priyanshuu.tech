"use client";

import { useState } from "react";
import {
    BiCheck,
    BiCode,
    BiFile,
    BiPencil,
    BiRefresh,
    BiTargetLock,
    BiX,
} from "react-icons/bi";
import { IoLogoGithub } from "react-icons/io5";
import Layout from "./components/layout";

type Tab = "overview" | "syncs" | "settings";

type Difficulty = "easy" | "med" | "hard";

const STREAK_DAYS = [
    { id: "mon", label: "M", status: "done" },
    { id: "tue", label: "T", status: "done" },
    { id: "wed", label: "W", status: "today" },
    { id: "thu", label: "T", status: "missed" },
    { id: "fri", label: "F", status: "future" },
    { id: "sat", label: "S", status: "future" },
    { id: "sun", label: "S", status: "future" },
] as const;

const RECENT_SYNCS: Array<{
    name: string;
    time: string;
    lang: string;
    difficulty: Difficulty;
}> = [
    { name: "two-sum", time: "2 min ago", lang: "TypeScript", difficulty: "easy" },
    {
        name: "longest-palindromic-substring",
        time: "1 hr ago",
        lang: "TypeScript",
        difficulty: "med",
    },
    {
        name: "median-of-two-sorted-arrays",
        time: "yesterday",
        lang: "TypeScript",
        difficulty: "hard",
    },
    {
        name: "reverse-integer",
        time: "2 days ago",
        lang: "TypeScript",
        difficulty: "med",
    },
    {
        name: "string-to-integer-atoi",
        time: "3 days ago",
        lang: "TypeScript",
        difficulty: "med",
    },
];

const difficultyClass: Record<Difficulty, string> = {
    easy: "bg-emerald-100 text-emerald-800",
    med: "bg-amber-100 text-amber-800",
    hard: "bg-red-100 text-red-800",
};

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState<Tab>("overview");

    return (
        <Layout>
            <section className="h-120 z-10 w-full">
                <div className="z-10 mx-auto flex h-full w-full max-w-95 flex-col overflow-hidden bg-[#FEF6F8] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.08)]">
                    {/* <header className="shrink-0 bg-[#2A2A2C] px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-300">
                  <Code2 size={15} className="text-[#2A2A2C]" />
                </div>
                <p className="text-sm font-medium">
                  <span className="text-[#FEF6F8]">Leet</span>
                  <span className="text-rose-300">Sync</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  <span className="text-[11px] text-zinc-400">connected</span>
                </div>
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-md border border-zinc-700 px-2 py-1 text-[11px] text-zinc-400 transition-colors hover:border-rose-300 hover:text-rose-300"
                >
                  <LogOut size={12} />
                  sign out
                </button>
              </div>
            </div>
          </header> */}

                    {/* <div className="shrink-0 border-b border-rose-100 bg-white px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-300 text-xs font-medium text-[#2A2A2C]">
                  PK
                </div>
                <div>
                  <p className="text-[13px] font-medium leading-tight text-[#2A2A2C]">
                    Priyanshu Kayarkar
                  </p>
                  <p className="text-[11px] text-zinc-500">@priyanshudotdev</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-2 py-1">
                <IoLogoGithub size={11} className="text-[#2A2A2C]" />
                <span className="text-[11px] font-medium text-[#2A2A2C]">Nexus</span>
              </div>
            </div>
          </div> */}

                    <nav className="shrink-0 border-b border-rose-100 bg-[#FEF6F8]">
                        <div className="flex">
                            {(["overview", "syncs", "settings"] as Tab[]).map((tab) => (
                                <button
                                    key={tab}
                                    type="button"
                                    onClick={() => setActiveTab(tab)}
                                    className={`h-9 flex-1 border-b-2 text-[12px] font-medium capitalize transition-colors ${
                                        activeTab === tab
                                            ? "border-rose-300 text-[#2A2A2C]"
                                            : "border-transparent text-zinc-400 hover:text-[#2A2A2C]"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </nav>

                    <div className="flex-1 overflow-y-auto">
                        {activeTab === "overview" && (
                            <div className="space-y-4 p-4">
                                <section>
                                    <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.06em] text-zinc-500">
                                        streak
                                    </p>
                                    <div className="flex justify-between gap-1.5">
                                        {STREAK_DAYS.map((day) => (
                                            <div
                                                key={day.id}
                                                className="flex flex-col items-center gap-1.5"
                                            >
                                                <div
                                                    className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                                                        day.status === "done"
                                                            ? "bg-[#2A2A2C]"
                                                            : day.status === "today"
                                                              ? "border-2 border-[#2A2A2C] bg-rose-300"
                                                              : day.status === "missed"
                                                                ? "bg-rose-100"
                                                                : "bg-rose-50"
                                                    }`}
                                                >
                                                    {day.status === "done" && (
                                                        <BiCheck
                                                            size={14}
                                                            className="text-rose-300"
                                                        />
                                                    )}
                                                    {day.status === "today" && (
                                                        <span className="h-1.5 w-1.5 rounded-full bg-[#2A2A2C]" />
                                                    )}
                                                    {day.status === "missed" && (
                                                        <BiX
                                                            size={12}
                                                            className="text-zinc-400"
                                                        />
                                                    )}
                                                    {day.status === "future" && (
                                                        <span className="h-0.5 w-2 rounded-full bg-zinc-300" />
                                                    )}
                                                </div>
                                                <span className="text-[10px] font-medium text-zinc-400">
                                                    {day.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="mt-3 text-[11px] text-zinc-500">
                                        <span className="font-medium text-[#2A2A2C]">
                                            5 day
                                        </span>{" "}
                                        streak this week
                                    </p>
                                </section>

                                <div className="-mx-4 h-px bg-rose-100" />

                                <section>
                                    <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.06em] text-zinc-500">
                                        synced stats
                                    </p>
                                    <div className="grid grid-cols-2 gap-2">
                                        <article className="col-span-2 rounded-xl border border-rose-200 bg-white px-3.5 py-3">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="text-[11px] text-zinc-400">
                                                        total synced
                                                    </p>
                                                    <p className="text-[22px] font-medium text-[#2A2A2C]">
                                                        44
                                                    </p>
                                                    <p className="mt-1 text-[11px] text-zinc-400">
                                                        problems pushed to github
                                                    </p>
                                                </div>
                                                <span className="rounded-md border border-rose-200 px-2 py-0.5 text-[10px] font-medium text-zinc-500">
                                                    all time
                                                </span>
                                            </div>
                                        </article>

                                        <article className="rounded-xl border border-rose-200 bg-white px-3.5 py-3">
                                            <p className="text-[22px] font-medium text-[#2A2A2C]">
                                                22
                                            </p>
                                            <span className="mt-1 inline-block rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-800">
                                                easy
                                            </span>
                                        </article>

                                        <article className="rounded-xl border border-rose-200 bg-white px-3.5 py-3">
                                            <p className="text-[22px] font-medium text-[#2A2A2C]">
                                                14
                                            </p>
                                            <span className="mt-1 inline-block rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-800">
                                                med
                                            </span>
                                        </article>

                                        <article className="col-span-2 flex items-center justify-between rounded-xl border border-rose-200 bg-white px-3.5 py-3">
                                            <p className="text-[22px] font-medium text-[#2A2A2C]">
                                                8
                                            </p>
                                            <span className="rounded-md bg-red-100 px-2 py-0.5 text-[10px] font-medium text-red-800">
                                                hard
                                            </span>
                                        </article>
                                    </div>
                                </section>
                            </div>
                        )}

                        {activeTab === "syncs" && (
                            <div className="flex h-full flex-col">
                                <div className="flex items-center justify-between border-b border-rose-100 px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[11px] text-zinc-500">
                                            sort by:
                                        </span>
                                        <select className="rounded-lg border border-rose-200 bg-transparent px-2 py-1 pr-6 text-[12px] text-[#2A2A2C] focus:outline-none">
                                            <option>Last Submitted</option>
                                            <option>Problem Name</option>
                                            <option>Difficulty</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="text-[11px] text-zinc-400">
                                            updated 1m ago
                                        </span>
                                        <button
                                            type="button"
                                            className="rounded-md p-1 transition-colors hover:bg-white"
                                        >
                                            <BiRefresh
                                                size={12}
                                                className="text-zinc-400"
                                            />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.06em] text-zinc-500">
                                        recent syncs
                                    </p>

                                    {RECENT_SYNCS.map((sync, index) => (
                                        <article
                                            key={sync.name}
                                            className={`flex h-12 items-center gap-3 ${
                                                index !== RECENT_SYNCS.length - 1
                                                    ? "border-b border-rose-100"
                                                    : ""
                                            }`}
                                        >
                                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-rose-200 bg-rose-50">
                                                <BiFile
                                                    size={14}
                                                    className="text-[#2A2A2C]"
                                                />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-[12px] font-medium text-[#2A2A2C]">
                                                    {sync.name}
                                                </p>
                                                <p className="text-[11px] text-zinc-400">
                                                    {sync.time} · {sync.lang}
                                                </p>
                                            </div>

                                            <div className="flex shrink-0 items-center gap-2">
                                                <span
                                                    className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${difficultyClass[sync.difficulty]}`}
                                                >
                                                    {sync.difficulty}
                                                </span>
                                                <BiCheck
                                                    size={14}
                                                    className="text-emerald-300"
                                                />
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "settings" && (
                            <div className="space-y-4 p-4">
                                <section className="rounded-xl border border-rose-200 bg-white p-3.5">
                                    <div className="mb-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <IoLogoGithub
                                                size={14}
                                                className="text-[#2A2A2C]"
                                            />
                                            <span className="text-[13px] font-medium text-[#2A2A2C]">
                                                Priyanshudotdev/Nexus
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            className="rounded-md p-1.5 transition-colors hover:bg-rose-50"
                                        >
                                            <BiPencil
                                                size={12}
                                                className="text-zinc-500"
                                            />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-4 text-[11px] text-zinc-500">
                                        <div className="flex items-center gap-1.5">
                                            <BiCode size={11} />
                                            <span>main</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <BiFile size={11} />
                                            <span>solutions/</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <BiTargetLock size={11} />
                                            <span>public</span>
                                        </div>
                                    </div>
                                </section>

                                <section className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <label
                                            htmlFor="branch"
                                            className="ml-1 text-[11px] font-medium text-zinc-500"
                                        >
                                            branch
                                        </label>
                                        <input
                                            id="branch"
                                            type="text"
                                            placeholder="main"
                                            className="w-full rounded-lg border border-rose-200 bg-white px-3 py-2 text-[12px] focus:border-rose-300 focus:outline-none"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label
                                            htmlFor="base-path"
                                            className="ml-1 text-[11px] font-medium text-zinc-500"
                                        >
                                            base path
                                        </label>
                                        <input
                                            id="base-path"
                                            type="text"
                                            placeholder="e.g. solutions"
                                            className="w-full rounded-lg border border-rose-200 bg-white px-3 py-2 text-[12px] focus:border-rose-300 focus:outline-none"
                                        />
                                    </div>
                                </section>

                                <section className="space-y-2 pt-1">
                                    <button
                                        type="button"
                                        className="h-9 w-full rounded-lg bg-[#2A2A2C] text-[13px] font-medium text-[#FEF6F8] transition-opacity hover:opacity-90"
                                    >
                                        Save Settings
                                    </button>

                                    <button
                                        type="button"
                                        className="h-9 w-full rounded-lg border border-rose-200 bg-transparent text-[13px] font-medium text-[#2A2A2C]"
                                    >
                                        Test Connection
                                    </button>
                                </section>

                                <div className="pt-2 text-center">
                                    <button
                                        type="button"
                                        className="text-[12px] text-zinc-400 transition-colors hover:text-red-700"
                                    >
                                        disconnect github
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default DashboardPage;
