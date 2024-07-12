import type { Value } from '@/validation'
import { ValidationRule } from './validationRule'

/**
 * Validate a value is not contained within a list of values.
 *
 * @syntax not_equal:match1,match2,...
 */
export class NotEqual extends ValidationRule {
  name = 'not_equal'

  strings = {
    fail: {
      withLabel: {
        default: 'The field :label cannot be equal to :value',
        '{}': 'The field {label} cannot be equal to {value}',
      },
      withoutLabel: {
        default: 'This field cannot be equal to :value',
        '{}': 'This field cannot be equal to {value}',
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
        return this.replyFail(label, interpolation, { value: value })
      }
    }

    return this.replySuccess(label, interpolation)
  }

  callback(value: Value, parameters: string[], label?: string, interpolation?: string) {
    if (parameters[0] === undefined) {
      throw new Error('A comparison value must be provided')
    }

    const parsedValue = typeof value === 'string' ? value : String(value)

    return this.validate(parsedValue, { comparison: parameters }, label, interpolation)
  }
}
