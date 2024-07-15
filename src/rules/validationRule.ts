import { Message } from '@/replies/message'
import { RuleReply } from '@/replies/ruleReply'
import type { Value } from '@/validation'

export interface interpolatedString {
  default: string
  [interpolation: string]: string
}

export interface StringsGroup {
  withLabel?: interpolatedString
  withoutLabel?: interpolatedString
}

export abstract class ValidationRule {
  /**
   * The name of the validation rule (snake_case)
   */
  abstract name: string

  /**
   * Reply strings (optional)
   */
  strings?: {
    fail?: StringsGroup
    success?: StringsGroup
  }

  /**
   * Validation function.
   *
   * @param value The value to validate
   * @param args Any type of arguments
   */
  abstract validate(value: Value, ...args: any): RuleReply

  /**
   * Callback to handle the validation process.
   *
   * If declared, it will be called instead of validate.
   *
   * @param value The value to validate
   * @param parameters Array of validation parameters
   * @param label Optional label for the reply message
   * @param interpolation Interpolation type
   */
  callback?(value: Value, parameters: string[], label?: string, interpolation?: string): RuleReply

  /**
   * Produce a rule reply.
   *
   * @param type "fail" or "success"
   * @param label Optional label for the reply message
   * @param interpolation Interpolation type
   * @param replacements Message parameters for interpolation
   * @returns A new RuleReply
   */
  reply(
    type: 'fail' | 'success' = 'fail',
    label?: string,
    interpolation?: string,
    replacements?: { [key: string]: string },
  ) {
    const passed = type === 'success'
    const hasLabel = label !== undefined && label !== ''
    const string = this.getString(type, hasLabel, interpolation)

    if (string === undefined) {
      return new RuleReply(this.name, passed)
    }

    const parsedReplacements = hasLabel ? { label: label, ...replacements } : replacements

    return new RuleReply(this.name, passed, new Message(string, parsedReplacements))
  }

  replySuccess(label?: string, interpolation?: string, replacements?: { [key: string]: string }) {
    return this.reply('success', label, interpolation, replacements)
  }

  replyFail(label?: string, interpolation?: string, replacements?: { [key: string]: string }) {
    return this.reply('fail', label, interpolation, replacements)
  }

  /**
   * Get a validation string.
   *
   * @param type "fail" or "success"
   * @param label Whether to use a label or not
   * @param interpolation Interpolation type
   * @returns The validation string or undefined if nothing were found
   */
  getString(
    type: 'fail' | 'success' = 'fail',
    label: boolean = false,
    interpolation?: string,
  ): string | undefined {
    const l = label ? 'withLabel' : 'withoutLabel'

    if (this.strings?.[type]?.[l]) {
      if (interpolation && this.strings[type][l][interpolation]) {
        return this.strings[type][l][interpolation]
      }

      return this.strings[type][l].default
    }

    return undefined
  }
}
