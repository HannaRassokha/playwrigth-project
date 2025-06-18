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
//TODO: Add more tests for the mobile app:
// 1.	User Login Functionality
// •	User should not be able to log in with invalid credentials.
// 2.	Menu Navigation
// •	User can navigate between Info, Scan, and Settings using the widget menu bar.
// 3.	Scan Access Control
// •	Scan functionality should only be available in employee mode.
// 4.	Upload/Update Documents
// •	User can upload or update their driver’s license and participant ID from the profile page.
// 5.	Logout Functionality
// •	User can successfully log out of the application.
// 6.	Update Settings
// •	User can access settings, update profile and participant details, and save the changes.
