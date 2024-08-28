import { Component, OnInit } from '@angular/core';
import { StationService } from 'admin/services/station.service';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrl: './stations.component.scss'
})
export class StationsComponent implements OnInit {
  constructor(private stationService: StationService) {}

  //TODO: to be removed
  ngOnInit(): void {
    this.stationService.signupAdmin().subscribe({
      next: (res) => {
        if (res.token) this.stationService.token = res.token;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
