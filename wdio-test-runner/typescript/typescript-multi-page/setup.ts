import 'mocha'
import '@wdio/globals'
import { WdioController, wrapWdio } from '@axe-core/watcher'

let controller: WdioController

before(() => {
  controller = new WdioController(browser)
  wrapWdio(browser, controller)
})

afterEach(async () => {
  await controller.flush()
})
