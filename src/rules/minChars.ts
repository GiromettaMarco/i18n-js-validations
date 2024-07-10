import { ValidationRule } from './validationRule'

/**
 * Validate that a value has a minimum number of characters.
 *
 * @syntax min_chars:value
 */
class MinChars extends ValidationRule {
  name = 'min_chars'

  validate(value: string, parameters: { min: number }, label?: string, interpolation?: string) {
    if (value.length >= parameters.min) {
      return this.replySuccess()
    }

    if (label) {
      const text =
        interpolation === '{}'
          ? 'The field {label} must be at least {value} characters long'
          : 'The field :label must be at least :value characters long'

      return this.replyFail(text, {
        label: label,
        value: parameters.min.toString(),
      })
    }

    const text =
      interpolation === '{}'
        ? 'This field must be at least {value} characters long'
        : 'This field must be at least :value characters long'

    return this.replyFail(text, { value: parameters.min.toString() })
  }

  callback = (value: string, parameters: string[], label?: string, interpolation?: string) => {
    if (parameters[0] === undefined) {
      return this.replySuccess('Minimum value must be provided')
    }

    return this.validate(value, { min: parseInt(parameters[0]) }, label, interpolation)
  }
}

export const min_chars = new MinChars()
