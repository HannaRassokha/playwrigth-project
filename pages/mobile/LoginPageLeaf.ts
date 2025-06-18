export class LoginPageLeaf {
  constructor(private driver: any) {}
  async start() {
    const webView = await this.driver.$(
      '//android.webkit.WebView[@content-desc="TESTLEAF"]',
    );
    await webView.waitForDisplayed({ timeout: 5000 });
    await this.driver.takeScreenshot();
  }

  async login(username: string, password: string) {
    await this.driver.$(
      '//android.widget.FrameLayout[@resource-id="android:id/content"]',
    );
    this.driver.takeScreenshot();

    function getKeyCode(char: string): number {
      const keyMap: Record<string, number> = {
        a: 29,
        b: 30,
        c: 31,
        d: 32,
        e: 33,
        f: 34,
        g: 35,
        h: 36,
        i: 37,
        j: 38,
        k: 39,
        l: 40,
        m: 41,
        n: 42,
        o: 43,
        p: 44,
        q: 45,
        r: 46,
        s: 47,
        t: 48,
        u: 49,
        v: 50,
        w: 51,
        x: 52,
        y: 53,
        z: 54,
        "0": 7,
        "1": 8,
        "2": 9,
        "3": 10,
        "4": 11,
        "5": 12,
        "6": 13,
        "7": 14,
        "8": 15,
        "9": 16,
        "@": 77,
        ".": 56,
        _: 69,
      };

      const lowerChar = char.toLowerCase();
      if (!(lowerChar in keyMap))
        throw new Error(`No keycode for character: ${char}`);
      return keyMap[lowerChar];
    }

    // Helper: Check if a character needs SHIFT (uppercase or symbol)
    function requiresShift(char: string): boolean {
      return /[A-Z@_]/.test(char);
    }

    // Reusable helper to type text using keycodes
    async function typeText(driver: WebdriverIO.Browser, text: string) {
      for (const char of text) {
        const keyCode = getKeyCode(char);
        const metaState = requiresShift(char) ? 1 : 0; // SHIFT key modifier
        await driver.pressKeyCode(keyCode, metaState);
        await driver.pause(100);
      }
    }

    // Username field
    const usernameField = await this.driver.$(
      '//android.webkit.WebView[@content-desc="TESTLEAF"]/android.view.View[3]/android.widget.EditText',
    );
    await usernameField.waitForDisplayed({ timeout: 5000 });
    await usernameField.click();
    await usernameField.clearValue();
    await typeText(this.driver, username);

    // Password field
    const passwordField = await this.driver.$(
      '//android.webkit.WebView[@content-desc="TESTLEAF"]/android.view.View[4]/android.widget.EditText',
    );
    await passwordField.waitForDisplayed({ timeout: 5000 });
    await passwordField.click();
    await passwordField.clearValue();
    await typeText(this.driver, password);

    // Tap the login button
    const loginButton = await this.driver.$(
      '//android.widget.Button[@content-desc="LOGIN"]',
    );
    await loginButton.click();
  }
}
