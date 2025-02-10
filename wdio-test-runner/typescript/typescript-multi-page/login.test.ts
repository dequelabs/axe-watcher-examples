import 'mocha'
import '@wdio/globals'
import './setup'

describe('login', () => {
  it('should contain a username input', async () => {
    await browser.url('https://the-internet.herokuapp.com/login')
    await expect(browser).toHaveTitle('The Internet')
    await expect($('#username')).toBeDisplayed()
  })

  it('should contain a password input', async () => {
    await browser.url('https://the-internet.herokuapp.com/login')
    await expect(browser).toHaveTitle('The Internet')
    await expect($('#password')).toBeDisplayed()
  })

  it('should contain a submit button', async () => {
    await browser.url('https://the-internet.herokuapp.com/login')
    await expect(browser).toHaveTitle('The Internet')
    await expect($('button[type="submit"]')).toBeDisplayed()
  })

  describe('entering credentials and submitting the form', () => {
    it('should log in', async () => {
      await browser.url('https://the-internet.herokuapp.com/login')
      await expect(browser).toHaveTitle('The Internet')
      await expect($('#username')).toBeDisplayed()
      await expect($('#password')).toBeDisplayed()
      await expect($('button[type="submit"]')).toBeDisplayed()
      await $('#username').setValue('tomsmith')
      await $('#password').setValue('SuperSecretPassword!')
      await $('button[type="submit"]').click()
      await expect($('#flash')).toHaveTextContaining(
        'You logged into a secure area!'
      )
    })
  })
})
