import { wdioTestRunner } from '@axe-core/watcher'

/* Get your configuration from environment variables. */
const { API_KEY, SERVER_URL = 'https://axe.deque.com' } = process.env

export const config = wdioTestRunner({
  axe: { apiKey: API_KEY as string, serverURL: SERVER_URL, autoAnalyze: false },
  specs: ['login.test.ts'],
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': { args: ['--headless=new'] }
    }
  ],
  baseUrl: 'https://the-internet.herokuapp.com',
  services: ['chromedriver'],
  framework: 'mocha',
  reporters: ['spec'],
  maxInstances: 5,
  mochaOpts: {
    timeout: 10000
  }
})
