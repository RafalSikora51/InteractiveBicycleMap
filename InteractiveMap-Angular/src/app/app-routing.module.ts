import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoogleMapComponent } from './google-map/google-map.component';
import { SegmentComponent } from './segment/segment.component';

const routes: Routes = [
  { path: '', component: GoogleMapComponent },
  { path: 'segments/alljson', component: SegmentComponent },
  { path: 'segments', component: SegmentComponent },
  { path: 'localhost:4200/segments/:id', component: SegmentComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
