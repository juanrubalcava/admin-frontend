import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Pipes
import { PipesModule } from '../pipes/pipes.module';
import { NoWhitespacesDirective } from './directives/no-whitespaces.directive';
import { FormControlMessageComponent } from './form-control-message/form-control-message.component';
import { InputMessageComponent } from './input-message/input-message.component';



@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ],
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumsComponent,
        NopagefoundComponent,
        FormControlMessageComponent,
        InputMessageComponent,
        NoWhitespacesDirective
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumsComponent,
        NopagefoundComponent,
        FormControlMessageComponent,
        InputMessageComponent,
        NoWhitespacesDirective
    ]

})

export class SharedModule { }
