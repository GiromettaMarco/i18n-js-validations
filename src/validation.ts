import { Message } from './replies/message'
import { RuleReply } from './replies/ruleReply'
import { ValidationReply } from './replies/validationReply'
import { Alpha } from './rules/alpha'
import { AlphaDash } from './rules/alphaDash'
import { AlphaNum } from './rules/alphaNum'
import { Equal } from './rules/equal'
import { HexColor } from './rules/hexColor'
import { Integer } from './rules/integer'
import { Max } from './rules/max'
import { MaxChars } from './rules/maxChars'
import { Min } from './rules/min'
import { MinChars } from './rules/minChars'
import { NotEqual } from './rules/notEqual'
import { NotRegex } from './rules/notRegex'
import { Numeric } from './rules/numeric'
import { Regex } from './rules/regex'
import { Required } from './rules/required'
import type { ValidationRule } from './rules/validationRule'

export type Value = string | number | boolean | null | undefined

export interface ValidationOptions {
  customRules?: ValidationRule[]
  interpolation?: string
}

export class Validation {
  /**
   * Validation rules available to this Validation object.
   */
  rules: {
    [key: string]: ValidationRule
  } = {
    alpha: new Alpha(),
    alpha_dash: new AlphaDash(),
    alpha_num: new AlphaNum(),
    equal: new Equal(),
    hex_color: new HexColor(),
    integer: new Integer(),
    regex: new Regex(),
    required: new Required(),
    max: new Max(),
    max_chars: new MaxChars(),
    min: new Min(),
    min_chars: new MinChars(),
    not_equal: new NotEqual(),
    not_regex: new NotRegex(),
    numeric: new Numeric(),
  }

  /**
   * Interpolation key syntax for reply messages.
   *
   * E.g.:
   * ':' for 'The field :label is required', and
   * '{}' for 'The field {label} is required'
   */
  interpolation: string = ':'

  /**
   * Make a new validation object.
   *
   * @param options
   */
  constructor(options?: ValidationOptions) {
    if (options?.customRules) {
      for (const customRule of options.customRules) {
        this.addRule(customRule)
      }
    }

    if (options?.interpolation) {
      this.interpolation = options.interpolation
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
  validateSingle(value: Value, rule: string, parameters: string[], label?: string): RuleReply {
    if (!this.rules[rule]) {
      return new RuleReply(rule, true, new Message("Validation rule doesn't exist"))
    }

    if (this.rules[rule].callback) {
      return this.rules[rule].callback(value, parameters, label, this.interpolation)
    }

    return this.rules[rule].validate(value, label, this.interpolation)
  }

  /**
   * Test a value against a set of validation rules.
   *
   * @param value The value to test
   * @param rules An array of validation rule names
   * @param label Set a custom label for error messages
   * @returns Return TRUE if no validation errors are detected and FALSE otherwise
   */
  validate(value: Value, rules: string[], label?: string): boolean {
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
