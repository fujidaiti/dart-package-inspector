export type Tag =
  | 'sdk:flutter'
  | 'sdk:dart'
  | 'platform:ios'
  | 'platform:android'
  | 'platform:windows'
  | 'platform:linux'
  | 'platform:macos'
  | 'platform:web'
  | 'is:null-safe'
  | 'is:dart3-compatible'

export type Report = {
  tags: Tag[]
  grantedPoints: {
    total: number
    convention: number
    documentation: number
    platform: number
    analysis: number
    dependency: number
  }
}
