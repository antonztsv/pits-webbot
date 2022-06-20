const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

puppeteer.launch({ headless: false }).then(async (browser) => {
  const page = await browser.newPage();

  //   await page.goto("https://abrahamjuliot.github.io/creepjs/", {
  //     waitUntil: "load",
  //   });

  //   await page.goto("https://bot.sannysoft.com/", {
  //     waitUntil: "load",
  //   });

  await page.goto("https://pits-webbots-fullstack.herokuapp.com/", {
    waitUntil: "load",
  });

  await page.waitForTimeout(5000);

  await page.screenshot({ path: "test.png", fullPage: true });

  //
  await page.waitForTimeout(5000);
  await browser.close();
});
