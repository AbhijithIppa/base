import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/testConfig/setup.js",
    globals: true,
    reporters: [
      "default",
      {
        name: "friendly-error-reporter",
        handler() {
          return {
            onTestFailed(test) {
              if (test.meta?.friendlyErrorMessage) {
                // Add friendly message directly to the test object
                test.friendlyErrorMessage = test.meta.friendlyErrorMessage;
              }
            },
            async onFinished(files, errors) {
              // Modify the JSON output structure
              const results = files[0]?.result;
              if (results?.testResults) {
                results.testResults.forEach(suite => {
                  suite.assertionResults?.forEach(test => {
                    if (test.status === 'failed' && test.meta?.friendlyErrorMessage) {
                      // Add friendlyErrorMessage to the JSON output
                      test.friendlyErrorMessage = test.meta.friendlyErrorMessage;
                    }
                  });
                });
              }
            }
          };
        },
      },
    ],
  },
});