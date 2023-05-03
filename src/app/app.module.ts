import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {SharedModule} from "../shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import { LayoutModule } from '@progress/kendo-angular-layout';
import {FilterMenuModule, GridModule} from '@progress/kendo-angular-grid';
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
import {SignUpComponent} from "./login/sign-up/sign-up.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {LoginComponent} from "./login/login.component";
import {MultiSelectModule} from "@progress/kendo-angular-dropdowns";
import {TokenService} from "../shared/service/token.service";
import {AuthGuard} from "../shared/service/auth.guard";
import {AuthService} from "../shared/service/auth.service";
import {ModifyInputInfoComponent} from "./input-info/modify/modify-input-info.component";



@NgModule({
  declarations: [
    AppComponent,
    TutorialComponent,
    InputInfoComponent,
      ModifyInputInfoComponent,
    SignUpComponent,
    LoginComponent
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
        MatInputModule,
        MatCheckboxModule,
        MultiSelectModule,
        FilterMenuModule
    ],
  providers: [
      {provide: HTTP_INTERCEPTORS, useClass:TokenService, multi:true},
      AuthGuard,
      AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
