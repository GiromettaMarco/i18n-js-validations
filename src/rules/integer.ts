import { ValidationRule } from './validationRule'

/**
 * Validate that a value is an integer.
 */
class Integer extends ValidationRule {
  name = 'integer'

  validate(value: string, label?: string, interpolation?: string) {
    if (Number.isInteger(Number(value))) {
      return this.replySuccess()
    }

    if (label) {
      const text =
        interpolation === '{}'
          ? 'The field {label} must be an integer number'
          : 'The field :label must be an integer number'

      return this.replyFail(text, { label: label })
    }

    return this.replyFail('This field must be an integer number')
  }
}

export const integer = new Integer()
