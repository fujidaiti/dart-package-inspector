import * as core from '@actions/core'
import {Criteria, Platform, SDK, parsePlatform, parseSDK} from './criteria'
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
  for (const s of core.getInput('supported-SDKs').split(',')) {
    const sdk = parseSDK(s.trim())
    if (sdk === undefined) throw Error("Invalid value for 'supported-SDKs'")
    supportedSDKs.push(sdk)
  }

  const supportedPlatforms: Platform[] = []
  for (const s of core.getInput('supported-platforms').split(',')) {
    const platform = parsePlatform(s.trim())
    if (platform === undefined)
      throw Error("Invalid value for 'supported-platforms'")
    supportedPlatforms.push(platform)
  }

  const panaOutput = JSON.parse(getRequiredInput('report'))
  return {
    supportedSDKs,
    supportedPlatforms,
    minRequiredPoints: {
      total:
        peekIntInput('min-pub-points') ?? panaOutput['scores']['maxPoints'],
      convention:
        peekIntInput('min-convention-points') ??
        panaOutput['report']['sections'][0]['grantedPoints'],
      documentation:
        peekIntInput('min-documentation-points') ??
        panaOutput['report']['sections'][1]['grantedPoints'],
      platform:
        peekIntInput('min-platform-points') ??
        panaOutput['report']['sections'][2]['grantedPoints'],
      analysis:
        peekIntInput('min-analysis-points') ??
        panaOutput['report']['sections'][3]['grantedPoints'],
      dependency:
        peekIntInput('min-dependency-points') ??
        panaOutput['report']['sections'][4]['grantedPoints']
    },
    dart3Compatible: core.getBooleanInput('dart3-compatible'),
    soundNullSafety: core.getBooleanInput('sound-null-safety')
  }
}
