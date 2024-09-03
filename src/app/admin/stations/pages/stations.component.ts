import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StationMapComponent } from '../components/station-map/station-map.component';
import { StationFormComponent } from '../components/station-form/station-form.component';
import { StationListComponent } from '../components/station-list/station-list.component';

@Component({
  selector: 'app-stations',
  standalone: true,
  imports: [CommonModule, StationMapComponent, StationFormComponent, StationListComponent],
  templateUrl: './stations.component.html',
  styleUrl: './stations.component.scss'
})
export class StationsComponent {}
