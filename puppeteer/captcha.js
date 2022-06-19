require("dotenv").config();
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const RecaptchaPlugin = require("puppeteer-extra-plugin-recaptcha");

puppeteer.use(StealthPlugin());
puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: "2captcha",
      token: process.env.TWOCAPTCHA_KEY, // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
    },
    visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
  })
);

puppeteer.launch({ headless: false }).then(async (browser) => {
  const page = await browser.newPage();
  await page.goto("https://pits-webbots-fullstack.herokuapp.com/", {
    waitUntil: "load",
  });

  //
  const link = await page.$("a[href$='/tickets/captcha']");
  await link.click();

  const firstname = "Anton";
  const lastname = "Zaitsev";
  const email = "anton@zaitsev.com";
  const count = "1";

  await page.type("input[name='firstName']", firstname, { delay: 150 });

  await page.type("input[name='lastName']", lastname, { delay: 150 });

  await page.type("input[name='mail']", email, { delay: 150 });

  // const amountInput = await page.$("input[name='amount']");
  // await page.focus(amountInput);
  // await page.keyboard.press("ArrowRight");
  // await page.keyboard.press("Backspace");
  // await page.type("input[name='amount']", count, { delay: 5 });

  await page.waitForTimeout(2000);

  await page.solveRecaptchas();

  await Promise.all([
    page.waitForNavigation(),
    await page.waitForTimeout(5000),
    page.click("input[type='submit']"),
  ]);

  //
  await page.waitForTimeout(10000);
  await browser.close(); //close the browser once everything is done
});
