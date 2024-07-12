import type { Value } from '@/validation'
import { ValidationRule } from './validationRule'

/**
 * Validate the size of a value is greater than or equal to a minimum value.
 *
 * @syntax min:value
 */
class Min extends ValidationRule {
  name = 'min'

  strings = {
    fail: {
      withLabel: {
        default: 'The field :label cannot be smaller than :value',
        '{}': 'The field {label} cannot be smaller than {value}',
      },
      withoutLabel: {
        default: 'This field cannot be smaller than :value',
        '{}': 'This field cannot be smaller than {value}',
      },
    },
  }

  validate(value: number, parameters: { min: number }, label?: string, interpolation?: string) {
    if (value >= parameters.min) {
      return this.replySuccess(label, interpolation)
    }

    return this.replyFail(label, interpolation, { value: parameters.min.toString() })
  }

  callback(value: Value, parameters: string[], label?: string, interpolation?: string) {
    if (parameters[0] === undefined) {
      throw new Error('A minimum value must be provided')
    }

    if (typeof value !== 'number' && typeof value !== 'string') {
      return this.replyFail(label, interpolation)
    }

    const parsedValue = Number(value)
    if (isNaN(parsedValue)) {
      return this.replyFail(label, interpolation)
    }

    return this.validate(parsedValue, { min: Number(parameters[0]) }, label, interpolation)
  }
}

export const min = new Min()
