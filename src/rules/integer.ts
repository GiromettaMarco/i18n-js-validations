import { ValidationRule } from './validationRule'

/**
 * Validate that a value is an integer.
 *
 * @syntax integer
 */
class Integer extends ValidationRule {
  name = 'integer'

  validate(value: string, label?: string, interpolation?: string) {
    const regex = /^[0-9.]+$/

    if (regex.test(value) && Number.isInteger(Number(value))) {
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
