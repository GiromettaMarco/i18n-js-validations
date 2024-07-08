import { Message } from 'src/Replies/message'
import { RuleReply } from '../Replies/ruleReply'

export abstract class ValidationRule {
  abstract name: string

  abstract validate(value: string, ...args: any): RuleReply

  callback?: (value: string, parameters?: string[], label?: string) => RuleReply

  replySuccess(message?: string, parameters?: { [key: string]: string }) {
    if (message === undefined) {
      return new RuleReply(this.name, true)
    }

    return new RuleReply(this.name, true, new Message(message, parameters))
  }

  replyFail(message?: string, parameters?: { [key: string]: string }) {
    if (message === undefined) {
      return new RuleReply(this.name, false)
    }

    return new RuleReply(this.name, false, new Message(message, parameters))
  }
}
