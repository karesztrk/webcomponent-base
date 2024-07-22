import terser from "@rollup/plugin-terser";
import { defineConfig } from "rollup";

export default defineConfig({
  input: "src/index.js",
  output: [
    {
      dir: "dist",
      format: "es",
      exports: "named",
      preserveModules: true,
      sourcemap: true,
    },
  ],
  plugins: [terser()],
});
