require("dotenv").config();
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const RecaptchaPlugin = require("puppeteer-extra-plugin-recaptcha");

// reCAPTCHAs (and hCaptchas) use a per-site sitekey.
// Interestingly enough the response token after solving a challenge
// is(currently) not tied to a specific session or IP and can be
// passed on to others(until they expire).This is how the external
// solutions provider work: They're being given a sitekey and URL,
// solve the challenge and respond with a response token.

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

  await page.waitForTimeout(5000);

  const link = await page.$("a[href$='/tickets/captcha']");
  await link.click();

  const firstname = "Anton";
  const lastname = "Zaitsev";
  const email = "anton@zaitsev.com";

  await page.type("input[name='firstName']", firstname, { delay: 50 });

  await page.type("input[name='lastName']", lastname, { delay: 50 });

  await page.type("input[name='mail']", email, { delay: 50 });

  await page.waitForTimeout(5000);

  await page.solveRecaptchas();

  await Promise.all([
    page.waitForNavigation(),
    await page.waitForTimeout(5000),
    page.click("input[type='submit']"),
  ]);

  //
  await page.waitForTimeout(10000);
  await browser.close();
});
