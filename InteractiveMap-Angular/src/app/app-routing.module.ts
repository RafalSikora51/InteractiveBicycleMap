import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoogleMapComponent } from './google-map/google-map.component';
import { SegmentComponent } from './segment/segment.component';

const routes: Routes = [
  { path: '', component: GoogleMapComponent },
  { path: 'segments', component: SegmentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
