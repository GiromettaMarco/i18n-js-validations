import { ValidationRule } from './validationRule'

/**
 * Validate that a value is numeric.
 *
 * @syntax numeric
 */
class Numberic extends ValidationRule {
  name = 'numeric'

  validate(value: string, label?: string, interpolation?: string) {
    const regex = /^[0-9.]+$/

    if (regex.test(value) && !isNaN(Number(value))) {
      return this.replySuccess()
    }

    if (label) {
      const text =
        interpolation === '{}'
          ? 'The field {label} must be a number'
          : 'The field :label must be a number'

      return this.replyFail(text, { label: label })
    }

    return this.replyFail('This field must be a number')
  }
}

export const numeric = new Numberic()
