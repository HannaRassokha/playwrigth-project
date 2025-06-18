const { remote } = require("webdriverio");

class LeafOrgApp {
  async launch() {
    this.driver = await remote({
      protocol: "http",
      hostname: "localhost",
      port: 4723,
      path: "/", 
      capabilities: {
        platformName: "Android",
        "appium:platformVersion": "5.1",
        "appium:deviceName": "emulator-5554",
        "appium:automationName": "UiAutomator2",
        "appium:app": "/Users/hanna.rassokha/Documents/leaforg.apk",
        "appium:newCommandTimeout": 3600,
        "appium:autoGrantPermissions": true,
      },
    });
  }

  async quit() {
    if (this.driver) {
      await this.driver.deleteSession();
    }
  }

  async getSource() {
    return this.driver.getPageSource();
  }
}

module.exports = LeafOrgApp;
