import { DataSource }           from '@angular/cdk';
import {
    Component,
    OnInit,
}                               from '@angular/core';
import { MdDialog }             from '@angular/material';
import { ToolbarService }       from 'ng2-cbp-cf';
import {
    BehaviorSubject,
    Observable,
}                               from 'rxjs';

import { MockServerService }    from '../../shared';
import { EditUserComponent }    from './edit-user';
import { User }                 from './user.model';

@Component({
    templateUrl: 'user-management.component.html',
    styleUrls: ['user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
    displayedColumns: string[] = ['firstName', 'lastName', 'email', 'address', 'role', 'action'];
    userDatabase: UserDatabase = new UserDatabase(this._serverService);
    dataSource: UserDataSource | null;

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
        this._toolbarService.setTitle('User Management');
    }

    ngOnInit(): void {
        this.dataSource = new UserDataSource(this.userDatabase);
    }

    searchClicked(): void {
        this.userDatabase.filter(this.firstName, this.lastName, this.role);
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

export class UserDatabase {
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    get data(): User[] { return this.dataChange.value; }

    constructor(private _serverService: MockServerService) {
        this.filter(null, null, null);
    }

    filter(firstName: string, lastName: string, role: string): void {
        let userData = this._serverService.getUserData(firstName, lastName, role).map(d => <User>{
            firstName: d.firstName,
            lastName: d.lastName,
            email: d.email,
            address: d.address,
            role: d.role,
        });

        this.dataChange.next(userData);
    }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class UserDataSource extends DataSource<any> {
    constructor(private _userDatabase: UserDatabase) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<User[]> {
        return this._userDatabase.dataChange;
    }

    disconnect(): void { }
}
