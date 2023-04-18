import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {SharedModule} from "../shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {DataService} from "../shared/service/data.service";
import { LayoutModule } from '@progress/kendo-angular-layout';
import { GridModule } from '@progress/kendo-angular-grid';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';
import { NotificationModule } from '@progress/kendo-angular-notification';
import {DashBoardModule} from "./dashboard/dash-board.module";
import { PopupModule } from '@progress/kendo-angular-popup';
import {TutorialComponent} from "./tutorial/tutorial.component";
import {InputInfoComponent} from "./input-info/input-info.component";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {LabelModule} from "@progress/kendo-angular-label";
import {FormFieldModule, InputsModule} from "@progress/kendo-angular-inputs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";



@NgModule({
  declarations: [
    AppComponent,
    TutorialComponent,
    InputInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    LayoutModule,
    GridModule,
    ChartsModule,
    AppRoutingModule,
    SharedModule,
    NotificationModule,
    DashBoardModule,
    PopupModule,
    MatButtonModule,
    ReactiveFormsModule,
    LabelModule,
    FormFieldModule,
    InputsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
