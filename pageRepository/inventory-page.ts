import { Locator, Page } from "@playwright/test";

export class InventoryPage {
  private readonly page: Page;
  private readonly ICON_NO_OF_ITEMS_IN_CART: Locator;
  private readonly LINK_SHOPPING_CART: Locator;
  private readonly TXT_SHOPPING_CART_ITEMS_NAME: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ICON_NO_OF_ITEMS_IN_CART = page.locator(".shopping_cart_badge");
    this.LINK_SHOPPING_CART = page.locator(".shopping_cart_link");
    this.TXT_SHOPPING_CART_ITEMS_NAME = page.locator(
      ".cart_list .cart_item .inventory_item_name"
    );
  }

  async goToCart(): Promise<void> {
    await this.LINK_SHOPPING_CART.click();
  }

  async addToCart(productName: string): Promise<void> {
    await this.page
      .locator("//div[.='" + productName + "']/../../..//button")
      .click();
  }
}
