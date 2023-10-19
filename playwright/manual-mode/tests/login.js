const { assert } = require('chai')
const playwright = require('playwright')
const { PlaywrightController, playwrightConfig } = require('@axe-core/watcher')

/* Get your configuration from environment variables. */
const { API_KEY, SERVER_URL = 'https://axe.deque.com' } = process.env

describe('My Application', () => {
  let browserContext
  let page
  let controller

  before(async () => {
    browserContext = await playwright.chromium.launchPersistentContext(
      '',
      playwrightConfig({
        axe: {
          apiKey: API_KEY,
          serverURL: SERVER_URL,
          /* Disable automatic analysis. */
          autoAnalyze: false
        },
        //@see: https://playwright.dev/docs/chrome-extensions#headless-mode
        headless: false,
        args: ['--headless=new']
      })
    )

    // Create a page instance, using your browser context.
    page = await browserContext.newPage()

    // Initialize the PlaywrightController by passing in the Playwright page.
    controller = new PlaywrightController(page)
  })

  after(async () => {
    await browserContext.close()
  })

  afterEach(async () => {
    /* Flush axe-watcher results after each test. */
    await controller.flush()
    await page.close()
  })

  describe('Login', () => {
    describe('with valid credentials', () => {
      it('should login', async () => {
        await page.goto('https://the-internet.herokuapp.com/login')

        /* Analyze after navigating to the page. */
        await controller.analyze()

        await page.locator('#username').fill('tomsmith')
        await page.locator('#password').fill('SuperSecretPassword!')

        await page.locator('button[type="submit"]').click()

        const element = await page.waitForSelector('#flash')

        /* Analyze after logging in. */
        await controller.analyze()

        assert.isNotNull(element)
      })
    })
  })
})
