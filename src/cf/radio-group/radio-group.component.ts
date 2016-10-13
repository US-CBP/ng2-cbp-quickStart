import {
    forwardRef,
    AfterContentInit,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    Output,
    QueryList
}                           from "@angular/core";
import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor
}                           from "@angular/forms";

import {
    RadioButtonComponent,
    RadioChange
}                           from "../radio-button";

let nextId = 1;

export const radioGroupControlValueAccessor = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioGroupComponent),
    multi: true
};

@Component({
    selector: "cf-radio-group",
    templateUrl: "radio-group.component.html",
    providers: [radioGroupControlValueAccessor]
})
export class RadioGroupComponent implements AfterContentInit, ControlValueAccessor {
    @Output() change = new EventEmitter<RadioChange>();

    @ContentChildren(forwardRef(() => RadioButtonComponent)) _radios: QueryList<RadioButtonComponent> = null;

    private _value: any = null;
    private _name: string = `cf-radio-group-${nextId++}`;
    private _disabled: boolean = false;
    private _isInline: boolean = false;
    private _selected: RadioButtonComponent = null;
    private _isInitialized: boolean = false;
    private _controlValueAccessorChangeFn: (value: any) => void = (value) => { };

    onTouched: () => any = () => { };

    @Input()
    get name(): string {
        return this._name;
    }
    set name(newValue: string) {
        this._name = newValue;
        this.updateRadioButtonNames();
    }

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(newValue: boolean) {
        this._disabled = (newValue != null && newValue !== false);
    }

    @Input()
    get isInline(): boolean {
        return this._isInline;
    }
    set isInline(newValue: boolean) {
        this._isInline = newValue;
        this.updateRadioButtonIsInlines();
    }

    @Input()
    get value(): any {
        return this._value;
    }
    set value(newValue: any) {
        if(this._value != newValue) {
            this._value = newValue;

            this.updateSelectedRadioFromValue();

            if(this._isInitialized) {
                this.emitChangeEvent();
            }
        }
    }

    @Input()
    get selected(): RadioButtonComponent {
        return this._selected;
    }
    set selected(newValue: RadioButtonComponent) {
        this._selected = newValue;
        this.value = newValue != null ? newValue.value : null;

        if(newValue != null && !newValue.checked) {
            newValue.checked = true;
        }
    }

    ngAfterContentInit() {
        this._isInitialized = true;
    }

    touch() {
        if(this.onTouched != null) {
            this.onTouched();
        }
    }

    private updateRadioButtonNames() {
        if(this._radios != null) {
            this._radios.forEach(radio => {
                radio.name = this.name;
            });
        }
    }

    private updateRadioButtonIsInlines() {
        if(this._radios != null) {
            this._radios.forEach(radio => {
                radio.isInline = this.isInline;
            });
        }
    }

    private updateSelectedRadioFromValue() {
        let isAlreadySelected = this._selected != null && this._selected.value == this._value;

        if(this._radios != null && !isAlreadySelected) {
            let matchingRadio = this._radios.filter(radio => radio.value == this._value)[0];

            if(matchingRadio != null) {
                this.selected = matchingRadio;
            } else if(this.value == null) {
                this.selected = null;
                this._radios.forEach(radio => {
                    radio.checked = false;
                });
            }
        }
    }

    private emitChangeEvent() {
        let event = new RadioChange();
        event.source = this._selected;
        event.value = this._value;

        this._controlValueAccessorChangeFn(event.value);
        this.change.emit(event);
    }

    writeValue(value: any) {
        this.value = value;
    }

    registerOnChange(fn: (value: any) => void) {
        this._controlValueAccessorChangeFn = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    setDisabledState(value: boolean) {
        this.disabled = value;
    }
}
