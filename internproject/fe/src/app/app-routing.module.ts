import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepgComponent } from './login/homepg/homepg.component';
// import { AdlogComponent } from './login/adlogpg/adlog/adlog.component';
import { EmphomeComponent } from './emppg/emphome/emphome.component';
import { DashboardComponent } from './emppg/dashboard/dashboard/dashboard.component';
import { EmployeesComponent } from './emppg/employees/employees.component';
import { AddempComponent } from './emppg/addemp/addemp/addemp.component';
import { LogoutComponent } from './logout/logout/logout.component';
import { PayComponent } from './pay/pay.component';


const routes: Routes = [
  { path: '', component: HomepgComponent },
  {
    path: 'user/:id',
    component: EmphomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'emps', component: EmployeesComponent },
      { path: 'addemp', component: AddempComponent },
      { path: 'pay', component:PayComponent},
      { path: 'logout', component: LogoutComponent },


    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
