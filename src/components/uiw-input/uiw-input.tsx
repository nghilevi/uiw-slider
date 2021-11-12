import {
    Component,
    Prop,
    h,
    Element,
    Event,
    EventEmitter,
    Listen,
    Method,
    State,
    Watch,
} from '@stencil/core'

import { bem, bemFromBlock } from '../../global/bem'
import { NwccBaseInput, NWCC_INPUT_TYPE } from './uiw-base-input'

import { AsyncValidatorFn, ValidatorFn } from '../../global/errorHandler'

const block = 'uiw-input'
const c = bemFromBlock(block)

type InputEvent = Event & {
    target?: HTMLInputElement
}

/**
 * @slot custominput - Custom input file can be passed for the component. Then the original input field is hidden. Notice
 * that you need then handle special cases by yourself.
 * e.g. <uiw-input ...><input slot="custominput" class="uiw-input__field" /> </uiw-input>
 *
 *
 *
 * @slot postfix - Icons (e.g. calendar) and text (e.g. currency) can be passed to be shown on the right of the input field.
 * e.g. <uiw-input ...><custom-icon slot="postfix" ...></custom-icon></uiw-input>
 */
@Component({
    tag: 'uiw-input',
    styleUrl: 'uiw-input.scss',
})
export class NwccInput implements NwccBaseInput {
    @Element() el: HTMLElement // host element

    @Prop() label!: string
    /**
     * Icon shown inside the input field
     */
    @Prop() leftIcon: string
    @Prop({ mutable: true }) value: string = ''
    @Prop() placeholder: string = ''
    @Prop() postfix: string = ''
    @Prop({ mutable: true }) error: string = ''
    @Prop() note: string = ''
    @Prop() name: string = ''
    @Prop() type: NWCC_INPUT_TYPE = NWCC_INPUT_TYPE.TEXT
    @Prop() inputmode: string = 'text'
    @Prop() counter: number = 0
    @Prop() disabled: boolean = false
    @Prop() maxlength: number
    @Prop() formatter?: (
        value: string,
        target: HTMLInputElement
    ) => string | undefined
    /**
     *
     * There are 2 options to validate, either pass the sync/async validation or listen to changes and update error message
     * Depending on usage we might end up killing passing of error message or asyncValidators
     *
     */
    @Prop() asyncValidators: AsyncValidatorFn[] = []
    /**
     *
     * There are 2 options to validate, either pass the sync/async validation or listen to changes and update error message
     * Depending on usage we might end up killing passing of error message or validators
     *
     */
    @Prop() validators: ValidatorFn[] = []
    @Prop() required: boolean = false
    /**
     * Used for localization of translations
     */
    @Prop() translations?: {
        required?: string
        invalidEmail?: string
    }

    @State()
    hasPostfixSlot: boolean

    @State()
    hasCustomInputPassed: boolean

    @Watch('value')
    watchHandler(newValue: string) {
        if (this.formatter) {
            this.updateInputValue(this.elRef, newValue)
        }
    }

    @Event() uiwInputChange: EventEmitter
    /**
     * @deprecated use nwccInputValidate
     */
    @Event() validate: EventEmitter
    /**
     * @deprecated use nwccInputValidateDebounced
     */
    @Event() validatedebounced: EventEmitter

    @Event() nwccInputChange: EventEmitter<string>
    @Event() nwccInputFocus: EventEmitter<FocusEvent>
    @Event() nwccInputBlur: EventEmitter<string>
    @Event() nwccInputKeyDown: EventEmitter<KeyboardEvent>
    @Event() nwccInputValidate: EventEmitter<string>
    @Event() nwccInputValidateDebounced: EventEmitter<string>

    @Method()
    async elementRef() {
        return this.elRef
    }

    @Listen('keydown')
    handleKeyDown(ev: KeyboardEvent) {
        this.nwccInputKeyDown.emit(ev)
    }

    private elRef: HTMLInputElement
    private lastValue: string
    private validatedAsync: boolean

