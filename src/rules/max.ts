import { ValidationRule } from './validationRule'

/**
 * Validate the size of a value is less than or equal to a maximum value.
 *
 * @syntax max:value
 */
class Max extends ValidationRule {
  name = 'max'

  validate(value: string, parameters: { max: number }, label?: string, interpolation?: string) {
    if (Number(value) <= parameters.max) {
      return this.replySuccess()
    }

    if (label) {
      const text =
        interpolation === '{}'
          ? 'The field {label} cannot be greater than {value}'
          : 'The field :label cannot be greater than :value'

      return this.replyFail(text, {
        label: label,
        value: parameters.max.toString(),
      })
    }

    const text =
      interpolation === '{}'
        ? 'This field cannot be greater than {value}'
        : 'This field cannot be greater than :value'

    return this.replyFail(text, { value: parameters.max.toString() })
  }

  callback = (value: string, parameters: string[], label?: string, interpolation?: string) => {
    if (parameters[0] === undefined) {
      return this.replySuccess('Maximum value must be provided')
    }

    return this.validate(value, { max: Number(parameters[0]) }, label, interpolation)
  }
}

export const max = new Max()
