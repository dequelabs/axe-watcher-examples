import 'mocha'
import '@wdio/globals'
import { controller } from './setup'

/*
  Let's see the number of page states calculation.

  As auto-analyze is false, it will not analyze automatically.
  Then we navigate to the page.
  Then we analyze the page. (+1)
  Then we fill the form.
  Then Turn on auto-analyze.
  Then we click the submit button (+1)
  Then we wait for the element to appear.
  Then we analyze the page. (+1)

  So, the total number of page states calculation should be 3.
*/

describe('login', () => {
  describe('with valid credentials', () => {
    it('should login', async () => {
      await browser.url('https://the-internet.herokuapp.com/login')

      /* Analyze after navigation to the page */
      await controller.analyze()

      await browser.$('#username').setValue('tomsmith')
      await browser.$('#password').setValue('SuperSecretPassword!')

      /* starts auto-analyze to true */
      await controller.start()

      await browser.$('button[type="submit"]').click()
      const flash = await browser.$('#flash')

      /* stops auto-analyze */
      await controller.stop()

      /* Analyze after form submission */
      await controller.analyze()

      expect(flash).not.toBeNull()
    })
  })
})
