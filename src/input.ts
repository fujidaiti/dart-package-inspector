import * as core from '@actions/core'

export type Metrics = {
  grantedPoints: {
    total: number
  }
}

const getInput = (name: string): string => {
  const value = core.getInput(name)
  if (value !== undefined) return value
  throw Error(`Required input '${name}' is missing`)
}

export const getReport = (): Metrics => {
  const result = JSON.parse(getInput('report'))
  return {
    grantedPoints: {
      total: result['scores']['grantedPoints']
    }
  }
}

export const getCriteria = (): Metrics => ({
  grantedPoints: {
    total: parseInt(getInput('min-pub-points'))
  }
})
