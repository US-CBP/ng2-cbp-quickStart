import { Component } from "@angular/core";

let currentId = 1;

@Component({
    templateUrl: "radio-button-demo.component.html"
})
export class RadioButtonDemoComponent {
    demo1Model: string = "value1";
    demo2Model: string = "value1";
    demo3Model: string = "value1";
}
