import {
    Component,
    OnInit,
}                               from '@angular/core';
import { MdDialog }             from '@angular/material';
import { ToolbarService }       from 'ng2-cbp-cf';

import { MockServerService }    from '../../shared';
import { EditUserComponent }    from './edit-user';
import { User }                 from './user.model';

@Component({
    templateUrl: 'user-management.component.html',
    styleUrls: ['user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
    firstName: string;
    lastName: string;
    role: string;

    roles: any[] = [
        { value: 'emp', text: 'Employee' },
        { value: 'admin', text: 'Administrator' },
        { value: 'sys_admin', text: 'System Administrator' },
    ];

    users: User[] = [];

    constructor(
        private _dialogService: MdDialog,
        private _serverService: MockServerService,
        private _toolbarService: ToolbarService) {
    }

    ngOnInit(): void {
        this._toolbarService.setTitle('User Management');
    }

    searchClicked(): void {
        this.users = <User[]>this._serverService.getUserData(this.firstName, this.lastName, this.role);
    }

    displayRole(role: string): string {
        return this.roles.find(r => r.value === role).text;
    }

    editUser(user: User): void {
        let dialog = this._dialogService.open(EditUserComponent);

        dialog.componentInstance.user = user;

        dialog.componentInstance.userUpdated.subscribe(e => this.updateUser(user, e));
    }

    updateUser(user: User, newUser: User): void {
        user.firstName = newUser.firstName;
        user.lastName = newUser.lastName;
        user.email = newUser.email;
        user.address = newUser.address;
        user.role = newUser.role;
    }
}
