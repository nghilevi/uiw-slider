export enum UIW_INPUT_TYPE {
    TEXT = 'text',
    CURRENCY = 'currency',
    EMAIL = 'email',
}

export interface UiwBaseInput {
    disabled: boolean
    label: string
    name: string
    placeholder: string
}

export type ParserFn = (value: any) => any
