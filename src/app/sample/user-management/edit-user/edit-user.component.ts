import {
    Component,
    EventEmitter,
    Input,
    Output,
}                           from '@angular/core';
import { MdDialogRef }      from '@angular/material';

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

    constructor(private _dialog: MdDialogRef<EditUserComponent>) {
    }

    onCancelClick(): void {
        this._dialog.close();
    }

    onSaveClick(): void {
        this.userUpdated.emit(<User>{
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            address: this.address,
            role: this.role,
        });

        this._dialog.close();
    }
}
