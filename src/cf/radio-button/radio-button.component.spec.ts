import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NgControl, FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";

import { RadioButtonComponent, RadioChange } from "./radio-button.component";
import { RadioGroupComponent } from "../radio-group";
import { UniqueSelectionDispatcher } from "../shared";

describe("RadioButtonComponent", () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [
                RadiosInsideRadioGroup,
                RadioGroupWithNgModel,
                StandaloneRadioButtons,
                RadioButtonComponent,
                RadioGroupComponent
            ],
            providers: [
                UniqueSelectionDispatcher
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        });
    });

    describe("inside of a group", () => {
        let fixture: ComponentFixture<RadiosInsideRadioGroup>;
        let groupDebugElement: DebugElement;
        let groupNativeElement: HTMLElement;
        let radioDebugElements: DebugElement[];
        let radioNativeElements: HTMLElement[];
        let radioLabelElements: HTMLLabelElement[];
        let groupInstance: RadioGroupComponent;
        let radioInstances: RadioButtonComponent[];
        let testComponent: RadiosInsideRadioGroup;

        beforeEach(() => {
            fixture = TestBed.createComponent(RadiosInsideRadioGroup);
            fixture.detectChanges();

            testComponent = fixture.debugElement.componentInstance;

            groupDebugElement = fixture.debugElement.query(By.directive(RadioGroupComponent));
            groupNativeElement = groupDebugElement.nativeElement;
            groupInstance = groupDebugElement.injector.get(RadioGroupComponent);

            radioDebugElements = fixture.debugElement.queryAll(By.directive(RadioButtonComponent));
            radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
            radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

            radioLabelElements = radioDebugElements.map(debugEl => debugEl.query(By.css("label")).nativeElement);
        });

        it("should set individual radio names based on the group name", () => {
            expect(groupInstance.name).toBeTruthy();
            for(let radio of radioInstances) {
                expect(radio.name).toBe(groupInstance.name);
            }
        });

        it("should disable click interaction when the group is disabled", () => {
            testComponent.isGroupDisabled = true;
            fixture.detectChanges();

            radioLabelElements[0].click();
            expect(radioInstances[0].checked).toBe(false);
        });

        it("should disable each individual radio when the group is disabled", () => {
            testComponent.isGroupDisabled = true;
            fixture.detectChanges();

            for(let radio of radioInstances) {
                expect(radio.disabled).toBe(true);
            }
        });

        it("should inline each individual radio when the group is inlined", () => {
            testComponent.isGroupInlined = true;
            fixture.detectChanges();

            for(let radio of radioInstances) {
                expect(radio.isInline).toBe(true);
            }
        });

        it("should update the group value when one of the radios changes", () => {
            expect(groupInstance.value).toBeFalsy();

            radioInstances[0].checked = true;
            fixture.detectChanges();

            expect(groupInstance.value).toBe("fire");
            expect(groupInstance.selected).toBe(radioInstances[0]);
        });

        it("should update the group and radios when one of the radios is clicked", () => {
            expect(groupInstance.value).toBeFalsy();

            radioLabelElements[0].click();
            fixture.detectChanges();

            expect(groupInstance.value).toBe("fire");
            expect(groupInstance.selected).toBe(radioInstances[0]);
            expect(radioInstances[0].checked).toBe(true);
            expect(radioInstances[1].checked).toBe(false);

            radioLabelElements[1].click();
            fixture.detectChanges();

            expect(groupInstance.value).toBe("water");
            expect(groupInstance.selected).toBe(radioInstances[1]);
            expect(radioInstances[0].checked).toBe(false);
            expect(radioInstances[1].checked).toBe(true);
        });

        it("should check a radio upon interaction with the underlying native radio button", () => {
            let nativeRadioInput = <HTMLElement>radioNativeElements[0].querySelector("input");

            nativeRadioInput.click();
            fixture.detectChanges();

            expect(radioInstances[0].checked).toBe(true);
            expect(groupInstance.value).toBe("fire");
            expect(groupInstance.selected).toBe(radioInstances[0]);
        });

        it("should emit a change event from radio buttons", () => {
            expect(radioInstances[0].checked).toBe(false);

            let spies = radioInstances
                .map((value, index) => jasmine.createSpy(`onChangeSpy ${index}`));

            spies.forEach((spy, index) => radioInstances[index].change.subscribe(spy));

            radioLabelElements[0].click();
            fixture.detectChanges();

            expect(spies[0]).toHaveBeenCalled();

            radioLabelElements[1].click();
            fixture.detectChanges();

            // To match the native radio button behavior, the change event shouldn"t
            // be triggered when the radio got unselected.
            expect(spies[0]).toHaveBeenCalledTimes(1);
            expect(spies[1]).toHaveBeenCalledTimes(1);
        });

        it("should emit a change event from the radio group", () => {
            expect(groupInstance.value).toBeFalsy();

            let changeSpy = jasmine.createSpy("radio-group change listener");
            groupInstance.change.subscribe(changeSpy);

            groupInstance.value = "fire";
            fixture.detectChanges();

            expect(changeSpy).toHaveBeenCalled();

            groupInstance.value = "water";
            fixture.detectChanges();

            expect(changeSpy).toHaveBeenCalledTimes(2);
        });

        xit("should focus individual radio buttons", () => {
            let nativeRadioInput = <HTMLElement>radioNativeElements[0].querySelector("input");

            expect(nativeRadioInput.classList).not.toContain("cf-radio-focused");

            dispatchFocusChangeEvent("focus", nativeRadioInput);
            fixture.detectChanges();

            expect(radioNativeElements[0].classList).toContain("cf-radio-focused");

            dispatchFocusChangeEvent("blur", nativeRadioInput);
            fixture.detectChanges();

            expect(radioNativeElements[0].classList).not.toContain("cf-radio-focused");
        });

        it("should update the group and radios when updating the group value", () => {
            expect(groupInstance.value).toBeFalsy();

            testComponent.groupValue = "fire";
            fixture.detectChanges();

            expect(groupInstance.value).toBe("fire");
            expect(groupInstance.selected).toBe(radioInstances[0]);
            expect(radioInstances[0].checked).toBe(true);
            expect(radioInstances[1].checked).toBe(false);

            testComponent.groupValue = "water";
            fixture.detectChanges();

            expect(groupInstance.value).toBe("water");
            expect(groupInstance.selected).toBe(radioInstances[1]);
            expect(radioInstances[0].checked).toBe(false);
            expect(radioInstances[1].checked).toBe(true);
        });

        it("should deselect all of the checkboxes when the group value is cleared", () => {
            radioInstances[0].checked = true;

            expect(groupInstance.value).toBeTruthy();

            groupInstance.value = null;

            expect(radioInstances.every(radio => !radio.checked)).toBe(true);
        });
    });

    describe("group with ngModel", () => {
        let fixture: ComponentFixture<RadioGroupWithNgModel>;
        let groupDebugElement: DebugElement;
        let groupNativeElement: HTMLElement;
        let radioDebugElements: DebugElement[];
        let radioNativeElements: HTMLElement[];
        let radioLabelElements: HTMLLabelElement[];
        let groupInstance: RadioGroupComponent;
        let radioInstances: RadioButtonComponent[];
        let testComponent: RadioGroupWithNgModel;
        let groupNgControl: NgControl;

        beforeEach(() => {
            fixture = TestBed.createComponent(RadioGroupWithNgModel);
            fixture.detectChanges();

            testComponent = fixture.debugElement.componentInstance;

            groupDebugElement = fixture.debugElement.query(By.directive(RadioGroupComponent));
            groupNativeElement = groupDebugElement.nativeElement;
            groupInstance = groupDebugElement.injector.get(RadioGroupComponent);
            groupNgControl = groupDebugElement.injector.get(NgControl);

            radioDebugElements = fixture.debugElement.queryAll(By.directive(RadioButtonComponent));
            radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
            radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

            radioLabelElements = radioDebugElements
                .map(debugEl => debugEl.query(By.css("label")).nativeElement);
        });

        it("should set individual radio names based on the group name", () => {
            expect(groupInstance.name).toBeTruthy();
            for(let radio of radioInstances) {
                expect(radio.name).toBe(groupInstance.name);
            }

            groupInstance.name = "new name";
            for(let radio of radioInstances) {
                expect(radio.name).toBe(groupInstance.name);
            }
        });

        it("should check the corresponding radio button on group value change", () => {
            expect(groupInstance.value).toBeFalsy();
            for(let radio of radioInstances) {
                expect(radio.checked).toBeFalsy();
            }

            groupInstance.value = "vanilla";
            for(let radio of radioInstances) {
                expect(radio.checked).toBe(groupInstance.value === radio.value);
            }
            expect(groupInstance.selected.value).toBe(groupInstance.value);
        });

        it("should have the correct control state initially and after interaction", () => {
            // The control should start off valid, pristine, and untouched.
            expect(groupNgControl.valid).toBe(true);
            expect(groupNgControl.pristine).toBe(true);
            expect(groupNgControl.touched).toBe(false);

            // After changing the value programmatically, the control should become dirty (not pristine),
            // but remain untouched.
            radioInstances[1].checked = true;
            fixture.detectChanges();

            expect(groupNgControl.valid).toBe(true);
            expect(groupNgControl.pristine).toBe(false);
            expect(groupNgControl.touched).toBe(false);

            // After a user interaction occurs (such as a click), the control should remain dirty and
            // now also be touched.
            radioLabelElements[2].click();
            fixture.detectChanges();

            expect(groupNgControl.valid).toBe(true);
            expect(groupNgControl.pristine).toBe(false);
            expect(groupNgControl.touched).toBe(true);
        });

        it("should update the ngModel value when selecting a radio button", () => {
            radioInstances[1].checked = true;
            fixture.detectChanges();

            expect(testComponent.modelValue).toBe("chocolate");
        });

        it("should update the model before firing change event", () => {
            expect(testComponent.modelValue).toBeUndefined();
            expect(testComponent.lastEvent).toBeUndefined();

            groupInstance.value = "chocolate";
            fixture.detectChanges();

            expect(testComponent.modelValue).toBe("chocolate");
            expect(testComponent.lastEvent.value).toBe("chocolate");

            groupInstance.value = "vanilla";
            fixture.detectChanges();

            expect(testComponent.modelValue).toBe("vanilla");
            expect(testComponent.lastEvent.value).toBe("vanilla");
        });
    });

    describe("as standalone", () => {
        let fixture: ComponentFixture<StandaloneRadioButtons>;
        let radioDebugElements: DebugElement[];
        let seasonRadioInstances: RadioButtonComponent[];
        let weatherRadioInstances: RadioButtonComponent[];
        let fruitRadioInstances: RadioButtonComponent[];
        let fruitRadioNativeInputs: HTMLElement[];
        let testComponent: StandaloneRadioButtons;

        beforeEach(() => {
            fixture = TestBed.createComponent(StandaloneRadioButtons);
            fixture.detectChanges();

            testComponent = fixture.debugElement.componentInstance;

            radioDebugElements = fixture.debugElement.queryAll(By.directive(RadioButtonComponent));
            seasonRadioInstances = radioDebugElements
                .filter(debugEl => debugEl.componentInstance.name == "season")
                .map(debugEl => debugEl.componentInstance);
            weatherRadioInstances = radioDebugElements
                .filter(debugEl => debugEl.componentInstance.name == "weather")
                .map(debugEl => debugEl.componentInstance);
            fruitRadioInstances = radioDebugElements
                .filter(debugEl => debugEl.componentInstance.name == "fruit")
                .map(debugEl => debugEl.componentInstance);

            let fruitRadioNativeElements = radioDebugElements
                .filter(debugEl => debugEl.componentInstance.name == "fruit")
                .map(debugEl => debugEl.nativeElement);

            fruitRadioNativeInputs = [];
            for(let element of fruitRadioNativeElements) {
                fruitRadioNativeInputs.push(<HTMLElement>element.querySelector("input"));
            }
        });

        it("should uniquely select radios by a name", () => {
            seasonRadioInstances[0].checked = true;
            weatherRadioInstances[1].checked = true;

            fixture.detectChanges();
            expect(seasonRadioInstances[0].checked).toBe(true);
            expect(seasonRadioInstances[1].checked).toBe(false);
            expect(seasonRadioInstances[2].checked).toBe(false);
            expect(weatherRadioInstances[0].checked).toBe(false);
            expect(weatherRadioInstances[1].checked).toBe(true);
            expect(weatherRadioInstances[2].checked).toBe(false);

            seasonRadioInstances[1].checked = true;
            fixture.detectChanges();
            expect(seasonRadioInstances[0].checked).toBe(false);
            expect(seasonRadioInstances[1].checked).toBe(true);
            expect(seasonRadioInstances[2].checked).toBe(false);
            expect(weatherRadioInstances[0].checked).toBe(false);
            expect(weatherRadioInstances[1].checked).toBe(true);
            expect(weatherRadioInstances[2].checked).toBe(false);

            weatherRadioInstances[2].checked = true;
            expect(seasonRadioInstances[0].checked).toBe(false);
            expect(seasonRadioInstances[1].checked).toBe(true);
            expect(seasonRadioInstances[2].checked).toBe(false);
            expect(weatherRadioInstances[0].checked).toBe(false);
            expect(weatherRadioInstances[1].checked).toBe(false);
            expect(weatherRadioInstances[2].checked).toBe(true);
        });

        it("should add aria-label attribute to the underlying input element if defined", () => {
            expect(fruitRadioNativeInputs[0].getAttribute("aria-label")).toBe("Banana");
        });

        it("should not add aria-label attribute if not defined", () => {
            expect(fruitRadioNativeInputs[1].hasAttribute("aria-label")).toBeFalsy();
        });

        it("should change aria-label attribute if property is changed at runtime", () => {
            expect(fruitRadioNativeInputs[0].getAttribute("aria-label")).toBe("Banana");

            fruitRadioInstances[0].ariaLabel = "Pineapple";
            fixture.detectChanges();

            expect(fruitRadioNativeInputs[0].getAttribute("aria-label")).toBe("Pineapple");
        });

        it("should add aria-labelledby attribute to the underlying input element if defined", () => {
            expect(fruitRadioNativeInputs[0].getAttribute("aria-labelledby")).toBe("xyz");
        });

        it("should not add aria-labelledby attribute if not defined", () => {
            expect(fruitRadioNativeInputs[1].hasAttribute("aria-labelledby")).toBeFalsy();
        });

        it("should change aria-labelledby attribute if property is changed at runtime", () => {
            expect(fruitRadioNativeInputs[0].getAttribute("aria-labelledby")).toBe("xyz");

            fruitRadioInstances[0].ariaLabelledby = "uvw";
            fixture.detectChanges();

            expect(fruitRadioNativeInputs[0].getAttribute("aria-labelledby")).toBe("uvw");
        });
    });
});


