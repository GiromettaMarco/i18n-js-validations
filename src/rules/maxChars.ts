import { ValidationRule } from './validationRule'

class MaxChars extends ValidationRule {
  name = 'max_chars'

  validate(value: string, parameters: { max: number }, label?: string, interpolation?: string) {
    if (value.length <= parameters.max) {
      return this.replySuccess()
    }

    if (label) {
      const text =
        interpolation === '{}'
          ? 'The field {label} cannot be more than {value} characters long'
          : 'The field :label cannot be more than :value characters long'

      return this.replyFail(text, {
        label: label,
        value: parameters.max.toString(),
      })
    }

    const text =
      interpolation === '{}'
        ? 'This field cannot be more than {value} characters long'
        : 'This field cannot be more than :value characters long'

    return this.replyFail(text, { value: parameters.max.toString() })
  }

  callback = (value: string, parameters: string[], label?: string, interpolation?: string) => {
    if (parameters[0] === undefined) {
      return this.replySuccess('Maximum value must be provided')
    }

    return this.validate(value, { max: parseInt(parameters[0]) }, label, interpolation)
  }
}

export const max_chars = new MaxChars()
