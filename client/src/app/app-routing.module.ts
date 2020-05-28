import { ProfileComponent } from './components/user/profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/admin/courses/courses.component';
import { CourseDetailComponent } from './components/admin/courses/course-detail/course-detail.component';
import { AdministratorsComponent } from './components/admin/administrators/administrators.component';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] },
  { path: 'course/:id', component: CourseDetailComponent, canActivate: [AuthGuard] },
  { path: 'administrator', component: AdministratorsComponent, canActivate: [AdminGuard] },
  // { path: 'administrator', component: AdministratorsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
