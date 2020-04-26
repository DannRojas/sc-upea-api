import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/admin/courses/courses.component';
import { CourseDetailComponent } from './components/admin/courses/course-detail/course-detail.component';
import { AdministratorsComponent } from './components/admin/administrators/administrators.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'course/:id', component: CourseDetailComponent },
  { path: 'administrator', component: AdministratorsComponent },
  // { path: 'administrator', component: AdministratorsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
