import { test, expect, APIResponse } from "@playwright/test";
import { endPointURLs } from "@lib/endPointURLs";
import apiTestData from "testData/apiTestData.json";
import { testConfig } from "../../testConfig";

test.describe("Current Weather Data API tests", () => {
  const currentWeatherByLatLon = apiTestData.currentWeatherByLatLon;
  const totalWeatherLatLonScenarios = currentWeatherByLatLon.length;
  const currentWeatherByPostCode = apiTestData.currentWeatherByPostCode;
  const totalWeatherPostCodeScenarios = currentWeatherByPostCode.length;

  for (let x = 0; x < totalWeatherLatLonScenarios; x++) {
    test(
      "Get Current Weather Data for multiple places in the world based on Lat:" +
        currentWeatherByLatLon[x].lat +
        " and Lon: " +
        currentWeatherByLatLon[x].lon,
      { tag: "@api" },
      async ({ request }) => {
        let response: APIResponse;
        let weatherData: any;
        await test.step("Hitting the current Weather Data API using lat and lon", async () => {
          response = await request.get(
            testConfig.api +
              endPointURLs.URL_CURRENT_WEATHER_DATA +
              "?lat=" +
              currentWeatherByLatLon[x].lat +
              "&lon=" +
              currentWeatherByLatLon[x].lon +
              "&key=" +
              process.env.WEATHERBIT_API_KEY
          );
        });

        await test.step("Response status should be 200", async () => {
          expect(response.ok()).toBeTruthy();
          expect(response.status()).toBe(200);
          weatherData = await response.json();
        });

        await test.step("Response should return count as 1", async () => {
          expect(weatherData.count).toBe(1);
        });

        await test.step("Response should contain same lat,lon values as passed in the request and weather data should be present", async () => {
          expect(weatherData.data[0].lat.toString()).toBe(
            currentWeatherByLatLon[x].lat
          );
          expect(weatherData.data[0].lon.toString()).toBe(
            currentWeatherByLatLon[x].lon
          );
          expect(weatherData.data[0].weather).not.toBeNull();
        });
      }
    );
  }

  for (let x = 0; x < totalWeatherPostCodeScenarios; x++) {
    test(
      "Get Current Weather Data for multiple places in the world based on Postcode:" +
        currentWeatherByPostCode[x],
      { tag: "@api" },
      async ({ request }) => {
        let response: APIResponse;
        let weatherData: any;

        await test.step("Hitting the current Weather Data API using Postcode", async () => {
          response = await request.get(
            testConfig.api +
              endPointURLs.URL_CURRENT_WEATHER_DATA +
              "?postal_code=" +
              currentWeatherByPostCode[x] +
              "&key=" +
              process.env.WEATHERBIT_API_KEY
          );
        });

        await test.step("Response status should be 200", async () => {
          expect(response.ok()).toBeTruthy();
          expect(response.status()).toBe(200);
          weatherData = await response.json();
        });

        await test.step("Response should return count as 1", async () => {
          expect(weatherData.count).toBe(1);
        });

        await test.step("Validate weather data should be present", async () => {
          expect(weatherData.data[0].weather).not.toBeNull();
        });
      }
    );
  }
});
