import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomepgComponent } from './login/homepg/homepg.component';
// import { AdlogComponent } from './login/adlogpg/adlog/adlog.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginserviceService } from './login/services/loginservice.service';
import { EmphomeComponent } from './emppg/emphome/emphome.component';
import { DashboardComponent } from './emppg/dashboard/dashboard/dashboard.component';
import { UserserviceService } from './login/loginservies/userservice.service';
import { EmployeesComponent } from './emppg/employees/employees.component';
import { EmpdialogComponent } from './emppg/empdialog/empdialog.component';
import { EditdialogComponent } from './emppg/editdialog/editdialog/editdialog.component';
import { DeletedialComponent } from './emppg/deletedialog/deletedial/deletedial.component';
import { AddempComponent } from './emppg/addemp/addemp/addemp.component';
import { LogoutComponent } from './logout/logout/logout.component';
// import { AdminloginComponent } from './login/adminlogin/adminlogin.component';
import { SignuppgComponent } from './login/signup/signuppg/signuppg.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { SnackbarComponent } from './emppg/addemp/snackbar/snackbar.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HomepgComponent,
    // AdlogComponent,
    EmphomeComponent,
    DashboardComponent,
    EmployeesComponent,
    EmpdialogComponent,
    EditdialogComponent,
    DeletedialComponent,
    AddempComponent,
    LogoutComponent,
    // AdminloginComponent,
    SignuppgComponent,
    SearchFilterPipe,
    SnackbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [LoginserviceService, UserserviceService, AuthGuard, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
