import { Message } from "./Replies/message"
import { RuleReply } from "./Replies/ruleReply"
import { ValidationReply } from "./Replies/validationReply"
import { maxChars } from "./Rules/maxChars"
import { minChars } from "./Rules/minChars"
import { required } from "./Rules/required"

export class Validation {
  // Collect validation rules
  rules = {
    required,
    minChars,
    maxChars
  }

  // Collect validation replies
  reply = new ValidationReply()

  // Check for validation errors
  hasErrors(): boolean {
    return this.reply.hasErrors
  }

  // Get error messages
  getErrorMessages(): Message[] {
    return this.reply.errorMessages
  }

  /**
   * Test a value against a validation rule
   * 
   * @param value The value to test
   * @param rule The validation rule to apply
   * @param parameters Parameters used by some rules (like min and max)
   * @param label Set a custom label for error messages
   * @returns Return a RuleReply with a message key in case of error
   */
  validateSingle(value: string, rule: string, parameters?: string[], label?: string): RuleReply {
    switch (rule) {
      case this.rules.required.name:
        return this.rules.required.callback(value, label)

      case this.rules.minChars.name:
        if (typeof parameters === 'undefined' || typeof parameters[0] === 'undefined') {
          return new RuleReply(rule, true, new Message("Minimum value must be provided"))
        }
        return this.rules.minChars.callback(value, { min: parseInt(parameters[0]) }, label)

      case this.rules.maxChars.name:
        if (typeof parameters === 'undefined' || typeof parameters[0] === 'undefined') {
          return new RuleReply(rule, true, new Message("Maximum value must be provided"))
        }
        return this.rules.maxChars.callback(value, { max: parseInt(parameters[0]) }, label)

      default:
        return new RuleReply(rule, true, new Message("Validation rule doesn't exist"))
    }
  }

  /**
   * Test a value against a set of validation rule
   * 
   * @param value The value to test
   * @param rules An array of validation rule names
   * @param label Set a custom label for error messages
   * @returns Return TRUE if no validation errors are detected and FALSE otherwise
   */
  validate(value: string, rules: string[], label?: string): boolean {
    // Clear replies
    this.reply.clear()

    for (let rule of rules) {
      // Parse the validation rule string
      const ruleParams = rule.split(':')

      // Extract parameters
      let parameters: string[] = []
      if (typeof ruleParams[1] !== 'undefined') {
        parameters = ruleParams[1].split(',')
      }

      // Validate the value one rule at a time
      this.reply.push(this.validateSingle(value, ruleParams[0], parameters, label))
    }

    return !this.reply.hasErrors
  }
}
