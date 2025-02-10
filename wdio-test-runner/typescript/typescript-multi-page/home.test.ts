import 'mocha'
import '@wdio/globals'
import './setup'

describe('home', () => {
  it('should contain a list of links', async () => {
    await browser.url('https://the-internet.herokuapp.com')
    await expect(browser).toHaveTitle('The Internet')
    await expect((await browser.$$('ul li a')).length).toBeGreaterThan(20)
  })

  it('should contain a link to the login page', async () => {
    await browser.url('https://the-internet.herokuapp.com')
    await expect(browser).toHaveTitle('The Internet')
    await expect(await browser.$('ul li a[href="/login"]')).toBeDisplayed()
  })
})
