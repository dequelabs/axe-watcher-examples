import { wdioTestRunner } from '@axe-core/watcher'
import assert from 'assert'

/* Get your configuration from environment variables. */
const { API_KEY, SERVER_URL = 'https://axe.deque.com' } = process.env
assert(
  API_KEY,
  'Ensure your axe Developer API key is set via the `AXE_API_KEY` environment variable.'
)

export const config = wdioTestRunner({
  axe: { apiKey: API_KEY as string, serverURL: SERVER_URL },

  // Remaining WDIO configuration options
  runner: 'local',
  tsConfigPath: './tsconfig.json',
  specs: ['./features/**/*.feature'],
  exclude: [],
  maxInstances: 10,
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': { args: ['--headless=new'] }
    }
  ],
  logLevel: 'debug',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'cucumber',
  reporters: ['spec'],
  cucumberOpts: {
    require: ['./features/step-definitions/steps.ts'],
    backtrace: false,
    requireModule: [],
    dryRun: false,
    failFast: false,
    name: [],
    snippets: true,
    source: true,
    strict: false,
    tagExpression: '',
    timeout: 60000,
    ignoreUndefinedDefinitions: false
  }
})
