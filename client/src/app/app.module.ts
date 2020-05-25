import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { MaterialModule } from './material';

import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component'
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/profile/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CoursesComponent } from './components/admin/courses/courses.component';
import { AdministratorsComponent } from './components/admin/administrators/administrators.component';
import { CourseDetailComponent } from './components/admin/courses/course-detail/course-detail.component';
import { ModalAdminComponent } from './components/admin/administrators/modal-admin/modal-admin.component';
import { InscriptionModalComponent } from './components/inscription-modal/inscription-modal.component';
import { ConfirmModalComponent } from './components/admin/confirm-modal/confirm-modal.component';
import { ModalInscriptionComponent } from './components/admin/courses/modal-inscription/modal-inscription.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    NavigationComponent,
    CoursesComponent,
    AdministratorsComponent,
    CourseDetailComponent,
    ModalAdminComponent,
    InscriptionModalComponent,
    ConfirmModalComponent,
    ModalInscriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
