import {Criteria, platformToTag, sdkToTag} from './criteria'
import {Report} from './report'

export const inspect = (report: Report, criteria: Criteria): string[] => {
  const errors: string[] = []

  if (report.grantedPoints.total < criteria.minRequiredPoints.total) {
    errors.push(
      `Required minimum total Pub points is ${criteria.minRequiredPoints.total}, ` +
        `but got only ${report.grantedPoints.total} points`
    )
  }

  for (const [grantedPoints, minRequiredPoints, section] of [
    [
      report.grantedPoints.analysis,
      criteria.minRequiredPoints.analysis,
      'analysis'
    ],
    [
      report.grantedPoints.convention,
      criteria.minRequiredPoints.convention,
      'convention'
    ],
    [
      report.grantedPoints.dependency,
      criteria.minRequiredPoints.dependency,
      'dependency'
    ],
    [
      report.grantedPoints.documentation,
      criteria.minRequiredPoints.documentation,
      'documentation'
    ],
    [
      report.grantedPoints.platform,
      criteria.minRequiredPoints.platform,
      'platform'
    ]
  ]) {
    if (grantedPoints < minRequiredPoints) {
      errors.push(
        `Required minimum points of '${section}' section is ` +
          `${minRequiredPoints}, but got only ${grantedPoints} points`
      )
    }
  }

  for (const platform of criteria.supportedPlatforms) {
    if (!report.tags.includes(platformToTag(platform))) {
      errors.push(`The package doesn't support ${platform}`)
    }
  }

  for (const sdk of criteria.supportedSDKs) {
    if (!report.tags.includes(sdkToTag(sdk))) {
      errors.push(`The package doesn't support ${sdk} SDK`)
    }
  }

  if (
    criteria.dart3Compatible &&
    !report.tags.includes('is:dart3-compatible')
  ) {
    errors.push('The package is incompatible with dart3')
  }

  if (criteria.soundNullSafety && !report.tags.includes('is:null-safe')) {
    errors.push('The package is not null safety')
  }

  return errors
}
