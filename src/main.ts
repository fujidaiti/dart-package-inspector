import * as core from '@actions/core'
import * as input from './input'
import {inspect} from './inspect'

const main = (): void => {
  try {
    const errors = inspect(input.getReport(), input.getCriteria())
    for (const error of errors) {
      core.error(error)
    }
    if (errors.length > 0) {
      core.setFailed('Some requirements are not met.')
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

main()
