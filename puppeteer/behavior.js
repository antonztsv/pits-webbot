const puppeteer = require("puppeteer-extra");
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");
// const HumanizePlugin = require("@extra/humanize");

// puppeteer.use(StealthPlugin());

puppeteer.launch({ headless: false }).then(async (browser) => {
  const page = await browser.newPage();
  await page.goto("https://pits-webbots-fullstack.herokuapp.com/", {
    waitUntil: "load",
  });

  await page.waitForTimeout(5000);

  //
  const link = await page.$("a[href$='/tickets/behavoir']");
  await link.click();

  const firstname = "Anton";
  const lastname = "Zaitsev";
  const email = "anton@zaitsev.com";

  await page.type("input[name='firstName']", firstname, { delay: 150 });

  await page.type("input[name='lastName']", lastname, { delay: 150 });

  await page.type("input[name='mail']", email, { delay: 150 });

  await page.waitForTimeout(2000);

  page.click("input[type='submit']"),
    //
    await page.waitForTimeout(5000);
  await browser.close(); //close the browser once everything is done
});
