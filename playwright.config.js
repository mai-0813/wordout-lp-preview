const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    timeout: 30_000,
    fullyParallel: true,
    retries: 0,
    use: {
        baseURL: 'http://127.0.0.1:8000',
        trace: 'on-first-retry',
    },
    webServer: {
        command: 'python3 -m http.server 8000',
        url: 'http://127.0.0.1:8000',
        reuseExistingServer: true,
    },
});
