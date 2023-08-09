const allTags = [
  'sdk:flutter',
  'sdk:dart',
  'platform:ios',
  'platform:android',
  'platform:windows',
  'platform:linux',
  'platform:macos',
  'platform:web',
  'is:null-safe',
  'is:dart3-compatible'
] as const

export type Tag = (typeof allTags)[number]

export const isTag = (str: unknown): str is Tag =>
  typeof str === 'string' && (allTags as readonly string[]).includes(str)

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
