import { Component, OnInit } from '@angular/core';
import { StationService } from 'admin/services/station.service';
import { Station } from 'admin/models/stations.model';

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html'
})
export class StationListComponent implements OnInit {
  stations: Station[] = [];

  paginatedStations: Station[] = [];

  currentPage = 1;

  pageSize = 10;

  totalPages = 1;

  constructor(private stationService: StationService) {}

  ngOnInit(): void {
    this.loadStations();
  }

  loadStations() {
    this.stationService.getStations().subscribe((stations) => {
      this.stations = stations;
      this.totalPages = Math.ceil(this.stations.length / this.pageSize);
      this.updatePaginatedStations();
    });
  }

  updatePaginatedStations() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedStations = this.stations.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedStations();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedStations();
    }
  }

  getStationName(id: number) {
    return this.stations.find((station) => station.id === id)?.city;
  }

  deleteStation(id: number) {
    this.stationService.deleteStation(id).subscribe({
      next: () => {
        this.loadStations();
      },
      error: (error) => {
        console.error('Error deleting station:', error);
      }
    });
  }
}
