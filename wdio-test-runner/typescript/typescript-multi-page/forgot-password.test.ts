import 'mocha'
import '@wdio/globals'
import './setup'

describe('forgot password', () => {
  it('should contain an email input', async () => {
    await browser.url('https://the-internet.herokuapp.com/forgot_password')
    await expect(browser).toHaveTitle('The Internet')
    await expect($('#email')).toBeDisplayed()
  })

  it('should contain a submit button', async () => {
    await browser.url('https://the-internet.herokuapp.com/forgot_password')
    await expect(browser).toHaveTitle('The Internet')
    await expect($('button[type="submit"]')).toBeDisplayed()
  })

  describe('entering an email into the input and submitting the form', () => {
    it('should navigate', async () => {
      await browser.url('https://the-internet.herokuapp.com/forgot_password')
      await expect(browser).toHaveTitle('The Internet')
      await expect($('#email')).toBeDisplayed()
      await expect($('button[type="submit"]')).toBeDisplayed()
      await $('#email').setValue('person@place.biz')
      await $('button[type="submit"]').click()
      await browser.waitUntil(async () => {
        const h1 = await $('h1')
        const h1text = await h1.getText()
        return h1text.includes('Internal Server Error')
      })
    })
  })
})
