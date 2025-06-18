## Project Structure
<pre>
```
├── fixtures
│   └── appium.ts
├── my-reports
│   └── html-report
├── node_modules
├── package-lock.json
├── package.json
├── pages
│   └── mobile
├── playwright.config.ts
├── test-results
├── tests
│   ├── api
│   └── mobile
├── tests-config
└── utils
```
</pre>
# Mobile & API Testing Project

This project contains automated tests for mobile and API testing using WebdriverIO, Appium 2, and Playwright, written in TypeScript.

## Prerequisites

Ensure the following are installed:

- Node.js & npm  
- TypeScript  
- Playwright  
- WebdriverIO  
- Appium 2  

## Mobile Testing

- Uses the **Page Object** model.  
- Example runs on **Pixel XL API 22**.  
- Start the Android emulator manually via **Android Virtual Device Manager** before running tests.

## API Testing

- Various test strategies are applied across different endpoints.

## Running Tests

To run all tests (mobile & API):

```bash
npx playwright test
