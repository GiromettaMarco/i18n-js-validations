import type { Value } from '@/validation'
import { ValidationRule } from './validationRule'

/**
 * Validate that a value contains only alphabetic characters.
 * If the 'ascii' option is passed, validate that a value contains only ascii alphabetic characters.
 *
 * @syntax alpha | alpha:ascii
 */
class Alpha extends ValidationRule {
  name = 'alpha'

  strings = {
    fail: {
      withLabel: {
        default: 'The field :label can contain only alphabetic characters',
        '{}': 'The field {label} can contain only alphabetic characters',
      },
      withoutLabel: {
        default: 'This field can contain only alphabetic characters',
      },
    },
  }

  validate(value: string, parameters: { ascii: boolean }, label?: string, interpolation?: string) {
    const regex = parameters.ascii ? /^[a-zA-Z]+$/u : /^[\p{L}\p{M}]+$/u

    if (regex.test(value)) {
      return this.replySuccess(label, interpolation)
    }

    return this.replyFail(label, interpolation)
  }

  callback(value: Value, parameters: string[], label?: string, interpolation?: string) {
    if (typeof value !== 'string') {
      return this.replyFail(label, interpolation)
    }

    const ascii = Boolean(parameters[0] === 'ascii')

    return this.validate(value, { ascii: ascii }, label, interpolation)
  }
}

export const alpha = new Alpha()
