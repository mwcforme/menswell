declare module "./scripts/check-banned-wording.mjs" {
  import type { Plugin } from "vite";
  export function vitePluginCheckBannedWording(): Plugin;
  export function scan(): Array<{
    file: string;
    line: number;
    rule: string;
    message: string;
    snippet: string;
  }>;
}
