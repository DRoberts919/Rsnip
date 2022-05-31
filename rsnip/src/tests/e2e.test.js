import puppeteer from "puppeteer";

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

describe("app.js", () => {
  let browser;
  let page;
  jest.setTimeout(120000);
  beforeAll(async () => {
    browser = await puppeteer.launch({ slowMo: 80, headless: false });
    page = await browser.newPage();
  });

  it("goldenpath", async () => {
    await page.setViewport({ width: 1920, height: 900 });
    await page.goto("http://localhost:3000");

    //Logs In User
    await page.click("#nav-login");
    await page.type("#login-username", "codyashby222@gma.co??");
    await page.type("#login-password", "Ca$hmon3y");
    await page.click("#login-btn");
    await page.$eval("#login-username", (el) => (el.value = ""));
    await page.type("#login-username", "cashmoney");

    await page.click("#login-btn");
    await delay(3000);
    await page.click("#account-btn");

    // Adds Snippet
    await page.click("#add-snippet");
    await delay(3000);
    await page.type("#title", "Puppeteer Testing");
    await page.type(
      "#desc",
      "E2E Testing going to home, login, account ,add/view/search snippet and then deleting snippet"
    );
    await page.click("#publish");
    await page.click("#back");

    //Search Snippet
    await delay(4000);
    await page.click("#nav-search");
    await delay(4000);
    await page.type("#search-input", "pupp");
    await page.keyboard.press("Enter");
    await page.click(".snippet-card");

    // View Snippet
    await delay(5000);
    await page.click("#account-btn");

    // Delete Snippet
    await page.click("#edit-snippet");
    await delay(4000);
    await page.click("#delete-snippet");

    // Delay before closing
    await delay(5000);
  });

  afterAll(() => browser.close());
});
