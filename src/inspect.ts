import * as input from './input'

export const inspect = (
  report: input.Metrics,
  criteria: input.Metrics
): string[] => {
  const errors: string[] = []

  if (report.grantedPoints.total < criteria.grantedPoints.total) {
    errors.push(
      `Required minimum total Pub points is ${criteria.grantedPoints.total}, ` +
        `but got only ${report.grantedPoints.total} points`
    )
  }

  return errors
}
