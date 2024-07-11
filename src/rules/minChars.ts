import type { Value } from 'src/validation'
import { ValidationRule } from './validationRule'

/**
 * Validate that a value has a minimum number of characters.
 *
 * @syntax min_chars:value
 */
class MinChars extends ValidationRule {
  name = 'min_chars'

  strings = {
    fail: {
      withLabel: {
        default: 'The field :label must be at least :value characters long',
        '{}': 'The field {label} must be at least {value} characters long',
      },
      withoutLabel: {
        default: 'This field must be at least :value characters long',
        '{}': 'This field must be at least {value} characters long',
      },
    },
  }

  validate(value: string, parameters: { min: number }, label?: string, interpolation?: string) {
    if (value.length >= parameters.min) {
      return this.replySuccess(label, interpolation)
    }

    return this.replyFail(label, interpolation, { value: parameters.min.toString() })
  }

  callback(value: Value, parameters: string[], label?: string, interpolation?: string) {
    if (parameters[0] === undefined) {
      throw new Error('A minimum value must be provided')
    }

    if (typeof value === 'boolean') {
      return this.replyFail(label, interpolation)
    }

    let parsedValue = ''
    if (typeof value === 'number') {
      parsedValue = value.toString()
    } else if (typeof value === 'string') {
      parsedValue = value
    }

    return this.validate(parsedValue, { min: parseInt(parameters[0]) }, label, interpolation)
  }
}

export const min_chars = new MinChars()
