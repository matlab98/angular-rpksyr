import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { KanbanAllModule } from '@syncfusion/ej2-angular-kanban';
import { CheckBoxAllModule } from '@syncfusion/ej2-angular-buttons';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { NumericTextBoxAllModule, TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { extend, addClass } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsModel, CardSettingsModel, SwimlaneSettingsModel, DialogSettingsModel, CardRenderedEventArgs } from '@syncfusion/ej2-angular-kanban';
import { cardData } from './data';

@Component({
    standalone: true,
    imports: [ CommonModule, HttpModule, KanbanAllModule, DialogModule,   CheckBoxAllModule,DatePickerModule,DropDownListAllModule, NumericTextBoxAllModule, TextBoxAllModule, ReactiveFormsModule, FormsModule, ],
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    @ViewChild('kanbanObj') kanbanObj: KanbanComponent;
    public kanbanData: Object[] = extend([], cardData, null, true) as Object[];
    public columns: ColumnsModel[] = [
        { headerText: 'To Do', keyField: 'Open', allowToggle: true },
        { headerText: 'In Progress', keyField: 'InProgress', allowToggle: true },
        { headerText: 'In Review', keyField: 'Review', allowToggle: true },
        { headerText: 'Done', keyField: 'Close', allowToggle: true }
    ];
    public cardSettings: CardSettingsModel = {
        headerField: 'Title',
        template: '#cardTemplate',
        selectionType: 'Multiple'
    };
    public dialogSettings: DialogSettingsModel = {
        fields: [
            { text: 'ID', key: 'Title', type: 'TextBox' },
            { key: 'Status', type: 'DropDown' },
            { key: 'Assignee', type: 'DropDown' },
            { key: 'RankId', type: 'TextBox' },
            { key: 'Summary', type: 'TextArea' }
        ]
    };
    public swimlaneSettings: SwimlaneSettingsModel = { keyField: 'Assignee' };

    constructor() {
        
    }

    public getString(assignee: string) {
        return assignee.match(/\b(\w)/g).join('').toUpperCase();
    }
    cardRendered(args: CardRenderedEventArgs): void {
        const val: string = (<{[key: string]: Object}>(args.data)).Priority as string;
        addClass([args.element], val);
    }
}
