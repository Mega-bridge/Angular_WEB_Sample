import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

import {RowFilterModule} from "@progress/kendo-angular-grid";
import {MainComponent} from "./main.component";
import {LabelModule} from "@progress/kendo-angular-label";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    RowFilterModule,
    LabelModule
  ],
  declarations: [MainComponent]
})
export class MainModule {}
