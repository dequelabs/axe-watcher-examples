const { WdioController, wrapWdio } = require('@axe-core/watcher')

describe('My Login Application', () => {
  let controller

  before(() => {
    // Initialize the axe Watcher controller.
    controller = new WdioController(browser)

    // Wrap the WDIO browser.
    wrapWdio(browser, controller)
  })

  afterEach(async () => {
    // Ensure that all the axe Watcher test results are flushed out.
    await controller.flush()
  })

  // Your example test.
  // axe Watcher will run on each page state.
  it('should login with valid credentials', async () => {
    await browser.url('https://the-internet.herokuapp.com/login')
    await browser.$('#username').setValue('tomsmith')
    await browser.$('#password').setValue('SuperSecretPassword!')
    await browser.$('button[type="submit"]').click()
    await browser.$('#flash').waitForExist()
  })
})
