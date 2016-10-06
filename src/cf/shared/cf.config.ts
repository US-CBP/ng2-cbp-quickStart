import { Injectable } from "@angular/core";

@Injectable()
export class Config {
    public apiUrl = 'http://localhost:3001/';
    public headerContext = 'getHeaderData';
}
