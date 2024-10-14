import { test as baseTest } from "@playwright/test";
import { LoginPage } from "@pages/login-page";
import { InventoryPage } from "@pages/inventory-page";
import { CartPage } from "@pages/cart-page";
import { CheckoutPage } from "@pages/checkout-page";

const test = baseTest.extend<{
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});

export default test;
