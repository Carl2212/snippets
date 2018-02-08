import {Http, HttpModule} from "@angular/http";
import {NgModule, APP_INITIALIZER} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import { PressDirective } from "./press.directive";
import { TipPopover } from "./tip-popover/tip-popover";
import { TipPopoverController } from "./tip-popover/tip-popover-controller";

@NgModule({
    declarations: [
      PressDirective,
      TipPopover
    ],
    providers :[
      TipPopoverController
    ],
    imports: [
        IonicModule
    ],
})
export class pressToPopoverModule {
    constructor(
    ) {}
}
