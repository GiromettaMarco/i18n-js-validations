import { Message } from "./message"
import { RuleReply } from "./ruleReply"

export class ValidationReply {
  replies: RuleReply[] = []
  hasErrors: boolean = false
  errorMessages: Message[] = []

  clear(): void {
    this.hasErrors = false
    this.replies = []
    this.errorMessages = []
  }

  push(reply: RuleReply): number {
    if (!reply.passed) {
      this.hasErrors = true

      if (reply.message !== undefined) {
        this.errorMessages.push(reply.message)
      }
    }
    return this.replies.push(reply)
  }
}