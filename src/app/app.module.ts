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


@NgModule({
  declarations: [
    AppComponent
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
    DashBoardModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
