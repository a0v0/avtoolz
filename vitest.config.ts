import { resolve } from "path";
import { configDefaults, defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, "tests/*"],
    globals: true,
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
});
