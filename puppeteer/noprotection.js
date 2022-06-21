const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

puppeteer.launch({ headless: false }).then(async (browser) => {
  const page = await browser.newPage();

  const firstname = "Anton";
  const lastname = "Zaitsev";
  const email = "anton@zaitsev.com";

  for (let i = 0; i < 10; i++) {
    await page.goto("https://pits-webbots-fullstack.herokuapp.com/", {
      waitUntil: "load",
    });

    await page.waitForTimeout(5000);

    const link = await page.$("a[href$='/tickets/noprotection']");
    await link.click();

    await page.type("input[name='firstName']", firstname, { delay: 5 });

    await page.type("input[name='lastName']", lastname, { delay: 5 });

    await page.type("input[name='mail']", email, { delay: 5 });

    await page.waitForTimeout(500);

    await Promise.all([
      page.waitForNavigation(),
      page.click("input[type='submit']"),
    ]);

    await page.waitForTimeout(500);
  }

  //
  await page.waitForTimeout(5000);
  await browser.close(); //close the browser once everything is done
});
