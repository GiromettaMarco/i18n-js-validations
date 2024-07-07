import { RuleReply } from '../Replies/ruleReply';

export abstract class ValidationRule {
  abstract name: string

  abstract callback(value: string, ...args: any): RuleReply
}
