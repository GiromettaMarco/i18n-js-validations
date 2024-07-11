import type { Value } from 'src/validation'
import { ValidationRule } from './validationRule'

/**
 * Validate that a value has a maximum number of characters.
 *
 * @syntax max_chars:value
 */
class MaxChars extends ValidationRule {
  name = 'max_chars'

  strings = {
    fail: {
      withLabel: {
        default: 'The field :label cannot be more than :value characters long',
        '{}': 'The field {label} cannot be more than {value} characters long',
      },
      withoutLabel: {
        default: 'This field cannot be more than :value characters long',
        '{}': 'This field cannot be more than {value} characters long',
      },
    },
  }

  validate(value: string, parameters: { max: number }, label?: string, interpolation?: string) {
    if (value.length <= parameters.max) {
      return this.replySuccess(label, interpolation)
    }

    return this.replyFail(label, interpolation, { value: parameters.max.toString() })
  }

  callback(value: Value, parameters: string[], label?: string, interpolation?: string) {
    if (parameters[0] === undefined) {
      throw new Error('A maximum value must be provided')
    }

    if (value === undefined || value === null) {
      return this.replySuccess(label, interpolation)
    }

    if (typeof value === 'boolean') {
      return this.replyFail(label, interpolation)
    }

    const parsedValue = typeof value === 'number' ? value.toString() : value

    return this.validate(parsedValue, { max: parseInt(parameters[0]) }, label, interpolation)
  }
}

export const max_chars = new MaxChars()
