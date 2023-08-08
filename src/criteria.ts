import {Tag} from './report'

export type SDK = 'flutter' | 'dart'

export type Platform = 'ios' | 'android' | 'windows' | 'macos' | 'linux' | 'web'

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

export const parseSDK = (str: string): SDK | undefined => {
  switch (str) {
    case 'dart':
      return 'dart'
    case 'flutter':
      return 'flutter'
    default:
      return undefined
  }
}

export const parsePlatform = (str: string): Platform | undefined => {
  switch (str) {
    case 'ios':
      return 'ios'
    case 'android':
      return 'android'
    case 'linux':
      return 'linux'
    case 'windows':
      return 'windows'
    case 'macos':
      return 'macos'
    case 'web':
      return 'web'
    default:
      return undefined
  }
}

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
