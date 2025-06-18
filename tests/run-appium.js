const { spawn } = require("child_process");
const wd = require("wd");

const appiumProcess = spawn("appium", ["--port", "4723"], {
  stdio: "inherit", 
});

const waitForAppium = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  try {
    console.log("Waiting for Appium to start...");
    await waitForAppium(5000); 

    const driver = wd.promiseChainRemote("127.0.0.1", 4723);

    const capabilities = {
      platformName: "Android",
      platformVersion: "5.1",
      deviceName: "emulator-5554",
      automationName: "UiAutomator2",
      app: "/Users/hanna.rassokha/Documents/leaforg.apk",
      newCommandTimeout: 3600,
      ensureWebviewsHavePages: true,
      nativeWebScreenshot: true,
      connectHardwareKeyboard: true,
    };

    console.log("Starting Appium session...");
    await driver.init(capabilities);
    console.log("Session started.");

    await driver.quit();
  } catch (err) {
    console.error("Error:", err);
  } finally {
    console.log("Shutting down Appium...");
    appiumProcess.kill();
  }
}

main();
