import * as core from '@actions/core'
import * as input from './input'
import {inspect} from './inspection'

const main = async (): Promise<void> => {
  try {
    const report = input.getReport()
    const errors = inspect(report, input.getCriteria())
    for (const error of errors) {
      core.error(error)
    }
    if (errors.length > 0) {
      core.setFailed('Some requirements are not met.')
      core.summary
        .addHeading('Dart package inspection failed')
        .addList(errors.map(e => e.split('\n')[0]))
      // Show pana's explanation for each section that lost points.
      for (const section of report.sections) {
        if (section.grantedPoints < section.maxPoints) {
          core.summary
            .addHeading(
              `${section.title} (${section.grantedPoints}/${section.maxPoints})`,
              2
            )
            // A blank line is required after the HTML heading,
            // or the Markdown below is not rendered.
            .addEOL()
            .addRaw(section.summary, true)
        }
      }
      await core.summary.write()
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

main()
