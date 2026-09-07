// @ts-check
import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"

import { SITE } from "./src/consts.js"

// https://astro.build/config
export default defineConfig({
  site: SITE.siteUrl,
  integrations: [mdx()],
})
