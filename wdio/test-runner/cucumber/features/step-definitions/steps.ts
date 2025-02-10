import {
  Given,
  When,
  Then,
  AfterStep,
  BeforeAll
} from '@wdio/cucumber-framework'
import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import SecurePage from '../pageobjects/secure.page'
import { WdioController, wrapWdio } from '@axe-core/watcher'

let controller: WdioController

const pages = {
  login: LoginPage
}

BeforeAll(() => {
  controller = new WdioController(browser)
  wrapWdio(browser, controller)
})

Given(/^I am on the (\w+) page$/, async page => {
  // @ts-expect-error Cucumber generated example code
  await pages[page].open()
})

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
  await LoginPage.login(username, password)
})

Then(/^I should see a flash message saying (.*)$/, async message => {
  await expect(SecurePage.flashAlert).toBeExisting()
  await expect(SecurePage.flashAlert).toHaveText(
    expect.stringContaining(message)
  )
})

AfterStep(async () => {
  await controller.flush()
})
