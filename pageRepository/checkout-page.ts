import { Locator, Page } from "@playwright/test";

export class CheckoutPage {
  private readonly page: Page;
  private readonly TXT_FIRST_NAME: Locator;
  private readonly TXT_LAST_NAME: Locator;
  private readonly TXT_ZIP_CODE: Locator;
  private readonly BTN_CONTINUE: Locator;
  private readonly BTN_FINISH: Locator;
  private readonly TXT_COMPLETE_ORDER: Locator;

  constructor(page: Page) {
    this.page = page;
    this.TXT_FIRST_NAME = page.locator("#first-name");
    this.TXT_LAST_NAME = page.locator("#last-name");
    this.TXT_ZIP_CODE = page.locator("#postal-code");
    this.BTN_CONTINUE = page.locator("#continue");
    this.BTN_FINISH = page.locator("#finish");
    this.TXT_COMPLETE_ORDER = page.locator(".complete-header");
  }

  async fillYourInformation(checkoutDetails: any): Promise<void> {
    await this.TXT_FIRST_NAME.fill(checkoutDetails.firstName);
    await this.TXT_LAST_NAME.fill(checkoutDetails.lastName);
    await this.TXT_ZIP_CODE.fill(checkoutDetails.zipCode);
    await this.BTN_CONTINUE.click();
  }

  async getDisplayedTotalPriceOfItems(): Promise<string> {
    let totalDisplayedPrice = await this.page
      .locator(".summary_subtotal_label")
      .textContent();
    totalDisplayedPrice = totalDisplayedPrice.split(":")[1];
    totalDisplayedPrice = totalDisplayedPrice.replace(" ", "");
    totalDisplayedPrice = totalDisplayedPrice.replace(/\$/g, "");
    return totalDisplayedPrice;
  }

  async calculateTotalPriceOfItems(): Promise<number> {
    let totalPrice: number;
    totalPrice = 0;
    const allPricesInCart = await this.page.$$(".inventory_item_price");
    for (let i = 0; i < allPricesInCart.length; i++) {
      let price = await allPricesInCart[i].textContent();
      price = price.replace(/\$/g, "");
      totalPrice = totalPrice + parseFloat(price);
    }
    console.log("totalPrice: " + totalPrice);
    return totalPrice;
  }

  async finishCheckout(): Promise<void> {
    await this.BTN_FINISH.click();
  }

  async getCheckoutComplete(): Promise<string> {
    return await this.TXT_COMPLETE_ORDER.textContent();
  }
}
