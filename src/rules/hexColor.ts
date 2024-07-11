import type { Value } from 'src/validation'
import { ValidationRule } from './validationRule'

/**
 * Validate that a value is a valid HEX color.
 *
 * @syntax hex_color
 */
class HexColor extends ValidationRule {
  name = 'hex_color'

  strings = {
    fail: {
      withLabel: {
        default: 'The field :label must be a valid color in hexadecimal format',
        '{}': 'The field {label} must be a valid color in hexadecimal format',
      },
      withoutLabel: {
        default: 'This field must be a valid color in hexadecimal format',
      },
    },
  }

  validate(value: Value, label?: string, interpolation?: string) {
    if (typeof value !== 'string') {
      return this.replyFail(label, interpolation)
    }

    const regex = /^#(?:(?:[0-9a-f]{3}){1,2}|(?:[0-9a-f]{4}){1,2})$/i

    if (regex.test(value)) {
      return this.replySuccess(label, interpolation)
    }

    return this.replyFail(label, interpolation)
  }
}

export const hex_color = new HexColor()
