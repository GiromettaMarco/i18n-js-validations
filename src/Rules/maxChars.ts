import { ValidationRule } from './validationRule'

class MaxChars extends ValidationRule {
  name = 'max_chars'

  validate(value: string, parameters: { max: number }, label?: string) {
    if (value.length <= parameters.max) {
      return this.replySuccess()
    }

    if (label) {
      return this.replyFail('The field :label cannot be more than :value characters long', {
        label: label,
        value: parameters.max.toString(),
      })
    }

    return this.replyFail('This field cannot be more than :value characters long', {
      value: parameters.max.toString(),
    })
  }

  callback = (value: string, parameters?: string[], label?: string) => {
    if (parameters === undefined || parameters[0] === undefined) {
      return this.replySuccess('Maximum value must be provided')
    }
    return this.validate(value, { max: parseInt(parameters[0]) }, label)
  }
}

export const max_chars = new MaxChars()
