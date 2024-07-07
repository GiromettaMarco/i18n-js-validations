import { Message } from '../Replies/message'
import { RuleReply } from '../Replies/ruleReply'
import { ValidationRule } from "./validationRule"

class MaxChars extends ValidationRule {
  name = 'max_chars'

  callback(value: string, parameters: { max: number }, label?: string) {
    if (value.length <= parameters.max) {
      return new RuleReply(this.name, true)
    }

    if (label) {
      return new RuleReply(
        this.name,
        false,
        new Message("The field :label cannot be more than :value characters long", {
          label: label,
          value: parameters.max.toString()
        })
      )
    }

    return new RuleReply(
      this.name,
      false,
      new Message("This field cannot be more than :value characters long", {
        value: parameters.max.toString()
      })
    )
  }
}

export const maxChars = new MaxChars()
