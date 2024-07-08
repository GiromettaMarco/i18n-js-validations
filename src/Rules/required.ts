import { Message } from '../Replies/message'
import { RuleReply } from '../Replies/ruleReply'
import { ValidationRule } from './validationRule'

class Required extends ValidationRule {
  name = 'required'

  validate(value: string, label?: string) {
    if (value.trim().length > 0) {
      return new RuleReply(this.name, true)
    }

    if (label) {
      return new RuleReply(
        this.name,
        false,
        new Message('The field :label is required', {
          label: label,
        }),
      )
    }

    return new RuleReply(this.name, false, new Message('This field is required'))
  }
}

export const required = new Required()
