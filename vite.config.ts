import { defineConfig } from "vite";
//import react from "@vitejs/plugin-react";

const lib_name = "idc-custom-elements";

export default defineConfig({
  //plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        //"@emotion/react",
        //"@emotion/styled",
        "@eva-ics/webengine",
        "@eva-ics/webengine-react",
        //"@mui/base",
        //"@mui/core-downloads-tracker",
        //"@mui/icons-material",
        //"@mui/material",
        //"@mui/private-theming",
        //"@mui/styled-engine",
        //"@mui/system",
        //"@mui/types",
        //"@mui/utils",
        //"mui-color-input",
        "react",
        "react-dom",
        "uuid"
      ]
    },
    lib: {
      entry: "./src/lib.mts",
      name: lib_name,
      fileName: (format: string) => `${lib_name}.${format}.js`
    }
  }
});
