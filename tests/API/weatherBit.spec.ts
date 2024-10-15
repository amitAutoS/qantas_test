import { test, expect, APIResponse } from "@playwright/test";
import { endPointURLs } from "@lib/endPointURLs";
import apiTestData from "testData/apiTestData.json";
import { testConfig } from "../../testConfig";

test.describe("Current Weather Data API tests", () => {
  const currentWeather = apiTestData.currentWeather;
  const totalWeatherScenarios = currentWeather.length;
  for (let x = 0; x < totalWeatherScenarios; x++) {
    test(
      "Get Current Weather Data for multiple places in the world based on Lat:" +
        currentWeather[x].lat +
        " and Lon: " +
        currentWeather[x].lon,
      { tag: "@api" },
      async ({ request }) => {
        let response: APIResponse;
        let weatherData: any;
        await test.step("Hitting the current Weather Data API", async () => {
          response = await request.get(
            testConfig.api +
              endPointURLs.URL_CURRENT_WEATHER_DATA +
              "?lat=" +
              currentWeather[x].lat +
              "&lon=" +
              currentWeather[x].lon +
              "&key=" +
              process.env.WEATHERBIT_API_KEY
          );
        });

        await test.step("Response status should be 200", async () => {
          expect(response.ok()).toBeTruthy();
          expect(response.status()).toBe(200);
          weatherData = await response.json();
        });

        await test.step("Response should contain same lat,lon values as passed in the request and weather data should be present", async () => {
          expect(weatherData.data[0].lat.toString()).toBe(
            currentWeather[x].lat
          );
          expect(weatherData.data[0].lon.toString()).toBe(
            currentWeather[x].lon
          );
          expect(weatherData.data[0].weather).not.toBeNull();
        });
      }
    );
  }
});
