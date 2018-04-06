import {
    Component,
    OnInit,
}                               from '@angular/core';
import { MatDialog }            from '@angular/material';
import { ToolbarService }       from 'ng2-cbp-cf/src/toolbar';

import { MockServerService }    from '../../shared';
import { EditUserComponent }    from './edit-user';
import { User }                 from './user.model';

@Component({
    templateUrl: 'user-management.component.html',
    styleUrls: ['user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
    displayedColumns: string[] = ['firstName', 'lastName', 'email', 'address', 'role', 'action'];
    dataSource: any;

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
        private _dialogService: MatDialog,
        private _serverService: MockServerService,
        private _toolbarService: ToolbarService) {
        this._toolbarService.setTitle('User Management');
    }

    ngOnInit(): void {
        this.dataSource = this._filter(null, null, null);
    }

    searchClicked(): void {
        this.dataSource = this._filter(this.firstName, this.lastName, this.role);
    }

    displayRole(role: string): string {
        return this.roles.find(r => r.value === role).text;
    }

    editUser(user: User): void {
        const dialog = this._dialogService.open(EditUserComponent);

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

    private _filter(firstName: string, lastName: string, role: string): User[] {
        return this._serverService.getUserData(firstName, lastName, role).map(d => {
            return {
                firstName: d.firstName,
                lastName: d.lastName,
                email: d.email,
                address: d.address,
                role: d.role,
            } as User;
        });
    }
}
