import { ValidationRule } from './validationRule'

class Required extends ValidationRule {
  name = 'required'

  validate(value: string, label?: string) {
    if (value.trim().length > 0) {
      return this.replySuccess()
    }

    if (label) {
      return this.replyFail('The field :label is required', { label: label })
    }

    return this.replyFail('This field is required')
  }
}

export const required = new Required()
