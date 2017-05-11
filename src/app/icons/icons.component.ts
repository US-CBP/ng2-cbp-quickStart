import { Component } from '@angular/core';

@Component({
    templateUrl: 'icons.component.html',
    styleUrls: ['icons.component.scss']
})

export class IconsComponent{
    public iconList: Array<any> = [
        { icon: 'menu', name: 'Menu', description: 'Open and Close side nav' },
        { icon: 'person', name: 'User', description: 'User Accoun' },
        { icon: 'people', name: 'Users', description: 'Multiple users' },
        { icon: 'more_horiz', name: 'More', description: 'Expand list of additional options' },
        { icon: 'more_vert', name: 'More', description: 'Expand list of additional options' },
        { icon: 'save', name:'Save', description:'Save'},
        { icon: 'restore_page', name: 'Revert', description: 'Revert to previous save state'},
        { icon: 'delete', name: 'Delete', description: 'Remove/delete data' },
        { icon: 'clear', name: 'Clear', description: 'Clear specific identified data' },
        { icon: 'edit', name: 'Edit', description: 'Edit/Update' },
        { icon: 'search', name: 'Search', description: 'Search' },
        { icon: 'send', name: 'Submit', description: 'Sending current data to a workflow' },
        { icon: 'thumb_up', name: 'Approve', description: 'Approve' },
        { icon: 'thumb_down', name: 'Reject', description: 'Reject' },
        { icon: 'arrow_drop_down', name: 'Caret', description: 'Drop down menu indicator' },
        { icon: 'today', name: 'Today', description: 'Takes user back to today\'s date' },
        { icon: 'date_range', name: 'Weekly', description: 'View set of data on a weekly basis' },
        { icon: 'event_note', name: 'Monthly', description: 'View set of data on a monthly basis' },
        { icon: 'add', name: 'Add', description: 'Add data' },  
        { icon: 'attach_file', name: 'Attachment', description: 'Uploading a document' },
        { icon: 'file_download', name: 'Download', description: 'Open document' }
    ];

    public test: any = { icon: 'menu', name: 'Menu', description: 'Open and Close side nav' };

    constructor(){
        console.log('Icons Component');
    }
}