    constructor() {


        if (this.required) {
            this.validators.push((value) =>
                value == null || value === ''
                    ? this.translations?.required || 'Value is required'
                    : null
            )
        }
        // Add validator for checking the email address
        if (this.type === NWCC_INPUT_TYPE.EMAIL) {
            this.maxlength = this.maxlength ?? 320 //Sets the maximum length to 320 characters if the maximum length is not set.
            /**
             * Provided that an email address is provided, the below checks if the provided email address is valid according to
             * https://www.rfc-editor.org/rfc/rfc3696.txt. In short, the validator checks if the input:
             * 1) does not start or end with a dot,
             * 2) contains a local part (the one before @), a host name (the one after @ but before the last dot) and a domain name (the one after the last dot)
             * 3) has no special character in the domain/host name other than dots and hyphens (note that hostname should be either a domain name or an ip-address)
             * 4) has no special character in the local part other than .!#$%&’*+/=?^_`{|}~-
             * 5) does not have consecutive dots.
             *
             */
            this.validators.push((value) =>
                value === '' ||
                /^[a-zA-Z0-9!#$%&’*+/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&’*+/=?^_`{|}~-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/.test(
                    value || ''
                )
                    ? null
                    : this.translations?.invalidEmail || 'Invalid email address'
            )
        }
    }

    get isValid() {
        return this.validatedAsync && !this.error
    }

    componentWillLoad() {
        this.hasPostfixSlot = this.el.querySelector('[slot="postfix"]') !== null
        this.hasCustomInputPassed =
            this.el.querySelector('[slot="custominput"]') !== null
    }

    componentDidLoad() {
        if (this.value) {
            this.updateInputValue(this.elRef, this.value)
        }
    }

    private onInput(e: InputEvent) {
        this.updateInputValue(e.target, e.target.value)
        this.uiwInputChange.emit(e)
        this.nwccInputChange.emit(this.value)
    }

    private updateInputValue(target: HTMLInputElement, value: string) {
        this.value = !this.formatter
            ? value
            : this.formatter(value, target) || ''
        this.validateInline(this.value)

        // Patch to fix input not updating value after formatting if value is the same as old
        // for example if you type 10a then formatted value is 10 but it sees previous value as 10 so it doesn't update
        if (!this.lastValue || this.lastValue === this.value) {
            this.elRef.value = this.value
        }

        this.lastValue = this.value
    }

    private validateAsync(value: string) {
        if (this.asyncValidators?.length && !this.error) {
            this.validatedAsync = false

            Promise.all(
                this.asyncValidators.map((asyncValidator) =>
                    asyncValidator(value)
                )
            )
                .then(() => {
                    this.error = ''
                })
                .catch((errorMessage) => {
                    this.error = errorMessage
                })
                .finally(() => {
                    this.validatedAsync = true
                })
        }
    }

    private onFocusChange(e: FocusEvent) {
        this.nwccInputFocus.emit(e)
    }

    private onBlurChange() {
        this.validateInline(this.value)
        this.validateAsync(this.value)
        this.nwccInputBlur.emit(this.value)
    }

    private validateInline(value: string) {
        if (this.validators.length) {
            this.error =
                this.validators
                    .map((validator) => validator(value))
                    .find((v) => v) || ''
        }
    }

    render() {
        return (
            <label
                class={bem(block, {
                    error: this.error,
                    disabled: this.disabled,
                })}
            >
                <div class={c('header')}>
                    <div class={c('label')}>{this.label}</div>
                    {this.note && <div class={c('note')}>{this.note}</div>}
                </div>
                <div class={c('field-container')}>
                    {this.leftIcon && (
                        <custom-icon
                            class="uiw-input__left-icon"
                            name={this.leftIcon}
                            color="current-color"
                        ></custom-icon>
                    )}

                    {!this.hasCustomInputPassed && (
                        <input
                            ref={(el) => (this.elRef = el as HTMLInputElement)}
                            class={c('field')}
                            type={this.type}
                            value={this.value}
                            placeholder={this.placeholder}
                            name={this.name}
                            disabled={this.disabled}
                            aria-invalid={!!this.error}
                            inputmode={this.inputmode}
                            maxlength={this.maxlength}
                            onInput={(e) => this.onInput(e as InputEvent)}
                            onFocus={(e) => this.onFocusChange(e)}
                            onBlur={() => this.onBlurChange()}
                        />
                    )}

                    <slot name="custominput"></slot>

                    {this.postfix && (
                        <div class={c('postfix')}>{this.postfix}</div>
                    )}

                    {this.hasPostfixSlot && <slot name="postfix"></slot>}
                </div>
                <div class={c('footer')}>
                    {this.error && <div class={c('error')}>{this.error}</div>}
                    {this.counter > 0 && (
                        <div class={c('counter')}>
                            {this.value.length} / {this.counter}
                        </div>
                    )}
                </div>
            </label>
        )
    }
}
