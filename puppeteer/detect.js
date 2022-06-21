const puppeteer = require("puppeteer-extra");

// ---------------------- AUSKLAMMERN ---------------------------
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");

// puppeteer.use(StealthPlugin());
// --------------------------------------------------------------

puppeteer.launch({ headless: false }).then(async (browser) => {
  const page = await browser.newPage();

  await page.goto("https://pits-webbots-fullstack.herokuapp.com/", {
    waitUntil: "load",
  });

  await page.waitForTimeout(10000);
  await browser.close();
});
