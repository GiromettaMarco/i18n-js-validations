export declare interface interpolatedString {
    default: string;
    [interpolation: string]: string;
}

export declare class Message {
    key: string;
    parameters?: {
        [key: string]: string;
    };
    constructor(key: string, parameters?: {
        [key: string]: string;
    });
}

export declare class RuleReply {
    rule: string;
    passed: boolean;
    message?: Message;
    constructor(rule: string, passed: boolean, message?: Message);
}

export declare interface StringsGroup {
    withLabel?: interpolatedString;
    withoutLabel?: interpolatedString;
}

export declare class Validation {
    /**
     * Validation rules available to this Validation object.
     */
    rules: {
        [key: string]: ValidationRule;
    };
    /**
     * Interpolation key syntax for reply messages.
     *
     * E.g.:
     * ':' for 'The field :label is required', and
     * '{}' for 'The field {label} is required'
     */
    interpolation: string;
    /**
     * Make a new validation object.
     *
     * @param options
     */
    constructor(options?: ValidationOptions);
    /**
     * Store replies from the latest validation.
     */
    reply: ValidationReply;
    /**
     * Add support for a custom validation rule.
     *
     * @param rule
     */
    addRule(rule: ValidationRule): void;
    /**
     * Check for validation errors.
     *
     * @returns
     */
    hasErrors(): boolean;
    /**
     * Get error messages.
     *
     * @returns
     */
    getErrorMessages(): Message[];
    /**
     * Get all replies.
     *
     * @returns
     */
    getReplies(): RuleReply[];
    /**
     * Test a value against a validation rule.
     *
     * @param value The value to test
     * @param rule The validation rule to apply
     * @param parameters Parameters used by some rules (like min and max)
     * @param label Set a custom label for error messages
     * @returns Return a RuleReply with a message key in case of error
     */
    validateSingle(value: Value, rule: string, parameters: string[], label?: string): RuleReply;
    /**
     * Test a value against a set of validation rules.
     *
     * @param value The value to test
     * @param rules An array of validation rule names
     * @param label Set a custom label for error messages
     * @returns Return TRUE if no validation errors are detected and FALSE otherwise
     */
    validate(value: Value, rules: string[], label?: string): boolean;
}

export declare interface ValidationOptions {
    customRules?: ValidationRule[];
    interpolation?: string;
}

export declare class ValidationReply {
    replies: RuleReply[];
    hasErrors: boolean;
    errorMessages: Message[];
    clear(): void;
    push(reply: RuleReply): number;
}

export declare abstract class ValidationRule {
    /**
     * The name of the validation rule (snake_case)
     */
    abstract name: string;
    /**
     * Reply strings (optional)
     */
    strings?: {
        fail?: StringsGroup;
        success?: StringsGroup;
    };
    /**
     * Validation function.
     *
     * @param value The value to validate
     * @param args Any type of arguments
     */
    abstract validate(value: Value, ...args: any): RuleReply;
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
    callback?(value: Value, parameters: string[], label?: string, interpolation?: string): RuleReply;
    /**
     * Produce a rule reply.
     *
     * @param type "fail" or "success"
     * @param label Optional label for the reply message
     * @param interpolation Interpolation type
     * @param parameters Message parameters for interpolation
     * @returns A new RuleReply
     */
    reply(type?: 'fail' | 'success', label?: string, interpolation?: string, parameters?: {
        [key: string]: string;
    }): RuleReply;
    replySuccess(label?: string, interpolation?: string, parameters?: {
        [key: string]: string;
    }): RuleReply;
    replyFail(label?: string, interpolation?: string, parameters?: {
        [key: string]: string;
    }): RuleReply;
    /**
     * Get a validation string.
     *
     * @param type "fail" or "success"
     * @param label Whether to use a label or not
     * @param interpolation Interpolation type
     * @returns The validation string or undefined if nothing were found
     */
    getString(type?: 'fail' | 'success', label?: boolean, interpolation?: string): string | undefined;
}

export declare type Value = string | number | boolean | null | undefined;

export { }
