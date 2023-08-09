import * as core from '@actions/core'
import {Criteria, Platform, SDK, isPlatform, isSDK} from './criteria'
import {Report, isTag} from './report'

const peekInput = (name: string): string | undefined => {
  const value = core.getInput(name)
  return value.length > 0 ? value : undefined
}

const peekIntInput = (name: string): number | undefined => {
  const value = peekInput(name)
  if (value !== undefined) return parseInt(value)
  return undefined
}

const getRequiredInput = (name: string): string => {
  const value = peekInput(name)
  if (value !== undefined) return value
  throw Error(`Required input '${name}' is missing`)
}

export const getReport = (): Report => {
  const panaOutput = JSON.parse(getRequiredInput('report'))
  return {
    tags: (panaOutput['tags'] as unknown[]).filter(isTag),
    grantedPoints: {
      total: panaOutput['scores']['grantedPoints'],
      convention: panaOutput['report']['sections'][0]['grantedPoints'],
      documentation: panaOutput['report']['sections'][1]['grantedPoints'],
      platform: panaOutput['report']['sections'][2]['grantedPoints'],
      analysis: panaOutput['report']['sections'][3]['grantedPoints'],
      dependency: panaOutput['report']['sections'][4]['grantedPoints']
    }
  }
}

export const getCriteria = (): Criteria => {
  const supportedSDKs: SDK[] = []
  for (const s of peekInput('supported-SDKs')?.split(',') ?? []) {
    const maybeSdk = s.trim()
    if (!isSDK(maybeSdk))
      throw Error(`Invalid value for 'supported-SDKs': '${maybeSdk}'`)
    supportedSDKs.push(maybeSdk)
  }

  const supportedPlatforms: Platform[] = []
  for (const s of peekInput('supported-platforms')?.split(',') ?? []) {
    const maybePlatform = s.trim()
    if (!isPlatform(maybePlatform))
      throw Error(`Invalid value for 'supported-platforms': '${maybePlatform}'`)
    supportedPlatforms.push(maybePlatform)
  }

  return {
    supportedSDKs,
    supportedPlatforms,
    minRequiredPoints: {
      total: peekIntInput('min-pub-points'),
      convention: peekIntInput('min-convention-points'),
      documentation: peekIntInput('min-documentation-points'),
      platform: peekIntInput('min-platform-points'),
      analysis: peekIntInput('min-analysis-points'),
      dependency: peekIntInput('min-dependency-points')
    },
    dart3Compatible: core.getBooleanInput('dart3-compatible'),
    soundNullSafety: core.getBooleanInput('sound-null-safety')
  }
}
