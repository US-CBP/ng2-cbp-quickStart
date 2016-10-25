import { Component } from '@angular/core';

import {
    ButtonRoles,
    ButtonSizes
} from 'ng2-cbp-cf';

@Component({
    templateUrl: 'button-demo.component.html'
})
export class ButtonDemoComponent {
    ButtonRoles: any = ButtonRoles;
    ButtonSizes: any = ButtonSizes;
}
