import { RuleReply } from '../Replies/ruleReply'

export abstract class ValidationRule {
  abstract name: string

  abstract validate(value: string, ...args: any): RuleReply

  callback?: (value: string, parameters?: string[], label?: string) => RuleReply
}
