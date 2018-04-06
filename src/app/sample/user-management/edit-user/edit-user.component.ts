import {
    Component,
    EventEmitter,
    Input,
    Output,
}                           from '@angular/core';
import { MatDialogRef }     from '@angular/material';

import { User }             from '../';

@Component({
    templateUrl: 'edit-user.component.html',
})
export class EditUserComponent {
    @Input()
    set user(newValue: User) {
        this.firstName = newValue.firstName;
        this.lastName = newValue.lastName;
        this.email = newValue.email;
        this.address = newValue.address;
        this.role = newValue.role;
    }

    @Output() userUpdated: EventEmitter<User> = new EventEmitter<User>();

    firstName: string;
    lastName: string;
    email: string;
    address: string;
    role: string;

    constructor(private _dialog: MatDialogRef<EditUserComponent>) {
    }

    onCancelClick(): void {
        this._dialog.close();
    }

    onSaveClick(): void {
        this.userUpdated.emit({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            address: this.address,
            role: this.role,
        } as User);

        this._dialog.close();
    }
}
