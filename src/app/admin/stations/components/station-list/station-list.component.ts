import { Component, OnInit } from '@angular/core';
import { StationsService } from '../../services/stations.service';
import { Station } from '../../model/station.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-station-list',
  standalone: true,
  imports: [CommonModule, MatPaginator, MatIcon, MatProgressSpinner],
  templateUrl: './station-list.component.html'
})
export class StationListComponent implements OnInit {
  stations: Station[] = [];

  paginatedStations: Station[] = [];

  pageSize = 10;

  totalPages = 1;

  constructor(
    private stationService: StationsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadStations();
  }

  loadStations() {
    this.stationService.getStations().subscribe((stations) => {
      this.stations = stations;
      this.totalPages = Math.ceil(this.stations.length / this.pageSize);
      this.paginatedStations = this.stations.slice(0, this.pageSize);
    });
  }

  updatePaginatedStations(e: PageEvent) {
    const startIndex = e.pageIndex * e.pageSize;
    const endIndex = startIndex + e.pageSize;
    this.paginatedStations = this.stations.slice(startIndex, endIndex);
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
        this.handleError(error);
        console.error('Error deleting station:', error);
      }
    });
  }

  handleError(err: { reason?: string; errorMessage?: string }) {
    if (err.reason && err.reason === 'recordInUse') {
      this.snackBar.open('Cannot delete station with active rides', 'close', { duration: 3000 });
    } else {
      this.snackBar.open(err.errorMessage || 'Error deleting station', 'close', { duration: 3000 });
    }
  }
}
