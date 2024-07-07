import { Message } from '../Replies/message'
import { RuleReply } from '../Replies/ruleReply'
import { ValidationRule } from "./validationRule"

class MinChars extends ValidationRule {
  name = 'min_chars'

  callback(value: string, parameters: { min: number }, label?: string) {
    if (value.length >= parameters.min) {
      return new RuleReply(this.name, true)
    }
    
    if (label) {
      return new RuleReply(
        this.name,
        false,
        new Message("The field :label must be at least :value characters long", {
          label: label,
          value: parameters.min.toString()
        })
      )
    }

    return new RuleReply(
      this.name,
      false,
      new Message("This field must be at least :value characters long", {
        value: parameters.min.toString()
      })
    )
  }
}

export const minChars = new MinChars()
