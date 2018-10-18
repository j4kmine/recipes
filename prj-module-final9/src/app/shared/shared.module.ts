import {DropdownDirective} from './dropdown.directive';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
@NgModule({
    declarations:[
        DropdownDirective
    ],
    exports:[
        DropdownDirective,
        CommonModule
    ]
})
export class SharedModule{

}