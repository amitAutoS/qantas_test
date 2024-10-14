import { Locator, Page } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;
  private readonly TXT_USERNAME: Locator;
  private readonly TXT_PASSWORD: Locator;
  private readonly BTN_LOGIN: Locator;

  constructor(page: Page) {
    this.page = page;
    this.TXT_USERNAME = page.locator("#user-name");
    this.TXT_PASSWORD = page.locator("#password");
    this.BTN_LOGIN = page.locator("#login-button");
  }

  async navigateToLoginPage(): Promise<void> {
    await this.page.goto("/", {
      waitUntil: "load",
      timeout: 0,
    });
  }

  async login(): Promise<void> {
    await this.TXT_USERNAME.fill(process.env.SAUCEDEMO_USERID);
    await this.TXT_PASSWORD.fill(process.env.SAUCEDEMO_PASSWORD);
    await this.BTN_LOGIN.click();
  }
}
