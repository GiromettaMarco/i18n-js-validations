import type { Value } from '@/validation'
import { ValidationRule } from './validationRule'

/**
 * Validate the size of a value is less than or equal to a maximum value.
 *
 * @syntax max:value
 */
class Max extends ValidationRule {
  name = 'max'

  strings = {
    fail: {
      withLabel: {
        default: 'The field :label cannot be greater than :value',
        '{}': 'The field {label} cannot be greater than {value}',
      },
      withoutLabel: {
        default: 'This field cannot be greater than :value',
        '{}': 'This field cannot be greater than {value}',
      },
    },
  }

  validate(value: number, parameters: { max: number }, label?: string, interpolation?: string) {
    if (value <= parameters.max) {
      return this.replySuccess(label, interpolation)
    }

    return this.replyFail(label, interpolation, { value: parameters.max.toString() })
  }

  callback(value: Value, parameters: string[], label?: string, interpolation?: string) {
    if (parameters[0] === undefined) {
      throw new Error('A maximum value must be provided')
    }

    if (typeof value !== 'number' && typeof value !== 'string') {
      return this.replyFail(label, interpolation)
    }

    const parsedValue = Number(value)
    if (isNaN(parsedValue)) {
      return this.replyFail(label, interpolation)
    }

    return this.validate(parsedValue, { max: Number(parameters[0]) }, label, interpolation)
  }
}

export const max = new Max()
