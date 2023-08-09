import {Tag} from './report'

const allSDKs = ['flutter', 'dart'] as const
const allPlatforms = [
  'ios',
  'android',
  'windows',
  'macos',
  'linux',
  'web'
] as const

export type SDK = (typeof allSDKs)[number]
export type Platform = (typeof allPlatforms)[number]

export type Criteria = {
  supportedSDKs: SDK[]
  supportedPlatforms: Platform[]
  minRequiredPoints: {
    total: number
    convention: number
    documentation: number
    platform: number
    analysis: number
    dependency: number
  }
  dart3Compatible: boolean
  soundNullSafety: boolean
}

export const isSDK = (x: unknown): x is SDK =>
  typeof x === 'string' && (allSDKs as readonly string[]).includes(x)

export const isPlatform = (x: unknown): x is Platform =>
  typeof x === 'string' && (allPlatforms as readonly string[]).includes(x)

export const platformToTag = (platform: Platform): Tag => {
  switch (platform) {
    case 'ios':
      return 'platform:ios'
    case 'android':
      return 'platform:android'
    case 'linux':
      return 'platform:linux'
    case 'windows':
      return 'platform:windows'
    case 'macos':
      return 'platform:macos'
    case 'web':
      return 'platform:web'
  }
}

export const sdkToTag = (sdk: SDK): Tag => {
  switch (sdk) {
    case 'dart':
      return 'sdk:dart'
    case 'flutter':
      return 'sdk:flutter'
  }
}
