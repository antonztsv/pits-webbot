// I want to create a webbbot using playwright
const playwright = require("playwright");

const browserType = "chromium"; // chrome
// const browserType = "firefox"; // firefox
// const browserType = "webkit"; // safari

async function main() {
  // disable headless to see the browser's action
  const browser = await playwright[browserType].launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage(); //wait for the browser to create a new page by putting await
  // await page.goto("https://ticketshop.onrender.com/"); //opening Google page
  await page.goto("https://pits-webbots.netlify.app/"); //opening Google page
  await page.waitForLoadState("load");
  await page.waitForTimeout(500);
  //

  const link = await page.$("a[href$='./pages/concert.html']"); //finding the link
  // const link = await page.$("a[href$='/concert']"); //finding the link
  await link.click();

  const firstname = "WEB";
  const lastname = "BOT";
  const email = "hacker@webbots.com";
  const count = "69";

  await page.waitForLoadState("load");

  for (let i = 0; i < 20; i++) {
    await page.type("input[name='firstName']", firstname);
    // await page.waitForTimeout(500);

    await page.type("input[name='lastName']", lastname);
    // await page.waitForTimeout(500);

    await page.type("input[name='mail']", email);
    // await page.waitForTimeout(500);

    const amountInput = await page.$("input[name='amount']");
    amountInput.press("ArrowRight");
    amountInput.press("Backspace");
    await page.type("input[name='amount']", count);
    //   await page.inputValue("input[name='amount']#value", count);
    // await page.waitForTimeout(500);

    await page.check("input[name='termsCondition']");
    // await page.waitForTimeout(500);

    let submitBtn = await page.$("input[type='submit']");
    await submitBtn.click();

    await page.waitForLoadState("load");
  }

  //   const searchTerm = "Automation Bots"; //the term to be searched in Google searchbar
  //   const input = await page.$('[name="q"]'); //unique element in the search bar section of inspect source
  //   await input.type(searchTerm);
  //   await page.waitForTimeout(2000); //wait 2000 ms before pressing enter so that the entire term is typed
  //   await input.press("Enter");
  //   await page.waitForLoadState("load");
  //   await page.screenshot({ path: "result1.png" }); //taking screenshot of the page loaded
  //   await page.waitForTimeout(3000); //wait 3s after taking screenshot
  //   const imageClicks = await page.$("[data-hveid='CAEQBA']"); //clicking the images link
  //   await imageClicks.click();
  //   await page.waitForLoadState("load");
  //   await page.waitForTimeout(3000);
  //   await page.screenshot({ path: "result2.png" }); //taking screenshot of the new page loaded
  //   await page.waitForTimeout(3000);
  //   const imageOne = await page.$(
  //     "[alt='Types of Bots in Automation Anywhere | Robotic Process Automation | justSajid']"
  //   ); //clicking the first image
  //   await imageOne.click();
  //   await page.waitForLoadState("load");
  //   await page.waitForTimeout(3000);
  //   await page.screenshot({ path: "result3.png" });
  //   await page.waitForTimeout(3000);

  //

  await page.waitForTimeout(1000);
  await browser.close(); //close the browser once everything is done
}
main();
