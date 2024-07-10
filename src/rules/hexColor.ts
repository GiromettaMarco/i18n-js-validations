import { ValidationRule } from './validationRule'

/**
 * Validate that a value is a valid HEX color.
 *
 * @syntax hex_color
 */
class HexColor extends ValidationRule {
  name = 'hex_color'

  validate(value: string, label?: string, interpolation?: string) {
    const regex = /^#(?:(?:[0-9a-f]{3}){1,2}|(?:[0-9a-f]{4}){1,2})$/i

    if (regex.test(value)) {
      return this.replySuccess()
    }

    if (label) {
      const text =
        interpolation === '{}'
          ? 'The field {label} must be a valid color in hexadecimal format'
          : 'The field :label must be a valid color in hexadecimal format'

      return this.replyFail(text, { label: label })
    }

    return this.replyFail('This field must be a valid color in hexadecimal format')
  }
}

export const hex_color = new HexColor()
