import { expect, test } from "@playwright/test";
import { startAppium, stopAppium } from "../../fixtures/appium";
import { LoginPageLeaf } from "../../pages/mobile/LoginPageLeaf";
import { UserPageLeaf } from "../../pages/mobile/UserPageLeaf";
const LeafOrgApp = require("../../pages/mobile/LeafOrgApp");
const { LoginPage } = require("../../pages/mobile/LoginPageLeaf");

let app;

test.beforeAll(async () => {
  await startAppium();
  app = new LeafOrgApp();
  await app.launch();
});

test.afterAll(async () => {
  await app.quit();
  await stopAppium();
});

test.describe("login", () => {
  test("succesful login", async () => {
    const loginPage = new LoginPageLeaf(app.driver);
    const userPage = new UserPageLeaf(app.driver);
    await loginPage.start();
    await loginPage.login("rajkumar@testleaf.com", "Leaf@123");
    const success = await userPage.loggedInSuccessfully();
    expect(success).toBe(true);
  });
});
