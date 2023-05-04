import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from "./layout/side-nav/side-nav.component";
import { TopNavComponent } from "./layout/top-nav/top-nav.component";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatMenuModule } from "@angular/material/menu";
import { MatListModule } from "@angular/material/list";
import { LayoutComponent } from "./layout/layout.component";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { PanelBarModule } from "@progress/kendo-angular-layout";
import { RouterModule } from '@angular/router';
import {ButtonsModule} from "@progress/kendo-angular-buttons";
import {MatDialogModule} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "./component/dialogs/confirm-dialog/confirm-dialog.component";
import {DropDownListModule} from "@progress/kendo-angular-dropdowns";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([]), // RouterModule.forChild()를 사용합니다.
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatListModule,
        PanelBarModule,
        ButtonsModule,
        MatDialogModule,
        DropDownListModule,
        ReactiveFormsModule,
    ],
  declarations: [
    // layout
    SideNavComponent,
    TopNavComponent,
    LayoutComponent,
    // dialogs
    ConfirmDialogComponent
  ],
  exports: [LayoutComponent]
})
export class SharedModule { }
