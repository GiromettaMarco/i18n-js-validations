import { Message } from './message'

export class RuleReply {
  rule: string
  passed: boolean
  message?: Message

  constructor(rule: string, passed: boolean, message?: Message) {
    this.rule = rule
    this.passed = passed
    if (message !== undefined) {
      this.message = message
    }
  }
}
