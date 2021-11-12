/**
 * For the generation of error messages
 */
export type AsyncValidatorFn = (value?: string) => Promise<string | null>
export type ValidatorFn = (value?: string) => string | null

export enum ErrorKey {
    required = 'required',
    tooHigh = 'tooHigh',
    tooLow = 'tooLow',
}

export type ErrorMessage = {
    [key in ErrorKey]: string
}

export function getErrorMessage(args: {
    input: number
    min: number
    max: number
    required: boolean
    template?: ErrorMessage
}) {
    if (isNaN(args.input) && args.required) {
        return args.template?.required || 'The input is required.'
    } else if (args.input > args.max) {
        return args.template?.tooHigh || `The maximum value is ${args.max}.`
    } else if (args.input < args.min) {
        return args.template?.tooLow || `The minimum value is ${args.min}.`
    } else return null
}
