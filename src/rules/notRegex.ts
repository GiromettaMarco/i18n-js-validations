import type { Value } from '@/validation'
import { ValidationRule } from './validationRule'

/**
 * Validate that a value does not pass a regular expression check.
 *
 * @syntax not_regex:pattern,flags
 */
class NotRegex extends ValidationRule {
  name = 'not_regex'

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
    parameters: { pattern: string; flags?: string },
    label?: string,
    interpolation?: string,
  ) {
    const regex = new RegExp(parameters.pattern, parameters.flags)

    if (!regex.test(value)) {
      return this.replySuccess(label, interpolation)
    }

    return this.replyFail(label, interpolation)
  }

  callback(value: Value, parameters: string[], label?: string, interpolation?: string) {
    if (parameters[0] === undefined) {
      throw new Error('A regex must be provided')
    }

    let parsedValue = ''
    if (typeof value === 'number') {
      parsedValue = value.toString()
    } else if (typeof value === 'string') {
      parsedValue = value
    }

    return this.validate(
      parsedValue,
      { pattern: parameters[0], flags: parameters[1] },
      label,
      interpolation,
    )
  }
}

export const not_regex = new NotRegex()
