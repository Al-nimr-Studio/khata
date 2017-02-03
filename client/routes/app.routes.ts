import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {DeskboardComponent} from "../components/deskboard.component";
import {AppMainComponent} from "../components/app-main.component";

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


const AppRoutes:Routes = [
 {path:'', redirectTo:'/deskboard',pathMatch:'full'},
    {path:'deskboard',component: DeskboardComponent},

    {path:'createform',component: CreateformComponent},
    {path:'update/:id',component: UpdatemodalComponent},
    {path:'update',component: UpdatemodalComponent},
    {path:'readform',component: ReadformComponent},
    {path:'deleteform',component: DeleteformComponent},
    {path:'allinone',component: AllinoneComponent},
    {path:'updateform',component: UpdateformComponent},

    {path:'deletefiles',component: DeleteFilesComponent},
    {path:'fullfs',component: FullFsComponent},
    {path:'uploadfiles',component: UploadFilesComponent},
    {path:'updatefiles',component: UpdateFilesComponent},
    {path:'viewfiles',component: ViewFilesComponent}
    
];

export const routing:ModuleWithProviders = RouterModule.forRoot(AppRoutes);
