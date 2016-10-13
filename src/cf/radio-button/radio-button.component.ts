import {
    forwardRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output
}                               from "@angular/core";
import { Subscription }         from "rxjs";

import { RadioGroupComponent }  from "../radio-group";
import {
    UniqueSelectionDispatcher,
    UniqueSelectionDispatcherValue
}                               from "../shared";

let nextId = 1;

export class RadioChange {
    source: RadioButtonComponent;
    value: any;
}

@Component({
    selector: "cf-radio-button",
    templateUrl: "radio-button.component.html"
})
export class RadioButtonComponent implements OnInit, OnDestroy {
    @Input() id: string = `cf-radio-button-${nextId++}`;
    @Input() name: string;
    @Input("aria-label") ariaLabel: string;
    @Input("aria-labelledby") ariaLabelledby: string;

    @Output() change = new EventEmitter<RadioChange>();

    isInline: boolean = false;

    private _checked: boolean;
    private _disabled: boolean;
    private _value: any;
    private _subscription: Subscription;

    constructor(@Optional() private radioGroup: RadioGroupComponent, private radioDispatcher: UniqueSelectionDispatcher) {
        this._subscription = radioDispatcher.observable.subscribe(value => {
            if(value.id !== this.id && value.name === this.name) {
                this.checked = false;
            }
        });
    }

    get inputId(): string {
        return `${this.id}-input`;
    }

    @Input()
    get checked(): boolean {
        return this._checked;
    }
    set checked(newValue: boolean) {
        if(newValue) {
            this.radioDispatcher.notify(this.id, this.name);
        }

        this._checked = newValue;

        if(newValue && this.radioGroup != null && this.radioGroup.value != this.value) {
            this.radioGroup.selected = this;
        }
    }

    @Input()
    get disabled(): boolean {
        return this._disabled || (this.radioGroup != null && this.radioGroup.disabled);
    }
    set disabled(newValue: boolean) {
        this._disabled = (newValue != null && newValue !== false);
    }

    @Input()
    get value(): any {
        return this._value;
    }
    set value(newValue: any) {
        if(this._value != newValue) {
            if(this.radioGroup != null && this.checked) {
                this.radioGroup.value = newValue;
            }
            this._value = newValue;
        }
    }

    ngOnInit() {
        if(this.radioGroup != null) {
            this.checked = this.radioGroup.value == this._value;
            this.name = this.radioGroup.name;
            this.isInline = this.radioGroup.isInline;
        }
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    onInputChange($event: Event) {
        this.checked = true;
        this.emitChangeEvent();

        $event.stopPropagation();

        if(this.radioGroup != null) {
            this.radioGroup.touch();
        }
    }

    onInputBlur() {
        if(this.radioGroup != null) {
            this.radioGroup.touch();
        }
    }

    onInputClick($event: Event) {
        $event.stopPropagation();
    }

    private emitChangeEvent() {
        let event = new RadioChange();
        event.source = this;
        event.value = this._value;

        this.change.emit(event);
    }
}