@Component({
    template: `
        <cf-radio-group [disabled]="isGroupDisabled"
                        [isInline]="isGroupInlined"
                        [align]="alignment"
                        [value]="groupValue"
                        name="test-name">
            <cf-radio-button value="fire">Charmander</cf-radio-button>
            <cf-radio-button value="water">Squirtle</cf-radio-button>
            <cf-radio-button value="leaf">Bulbasaur</cf-radio-button>
        </cf-radio-group>
`
})
class RadiosInsideRadioGroup {
    alignment: string;
    isGroupDisabled: boolean = false;
    isGroupInlined: boolean = false;
    groupValue: string = null;
}


@Component({
    template: `
        <cf-radio-button name="season" value="spring">Spring</cf-radio-button>
        <cf-radio-button name="season" value="summer">Summer</cf-radio-button>
        <cf-radio-button name="season" value="autum">Autumn</cf-radio-button>

        <cf-radio-button name="weather" value="warm">Spring</cf-radio-button>
        <cf-radio-button name="weather" value="hot">Summer</cf-radio-button>
        <cf-radio-button name="weather" value="cool">Autumn</cf-radio-button>

        <span id="xyz">Baby Banana</span>
        <cf-radio-button name="fruit" value="banana" aria-label="Banana" aria-labelledby="xyz">
        </cf-radio-button>
        <cf-radio-button name="fruit" value="raspberry">Raspberry</cf-radio-button>
`
})
class StandaloneRadioButtons { }


@Component({
    template: `
        <cf-radio-group [(ngModel)]="modelValue" (change)="lastEvent = $event">
            <cf-radio-button *ngFor="let option of options" [value]="option.value">
                {{option.label}}
            </cf-radio-button>
        </cf-radio-group>
`
})
class RadioGroupWithNgModel {
    modelValue: string;
    options = [
        { label: "Vanilla", value: "vanilla" },
        { label: "Chocolate", value: "chocolate" },
        { label: "Strawberry", value: "strawberry" },
    ];
    lastEvent: RadioChange;
}

/**
 * Dispatches a focus change event from an element.
 * @param eventName Name of the event, either "focus" or "blur".
 * @param element The element from which the event will be dispatched.
 */
function dispatchFocusChangeEvent(eventName: string, element: HTMLElement): void {
    let event = document.createEvent("Event");
    event.initEvent(eventName, true, true);
    element.dispatchEvent(event);
}
