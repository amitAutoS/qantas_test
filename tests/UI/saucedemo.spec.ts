import test from "@lib/baseTest";
import testData from "testData/saucedemoTestData.json";
import { expect } from "@playwright/test";

test.describe("SauceDemo tests", () => {
  test(
    "User should be able to checkout items from the cart",
    { tag: "@ui" },
    async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
      let products: any;
      await test.step("Login to Saucedemo portal", async () => {
        await loginPage.navigateToLoginPage();
        await loginPage.login();
      });

      await test.step("Add some products to the cart", async () => {
        products = testData.products.length;
        for (let i = 0; i < products; i++) {
          const product = testData.products[i];
          await test.step(
            "Adding product: " + product + ", to the cart",
            async () => {
              await inventoryPage.addToCart(product);
            }
          );
        }
      });

      await test.step("Validate cart icon has been updated with the correct number of added products", async () => {
        const noOfItems = await cartPage.getNumberOfItemsInCart();
        expect(parseInt(noOfItems)).toBe(products);
      });

      await test.step("Validate the cart has the correct products which were added before", async () => {
        await inventoryPage.goToCart();
        for (let i = 0; i < products; i++) {
          const product = testData.products[i];
          await test.step(
            "Validate the product: " + product + ", is present in the cart",
            async () => {
              expect(await cartPage.isItemPresentInCart(product)).toBeTruthy();
            }
          );
        }
      });

      await test.step("Validate item total amount is correct for selected products when checking out", async () => {
        await cartPage.checkout();
        await checkoutPage.fillYourInformation(testData.checkoutDetails);
        const totalPrice = await checkoutPage.calculateTotalPriceOfItems();
        const totalPriceDisplayed =
          await checkoutPage.getDisplayedTotalPriceOfItems();
        expect(totalPrice.toString()).toEqual(totalPriceDisplayed);
      });

      await test.step("Validate the checkout is completed successfully", async () => {
        await checkoutPage.finishCheckout();
        const checkoutComplete = await checkoutPage.getCheckoutComplete();
        expect(checkoutComplete).toEqual("Thank you for your order!");
      });
    }
  );
});
