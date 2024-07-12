import type { Value } from '@/validation'
import { ValidationRule } from './validationRule'

/**
 * Validate a value is contained within a list of values.
 *
 * @syntax equal:match1,match2,...
 */
export class Equal extends ValidationRule {
  name = 'equal'

  strings = {
    fail: {
      withLabel: {
        default: 'The field :label does not match',
        '{}': 'The field {label} does not match',
      },
      withoutLabel: {
        default: 'This field does not match',
      },
    },
  }

  validate(
    value: string,
    parameters: { comparison: string[] },
    label?: string,
    interpolation?: string,
  ) {
    for (const match of parameters.comparison) {
      if (match === value) {
        return this.replySuccess(label, interpolation)
      }
    }

    return this.replyFail(label, interpolation)
  }

  callback(value: Value, parameters: string[], label?: string, interpolation?: string) {
    if (parameters[0] === undefined) {
      throw new Error('A comparison value must be provided')
    }

    const parsedValue = typeof value === 'string' ? value : String(value)

    return this.validate(parsedValue, { comparison: parameters }, label, interpolation)
  }
}
