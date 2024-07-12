import type { Value } from '@/validation'
import { ValidationRule } from './validationRule'

/**
 * Validate that a value contains only alpha-numeric characters.
 * If the 'ascii' option is passed, validate that a value contains only ascii alpha-numeric characters.
 *
 * @syntax alpha_num | alpha_num:ascii
 */
class AlphaNum extends ValidationRule {
  name = 'alpha_num'

  strings = {
    fail: {
      withLabel: {
        default: 'The field :label can contain only alpha-numeric characters',
        '{}': 'The field {label} can contain only alpha-numeric characters',
      },
      withoutLabel: {
        default: 'This field can contain only alpha-numeric characters',
      },
    },
  }

  validate(value: string, parameters: { ascii: boolean }, label?: string, interpolation?: string) {
    const regex = parameters.ascii ? /^[a-zA-Z0-9]+$/u : /^[\p{L}\p{M}\p{N}]+$/u

    if (regex.test(value)) {
      return this.replySuccess(label, interpolation)
    }

    return this.replyFail(label, interpolation)
  }

  callback(value: Value, parameters: string[], label?: string, interpolation?: string) {
    const parsedValue = typeof value === 'number' ? value.toString() : value

    if (typeof parsedValue !== 'string') {
      return this.replyFail(label, interpolation)
    }

    const ascii = Boolean(parameters[0] === 'ascii')

    return this.validate(parsedValue, { ascii: ascii }, label, interpolation)
  }
}

export const alpha_num = new AlphaNum()
