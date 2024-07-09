import { ValidationRule } from './validationRule'

/**
 * Validate that an attribute contains only alphabetic characters.
 * If the 'ascii' option is passed, validate that an attribute contains only ascii alphabetic characters.
 */
class Alpha extends ValidationRule {
  name = 'alpha'

  validate(value: string, parameters: { ascii: boolean }, label?: string, interpolation?: string) {
    const regex = parameters.ascii ? /^[a-zA-Z]+$/u : /^[\p{L}\p{M}]+$/u

    if (regex.test(value)) {
      return this.replySuccess()
    }

    if (label) {
      const text =
        interpolation === '{}'
          ? 'The field {label} can contain only alphabetic characters'
          : 'The field :label can contain only alphabetic characters'

      return this.replyFail(text, { label: label })
    }

    return this.replyFail('This field can contain only alphabetic characters')
  }

  callback = (value: string, parameters: string[], label?: string, interpolation?: string) => {
    const ascii = Boolean(parameters[0] === 'ascii')

    return this.validate(value, { ascii: ascii }, label, interpolation)
  }
}

export const alpha = new Alpha()
