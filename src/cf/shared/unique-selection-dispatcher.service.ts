import { Injectable }   from "@angular/core";
import {
    BehaviorSubject,
    Observable
}                       from "rxjs";

export interface UniqueSelectionDispatcherValue {
    id: string;
    name: string;
}

@Injectable()
export class UniqueSelectionDispatcher {
    private _behavior: BehaviorSubject<UniqueSelectionDispatcherValue> = new BehaviorSubject<UniqueSelectionDispatcherValue>({ id: null, name: null });
    private _observable: Observable<UniqueSelectionDispatcherValue> = this._behavior.asObservable();

    notify(id: string, name: string) {
        this._behavior.next({ id, name });
    }

    get observable(): Observable<UniqueSelectionDispatcherValue> {
        return this._observable;
    }
}
