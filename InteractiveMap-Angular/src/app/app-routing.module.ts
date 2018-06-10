import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoogleMapComponent } from './google-map/google-map.component';
import { SegmentComponent } from './segment/segment.component';
import { environment } from '../environments/environment';
const routes: Routes = [
  { path: '', component: GoogleMapComponent },
  { path: 'segments/alljson', component: SegmentComponent },
  { path: 'segments', component: SegmentComponent },
  { path: 'http://rsikora.eu-west-1.elasticbeanstalk.com/segments/:id', component: SegmentComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
