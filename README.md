<!-- <h1 align="center">
    <img src="https://readme-typing-svg.herokuapp.com/?font=Righteous&size=21&center=true&vCenter=true&width=500&height=70&duration=4000&pause=2000&lines=QE Code Challenge using Playwright;" />
</h1> -->
<h2 align="left">About</h2>
This repo covers both the UI and API tests as per outlined in the Qantas test code challenge
<br />
<br />

<h2 align="left">⚒️ Languages-Frameworks-Tools ⚒️</h2>

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Playwright](https://img.shields.io/static/v1?style=for-the-badge&message=Playwright&color=2EAD33&logo=Playwright&logoColor=FFFFFF&label=)
![Node.js Badge](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)
![Visual Studio Code Badge](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?logo=visualstudiocode&logoColor=fff&style=for-the-badge)
<br/>
<br />

<h2 align="left">Pre-requisite</h2>

You will need nodeJS to build this project. The UI test suite is configured to run on Chromium but can be modified to run on any browser we like.
<br />
<br />

<h2 align="left">Setup Instructions</h2>

1. Clone the repo

`git clone git@github.com:amitAutoS/qantas_test.git`

2. Install dependencies

`cd qantas_test`

`npm install`

`npx playwright install`

3. The env data is stored in the vault (refer to .env.vault file). You'll need the vault key for running the tests.
   Following is included in the .env files stored in the vault:

WEATHERBIT_API_KEY

SAUCEDEMO_USERID

SAUCEDEMO_PASSWORD

If running on mac, set the env key (DOTENV_KEY) like this:

`export DOTENV_KEY='dotenv://:key_e0b8517d246b8d93ac871a246b9eedf120d548cefb8ea243442524838258554f@dotenv.local/vault/.env.vault?environment=development'`

If running on windows, then set the env key (DOTENV_KEY) like this:

`$env:DOTENV_KEY='dotenv://:key_e0b8517d246b8d93ac871a246b9eedf120d548cefb8ea243442524838258554f@dotenv.local/vault/.env.vault?environment=development'`

<br />

<h2 align="left">Execution</h2>

- For running the UI tests:

`npm run webtest`

- For running the API tests:

`npm run apitest`

<br />

<h2 align="left">Reporting</h2>

- For generating the playwright test report:

`npm run playwrightReport`

- For generating the allure test report:

`npm run allureSingleReport`

This will produce single HTML report(index.html) under the folder allure-report
