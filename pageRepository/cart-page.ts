import { Locator, Page } from "@playwright/test";

export class CartPage {
  private readonly page: Page;
  private readonly ICON_NO_OF_ITEMS_IN_CART: Locator;
  private readonly BTN_CHECKOUT: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ICON_NO_OF_ITEMS_IN_CART = page.locator(".shopping_cart_badge");
    this.BTN_CHECKOUT = page.locator(".btn_action.checkout_button");
  }

  async isItemPresentInCart(productName: string): Promise<boolean> {
    const allItemsInCart = await this.page.$$(
      ".cart_list .cart_item .inventory_item_name"
    );
    for (let i = 0; i < allItemsInCart.length; i++) {
      const item = allItemsInCart[i];
      if ((await item.textContent()) == productName) {
        return true;
      }
    }
  }

  async getNumberOfItemsInCart(): Promise<string> {
    return await this.ICON_NO_OF_ITEMS_IN_CART.textContent();
  }

  async checkout(): Promise<void> {
    await this.BTN_CHECKOUT.click();
  }
}
