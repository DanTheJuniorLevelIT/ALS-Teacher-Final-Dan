import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { homeRoute } from './Modules/Home/home.routes';
import { subjectRoute } from './Modules/Subject/subject.routes';
import { messageRoute } from './Modules/Message/message.routes';
import { accountRoute } from './Modules/Account/account.routes';
import { authGuard } from './auth.guard';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'forgotpassword', component: ForgotpasswordComponent},
    {path: 'main', component: MainComponent, canActivate: [authGuard],
        children: [
            {
                path: 'Home',
                loadChildren: () => import('./Modules/Home/home.routes').then(r=>homeRoute),
                canActivate: [authGuard]
            },
            {
                path: 'Subject',
                loadChildren: () => import('./Modules/Subject/subject.routes').then(r=>subjectRoute),
                canActivate: [authGuard]
            },
            {
                path: 'Message',
                loadChildren: () => import('./Modules/Message/message.routes').then(r=>messageRoute),
                canActivate: [authGuard]
            },
            {
                path: 'Account',
                loadChildren: () => import('./Modules/Account/account.routes').then(r=>accountRoute),
                canActivate: [authGuard]
            },
            {path: '', redirectTo: 'Home', pathMatch: 'full'}
        ]
    },
    {path: '', redirectTo: 'login', pathMatch: 'full'}
];

