import { NgModule } from '@angular/core';
import { RotateDirector } from "./rotate/rotate";
import { ScaleDirector } from "./scale/scale";
import { LongPressDirector } from "./long-press/long-press";

@NgModule({
  declarations: [
    RotateDirector,
    ScaleDirector,
    LongPressDirector,
  ],
  imports: [],
  exports: [
    RotateDirector,
    ScaleDirector,
    LongPressDirector
  ]
})
export class DirectivesModule {
}
