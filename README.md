# I18n JS Validations

This package aims to provide low-level validations for javaScript primitive values with predisposition for internationalization and extension.

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Validation Options](#validation-options)
- [validate()](#validate)
- [Validation Errors](#validation-errors)
- [Message Interpolation](#message-interpolation)
- [Rule Reply](#rule-reply)
- [Available Validation Rules](#available-validation-rules)
- [Define Custom Rules](#define-custom-rules)
- [Automated Translations](#automated-translations)
- [License](#license)

## Installation

```
npm i i18n-js-validations
```

## Basic Usage

```js
import { Validation } from 'i18n-js-validations'

const $v = new Validation()

$v.validate('Jim', ['required', 'min_chars:4'])

console.log($v.hasErrors()) // true
```

## Validation Options

```js
new Validation({
  customRules: [
    new CustomRule(),
  ],
  interpolation: '{}',
  translator: (key, replacements?) => {
    // ...
  }
})
```

The ```Validation```'s constructor supports the following options:

### customRules

An array of custom validation rules that will be added to the existing ones (see [Define Custom Rules](#define-custom-rules)).

### interpolation

A key that identifies the interpolation syntax of validation messages (see [Message Interpolation](#message-interpolation)).

### translator

A callback used to generate translated messages (see [Automated Translations](#automated-translations)).

## validate()

The ```validate()``` method validates a value (first argument) against an array of [validation rules](#available-validation-rules) (second argument).

The following primitive types are supported values:

- Null
- Undefined
- Boolean
- Number
- String

It is possible to pass arguments to a validation rule using the following syntax:

```js
$v.validate(even, ['equal:2,4,6,8'])
```

A label (string) can be passed as third argument and it will be used to generate localization strings predisposed for interpolation (see [Message Interpolation](#message-interpolation)).

The ```validate()``` method returns ```true``` if no validation errors are detected and ```false``` otherwise.

```js
if ($v.validate(value, ['required', 'min_chars:4'])) {
  // validation succeded
} else {
  // validation failed
}
```

Once ```validate()``` has been called, the ```Validation``` object will contain the state of the last validation (see below).

## Validation Errors

To check for errors of the latest validation, the following methods are available:

### hasErrors()

Returns ```true``` if the last validation failed and ```false``` if it succeded.

### getErrorMessages()

Returns messages from all failed rules of the last validation.

Messages are wrapped in a ```Message``` object (see [Message Interpolation](#message-interpolation)).

### getReplies()

Returns all replies from all validation rules (failed and succeded) of the last validation.

Replies are wrapped in a ```RuleReply``` object (see [Rule Reply](#rule-reply)).

## Message Interpolation

In order to support i18n interpolation, messages are wrapped into a ```Message``` object:

```ts
class Message {
  key: string
  replacements?: {
    [key: string]: string
  }
  trans?: string

  // ...
}
```

### key

The ```key``` property contains the translation key. E.g.:

```js
"The field :label cannot be more than :value characters long"
```

The interpolation syntax can be changed by using Validation Options(see [Validation Options](#validation-options)) or by editing the ```interpolation``` property. Default rules support ```:``` (default) and ```{}``` syntaxes.

```js
$v.interpolation = "{}"
```

```js
"The field {label} cannot be more than {value} characters long"
```

### replacements

The ```replacements``` property will contain a key paired object with translation parameters as keys and replacements as values.

If the translation string does not require any replacement, the ```replacements``` property will be undefined.

### trans

If a translator callback has been defined, this property will contain a translated string (see [Automated Translations](#automated-translations)).

## Rule Reply

Any validation rule will respond with a rule reply wrapped into a ```RuleReply``` object:

```ts
class RuleReply {
  rule: string
  passed: boolean
  message?: Message

  // ...
}
```

### rule

The ```rule``` property reports the name of the validation rule who generated the reply.

### passed

The ```passed``` property contains ```true``` if the rule validation was successful or ```false``` otherwise.

### message

The ```message``` property contains a ```Message``` object ready for localization (see [Message Interpolation](#message-interpolation)).

## Available Validation Rules

### alpha | alpha:ascii

Validate that a value contains only alphabetic characters. If the "ascii" option is passed, validate that a value contains only ascii alphabetic characters.

```undefined```, ```null``` and boolean values will fail the validation.

### alpha_dash | alpha_dash:ascii

Validate that a value contains only alpha-numeric characters, dashes and underscores. If the "ascii" option is passed, validate that a value contains only ascii alpha-numeric characters, dashes, and underscores.

```undefined```, ```null``` and boolean values will fail the validation.

### alpha_num | alpha_num:ascii

Validate that a value contains only alpha-numeric characters.
If the 'ascii' option is passed, validate that a value contains only ascii alpha-numeric characters.

```undefined```, ```null``` and boolean values will fail the validation.

### equal:match1,match2,...

Validate a value is contained within a list of values.

```undefined```, ```null``` and boolean values will succed the validation againts their string representations (```"undefined"```, ```"null"```, ```"true"```, ```"false"```).

Number values will be converted to a string before validating.

### hex_color

Validate that a value is a valid HEX color.

### integer

Validate that a value is an integer.

Strings representing an integer number will pass this validation (e.g.: ```"5"``` or ```"5.0"```).

### max:value

Validate the size of a value is less than or equal to a maximum value.

```undefined```, ```null``` and boolean values will fail the validation.

String values will be converted to a number (if possible) before validating.

### max_chars:value

Validate that a value has a maximum number of characters.

```undefined``` and ```null``` will be considered as an empty string.

Boolean values will always fail the validation.

Number values will be converted to a string before validating.

### min:value

Validate the size of a value is greater than or equal to a minimum value.

```undefined```, ```null``` and boolean values will fail the validation.

String values will be converted to a number (if possible) before validating.

### min_chars:value

Validate that a value has a minimum number of characters.

```undefined``` and ```null``` will be considered as an empty string.

Boolean values will always fail the validation.

Number values will be converted to a string before validating.

### not_equal:match1,match2,...

Validate a value is not contained within a list of values.

```undefined```, ```null``` and boolean values will fail the validation againts their string representations (```"undefined"```, ```"null"```, ```"true"```, ```"false"```).

Number values will be converted to a string before validating.

### not_regex:pattern,flags

Validate that a value does not pass a regular expression check.

```undefined```, ```null``` and boolean values will be considered as an empty string.

Number values will be converted to a string before validating.

### numeric

Validate that a value is numeric.

Strings representing a number will pass this validation (e.g.: ```"5"``` or ```"5.5"```).

### regex:pattern,flags

Validate that a value passes a regular expression check.

```undefined```, ```null``` and boolean values will be considered as an empty string.

Number values will be converted to a string before validating.

### required

Validate that a value is not empty.

Boolean values will succed the validation.

Number values will succed the validation, except in the case of ```NaN```.

String values will be trimmed before validating.

```undefined``` and ```null``` will fail the validation.

## Define Custom Rules

The ```ValidationRule``` class helps define custom validation rules:

```js
class IsString extends ValidationRule {
  name = 'is_string'

  strings = {
    fail: {
      withLabel: {
        default: 'The field :label must be a string',
        '{}': 'The field {label} must be a string',
      },
      withoutLabel: {
        default: 'This field must be a string',
        '{}': 'This field must be a string',
      },
    },
  }

  validate(value, label?, interpolation?) {
    if (typeof value === 'string') {
      return this.replySuccess(label, interpolation)
    }

    return this.replyFail(label, interpolation)
  }
}
```

Once defined, a validation rule can be added to a ```Validation``` object through its constructor (see [Validation Options](#validation-options)) or by using the ```addRule()``` method:

```js
$v.addRule(new IsString())
```

A new validation rule object must define the following properties:

### name

The name of the validation.

### validate()

Method used to validate the value. Must return a ```RuleReply```.

The methods ```replySuccess()``` and ```replyFail()``` can be used to return a ```RuleReply``` with the proper ```Message```.

### callback() (optional)

This method will be called instead of ```validate()``` of defined.

It allows to take full control of the validation process.

Must return a ```RuleReply```.

### strings (optional)

Object used to store reply strings used to generate reply ```Message```s.

Strings can be accessed using the ```ValidationRule```'s helper method ```getString()```.

## Automated Translations

If a translator callback has been defined (see [Validation Options](#validation-options)), the ```Validation``` object will use it to generate and add a translated string to every ```Message```.

The translator callback recives a translation key as first argument and a key paired object with replacements as second argument (or undefined if no replacements are present).

The translator callback must return a string.

```js
new Validation({
  translator: (key, replacements?) => {
    return $t(key, replacements)
  }
})
```

It is also possible to assign a translator callback to a ```Validation``` object through its translator property:

```js
$v.translator = (key, replacements?) => {
  return $t(key, replacements)
}
```

## License

Brainlight Loader is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
