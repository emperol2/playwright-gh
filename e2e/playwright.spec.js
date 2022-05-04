const { playAudit } = require('playwright-lighthouse');
const playwright = require('playwright');
const { test, expect } = require('@playwright/test');

test.describe('audit example', () => {
    test('open browser', async () => {
        const browser = await playwright['chromium'].launch({
            args: ['--remote-debugging-port=9222'],
        });
        const page = await browser.newPage();

        await page.goto('http://customkit.eu/');

        await playAudit({
            page: page,
            thresholds: {
                performance: 50,
                accessibility: 50,
                'best-practices': 50,
                seo: 50,
                pwa: 50,
            },
            opts: {
                formFactor: 'desktop',
                screenEmulation: {
                    mobile: false,
                    disable: false,
                    width: 1350,
                    height: 940,
                    deviceScaleRatio: 1,
                },
                throttling: {
                    rttMs: 40,
                    throughputKbps: 11024,
                    cpuSlowdownMultiplier: 1,
                    requestLatencyMs: 0,
                    downloadThroughputKbps: 0,
                    uploadThroughputKbps: 0,
                },
                throttlingMethod: "simulate",
            },
            reports: {
                formats: {
                    html: true, //defaults to false
                },
            },
            port: 9222,
        });

        await browser.close();
    });
});