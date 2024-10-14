import test from "@lib/baseTest";
// import * as allure from "allure-js-commons";

test.describe("SauceDemo tests", () => {
  test(
    "User should be able to checkout items from the cart",
    { tag: "@ui" },
    async ({ loginPage }) => {
      await loginPage.navigateToLoginPage();
      await loginPage.login();
    }
  );
});
