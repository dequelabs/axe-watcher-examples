import 'mocha'
import playwright from 'playwright'
import {
  playwrightConfig,
  PlaywrightController,
  wrapPlaywright
} from '@axe-core/watcher'
import assert from 'assert'

const { API_KEY, SERVER_URL = 'https://axe.deque.com' } = process.env
assert(API_KEY, 'API_KEY is required')

let page: playwright.Page
let browserContext: playwright.BrowserContext
let controller: PlaywrightController

before(async () => {
  browserContext = await playwright.chromium.launchPersistentContext(
    '',
    playwrightConfig({
      axe: {
        apiKey: API_KEY,
        serverURL: SERVER_URL
      },
      headless: false,
      args: ['--headless=new']
    })
  )
})

beforeEach(async () => {
  page = await browserContext.newPage()
  controller = new PlaywrightController(page)
  wrapPlaywright(browserContext, controller)
})

afterEach(async () => {
  await controller.flush()
})

after(async () => {
  await browserContext.close()
})

export { page, controller, browserContext }
