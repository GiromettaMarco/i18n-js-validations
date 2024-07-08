import { Message } from './Replies/message'
import { RuleReply } from './Replies/ruleReply'
import { ValidationReply } from './Replies/validationReply'
import { max_chars } from './Rules/maxChars'
import { min_chars } from './Rules/minChars'
import { required } from './Rules/required'
import type { ValidationRule } from './Rules/validationRule'

interface Options {
  customRules?: ValidationRule[]
}

export class Validation {
  /**
   * Validation rules available to this Validation object.
   */
  rules: {
    [key: string]: ValidationRule
  } = {
    required,
    min_chars,
    max_chars,
  }

  /**
   * Make a new validation object.
   *
   * @param options
   */
  constructor(options?: Options) {
    if (options?.customRules) {
      for (const customRule of options.customRules) {
        this.addRule(customRule)
      }
    }
  }

  /**
   * Store replies from the latest validation.
   */
  reply = new ValidationReply()

  /**
   * Add support for a custom validation rule.
   *
   * @param rule
   */
  addRule(rule: ValidationRule) {
    this.rules[rule.name] = rule
  }

  /**
   * Check for validation errors.
   *
   * @returns
   */
  hasErrors(): boolean {
    return this.reply.hasErrors
  }

  /**
   * Get error messages.
   *
   * @returns
   */
  getErrorMessages(): Message[] {
    return this.reply.errorMessages
  }

  /**
   * Get all replies.
   *
   * @returns
   */
  getReplies(): RuleReply[] {
    return this.reply.replies
  }

  /**
   * Test a value against a validation rule.
   *
   * @param value The value to test
   * @param rule The validation rule to apply
   * @param parameters Parameters used by some rules (like min and max)
   * @param label Set a custom label for error messages
   * @returns Return a RuleReply with a message key in case of error
   */
  validateSingle(value: string, rule: string, parameters?: string[], label?: string): RuleReply {
    if (!this.rules[rule]) {
      return new RuleReply(rule, true, new Message("Validation rule doesn't exist"))
    }

    if (this.rules[rule].callback) {
      return this.rules[rule].callback(value, parameters, label)
    }

    return this.rules[rule].validate(value, label)
  }

  /**
   * Test a value against a set of validation rules.
   *
   * @param value The value to test
   * @param rules An array of validation rule names
   * @param label Set a custom label for error messages
   * @returns Return TRUE if no validation errors are detected and FALSE otherwise
   */
  validate(value: string, rules: string[], label?: string): boolean {
    // Clear replies
    this.reply.clear()

    for (const rule of rules) {
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
