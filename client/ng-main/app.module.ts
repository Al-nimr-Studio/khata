import './polyfills';

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {enableProdMode} from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';




import {routing} from "../routes/app.routes";
import {AppMainComponent} from "../components/app-main.component";
import {DeskboardComponent} from "../components/deskboard.component";

import {SidebarComponent} from "../components/layout/sidebar.component";
import {NavbarComponent} from "../components/layout/navbar.component";
import {FooterComponent} from "../components/layout/footer.component";
import {ThemeComponent} from "../components/layout/theme.component";

import {CreateformComponent} from "../components/crud/Createform.component";
import {ReadformComponent} from "../components/crud/Readform.component";
import {DeleteformComponent} from "../components/crud/Deleteform.component";
import {UpdateformComponent} from "../components/crud/Updateform.component";
import {AllinoneComponent} from "../components/crud/allinone.component";
import {UpdatemodalComponent} from "../components/crud/Updatemodal.component";


import {DeleteFilesComponent} from "../components/fs/delete-files.component";
import {FullFsComponent} from "../components/fs/full-fs.component";
import {UploadFilesComponent} from "../components/fs/upload-files.component";
import {UpdateFilesComponent} from "../components/fs/Update-files.component";
import {ViewFilesComponent} from "../components/fs/view-files.component";

import {CrudService} from "../services/crud.service";



// enableProdMode();



@NgModule({
    imports: [BrowserModule,
    		  HttpModule,
    		  FormsModule,
              routing, 
              RouterModule,
    		  ReactiveFormsModule],
  declarations: [
        AppMainComponent,
       DeskboardComponent,

       SidebarComponent,
       NavbarComponent,
       FooterComponent,
       ThemeComponent,

       CreateformComponent,
       ReadformComponent,
       DeleteformComponent,
       UpdateformComponent,
       UpdatemodalComponent,
       AllinoneComponent,

       DeleteFilesComponent,
       FullFsComponent,
       UploadFilesComponent,
       UpdateFilesComponent,
       ViewFilesComponent


        ],
  providers:[
      CrudService,
      {provide: LocationStrategy, useClass: HashLocationStrategy}

  ],
    bootstrap: [AppMainComponent]
})

export class AppModule {}