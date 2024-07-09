import { ValidationRule } from './validationRule'

/**
 * Validate that a value contains only alpha-numeric characters.
 * If the 'ascii' option is passed, validate that a value contains only ascii alpha-numeric characters.
 */
class AlphaNum extends ValidationRule {
  name = 'alpha_num'

  validate(value: string, parameters: { ascii: boolean }, label?: string, interpolation?: string) {
    const regex = parameters.ascii ? /^[a-zA-Z0-9]+$/u : /^[\p{L}\p{M}\p{N}]+$/u

    if (regex.test(value)) {
      return this.replySuccess()
    }

    if (label) {
      const text =
        interpolation === '{}'
          ? 'The field {label} can contain only alpha-numeric characters'
          : 'The field :label can contain only alpha-numeric characters'

      return this.replyFail(text, { label: label })
    }

    return this.replyFail('This field can contain only alpha-numeric characters')
  }

  callback = (value: string, parameters: string[], label?: string, interpolation?: string) => {
    const ascii = Boolean(parameters[0] === 'ascii')

    return this.validate(value, { ascii: ascii }, label, interpolation)
  }
}

export const alpha_num = new AlphaNum()
