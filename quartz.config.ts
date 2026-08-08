import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "机器人与自动驾驶",
    pageTitleSuffix: " · kb-robotics",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: null,
    },
    locale: "zh-CN",
    baseUrl: "zhaojinting2020.github.io/kb-robotics",
    ignorePatterns: ["private", "templates", ".obsidian", "cache", ".backup"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Noto Sans SC",
        body: "Noto Sans SC",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#fafbfc",
          lightgray: "#e6e8eb",
          gray: "#8b939e",
          darkgray: "#2c3338",
          dark: "#1a1d21",
          secondary: "#b45309",
          tertiary: "#f59e0b",
          highlight: "rgba(15, 110, 86, 0.08)",
          textHighlight: "#f6e05e88",
        },
        darkMode: {
          light: "#161a1d",
          lightgray: "#2a3036",
          gray: "#6b7280",
          darkgray: "#d1d5db",
          dark: "#f3f4f6",
          secondary: "#f59e0b",
          tertiary: "#b45309",
          highlight: "rgba(52, 211, 153, 0.12)",
          textHighlight: "#f6e05e40",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
