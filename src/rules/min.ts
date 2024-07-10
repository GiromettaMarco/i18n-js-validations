import { ValidationRule } from './validationRule'

/**
 * Validate the size of a value is greater than or equal to a minimum value.
 *
 * @syntax min:value
 */
class Min extends ValidationRule {
  name = 'min'

  validate(value: string, parameters: { min: number }, label?: string, interpolation?: string) {
    if (Number(value) >= parameters.min) {
      return this.replySuccess()
    }

    if (label) {
      const text =
        interpolation === '{}'
          ? 'The field {label} cannot be smaller than {value}'
          : 'The field :label cannot be smaller than :value'

      return this.replyFail(text, {
        label: label,
        value: parameters.min.toString(),
      })
    }

    const text =
      interpolation === '{}'
        ? 'This field cannot be smaller than {value}'
        : 'This field cannot be smaller than :value'

    return this.replyFail(text, { value: parameters.min.toString() })
  }

  callback = (value: string, parameters: string[], label?: string, interpolation?: string) => {
    if (parameters[0] === undefined) {
      return this.replySuccess('Minimum value must be provided')
    }

    return this.validate(value, { min: Number(parameters[0]) }, label, interpolation)
  }
}

export const min = new Min()
