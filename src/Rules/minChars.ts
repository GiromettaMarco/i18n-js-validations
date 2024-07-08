import { Message } from '../Replies/message'
import { RuleReply } from '../Replies/ruleReply'
import { ValidationRule } from './validationRule'

class MinChars extends ValidationRule {
  name = 'min_chars'

  validate(value: string, parameters: { min: number }, label?: string) {
    if (value.length >= parameters.min) {
      return new RuleReply(this.name, true)
    }

    if (label) {
      return new RuleReply(
        this.name,
        false,
        new Message('The field :label must be at least :value characters long', {
          label: label,
          value: parameters.min.toString(),
        }),
      )
    }

    return new RuleReply(
      this.name,
      false,
      new Message('This field must be at least :value characters long', {
        value: parameters.min.toString(),
      }),
    )
  }

  callback = (value: string, parameters?: string[], label?: string) => {
    if (parameters === undefined || parameters[0] === undefined) {
      return new RuleReply(this.name, true, new Message('Minimum value must be provided'))
    }
    return this.validate(value, { min: parseInt(parameters[0]) }, label)
  }
}

export const min_chars = new MinChars()
