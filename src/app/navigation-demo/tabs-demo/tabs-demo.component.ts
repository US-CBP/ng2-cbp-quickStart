import { Component }            from '@angular/core';
import { SECTIONS, Section }    from './section-content.model';

@Component({
    templateUrl: 'tabs-demo.component.html',
})
export class TabsDemoComponent {
    sections: Section[] = SECTIONS;
}
