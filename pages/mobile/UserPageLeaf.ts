export class UserPageLeaf {
  constructor(private driver: any) {}

  async loggedInSuccessfully(): Promise<boolean> {
    await this.driver.pause(3000);
    const tabWigget = await this.driver.$("//android.widget.TabWidget");
    await tabWigget.waitForDisplayed({ timeout: 5000 });
    return await tabWigget.isDisplayed();
  }
}
