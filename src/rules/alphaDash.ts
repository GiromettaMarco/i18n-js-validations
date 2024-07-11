import type { Value } from 'src/validation'
import { ValidationRule } from './validationRule'

/**
 * Validate that a value contains only alpha-numeric characters, dashes and underscores.
 * If the 'ascii' option is passed, validate that a value contains only ascii alpha-numeric characters,
 * dashes, and underscores.
 *
 * @syntax alpha_dash | alpha_dash:ascii
 */
class AlphaDash extends ValidationRule {
  name = 'alpha_dash'

  strings = {
    fail: {
      withLabel: {
        default:
          'The field :label can contain only alpha-numeric characters, dashes and underscores',
        '{}': 'The field {label} can contain only alpha-numeric characters, dashes and underscores',
      },
      withoutLabel: {
        default: 'This field can contain only alpha-numeric characters, dashes and underscores',
      },
    },
  }

  validate(value: string, parameters: { ascii: boolean }, label?: string, interpolation?: string) {
    const regex = parameters.ascii ? /^[a-zA-Z0-9_-]+$/u : /^[\p{L}\p{M}\p{N}_-]+$/u

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

export const alpha_dash = new AlphaDash()
