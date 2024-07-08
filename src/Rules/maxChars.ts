import { Message } from '../Replies/message'
import { RuleReply } from '../Replies/ruleReply'
import { ValidationRule } from "./validationRule"

class MaxChars extends ValidationRule {
  name = 'max_chars'

  validate(value: string, parameters: { max: number }, label?: string) {
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

  callback = (value: string, parameters?: string[], label?: string) => {
    if (parameters === undefined || parameters[0] === undefined) {
      return new RuleReply(this.name, true, new Message("Maximum value must be provided"))
    }
    return this.validate(value, { max: parseInt(parameters[0]) }, label)
  }
}

export const max_chars = new MaxChars()
