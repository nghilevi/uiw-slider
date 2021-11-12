export enum NWCC_INPUT_TYPE {
    TEXT = 'text',
    CURRENCY = 'currency',
    EMAIL = 'email',
}

export interface NwccBaseInput {
    disabled: boolean
    label: string
    name: string
    placeholder: string
}

export type ParserFn = (value: any) => any
