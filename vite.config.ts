import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        viteStaticCopy({
            targets: [
                {
                    src: "public/manifest.json",
                    dest: ".",
                },
            ],
        }),
    ],
    build: {
        outDir: "build",
        rollupOptions: {
            input: {
                main: "./index.html",
                background: resolve(__dirname, "src/background/index.ts"),
                content: resolve(__dirname, "src/content/index.ts"),
            },
            output: {
                entryFileNames: "[name]/index.js",
                chunkFileNames: "shared/[name].js",
                assetFileNames: "assets/[name].[ext]",
            },
        },
    },
});
