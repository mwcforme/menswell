import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { sentryVitePlugin } from "@sentry/vite-plugin";
// @ts-expect-error - .mjs file, no declaration needed
import { vitePluginCheckBannedWording } from "./scripts/check-banned-wording.mjs";
// @ts-expect-error - .mjs file, no declaration needed
import { vitePluginCheckHardcodedColors } from "./scripts/check-hardcoded-colors.mjs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    vitePluginCheckBannedWording(),
    vitePluginCheckHardcodedColors(),
    react(),
    mode === "development" && componentTagger(),
    process.env.SENTRY_AUTH_TOKEN
      ? sentryVitePlugin({
          org: "REPLACE_WITH_SENTRY_ORG_SLUG",
          project: "mwc-booking-lp",
          authToken: process.env.SENTRY_AUTH_TOKEN,
          telemetry: false,
        })
      : null,
  ].filter(Boolean),
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          // Vendor: React core — loads first, cached longest
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          // Router
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router';
          }
          // Supabase client — only needed on /book/schedule
          if (id.includes('node_modules/@supabase') || id.includes('node_modules/supabase')) {
            return 'vendor-supabase';
          }
          // Sentry — error tracking, non-critical path
          if (id.includes('node_modules/@sentry')) {
            return 'vendor-sentry';
          }
          // Framer Motion — animations
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion';
          }
          // Radix UI components
          if (id.includes('node_modules/@radix-ui')) {
            return 'vendor-radix';
          }
          // Zustand state
          if (id.includes('node_modules/zustand')) {
            return 'vendor-zustand';
          }
          // Admin pages — never loaded by PPC traffic
          if (id.includes('/pages/admin/')) {
            return 'chunk-admin';
          }
          // Booking funnel steps — loaded progressively
          if (id.includes('/pages/book/BookSchedule') || id.includes('/pages/book/BookConfirmed')) {
            return 'chunk-book-confirm';
          }
          if (id.includes('/pages/book/Book')) {
            return 'chunk-book-steps';
          }
          // Quiz funnel
          if (id.includes('/pages/TRTQuiz') || id.includes('/components/quiz/')) {
            return 'chunk-quiz';
          }
          // ED + WL landing pages
          if (id.includes('/pages/NewED') || id.includes('/pages/NewWeightLoss') || id.includes('/components/landing/ed/') || id.includes('/components/landing/wl/')) {
            return 'chunk-lp-ed-wl';
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "react": path.resolve(__dirname, "./node_modules/react"),
      "react/jsx-runtime": path.resolve(__dirname, "./node_modules/react/jsx-runtime"),
      "react/jsx-dev-runtime": path.resolve(__dirname, "./node_modules/react/jsx-dev-runtime"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
      "react-dom/client": path.resolve(__dirname, "./node_modules/react-dom/client"),
    },
  },
}));
