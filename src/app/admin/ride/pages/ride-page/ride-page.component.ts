import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as RideActions from 'admin/ride/redux/actions/ride.actions';
import { selectRide, selectRidesLoadingStatus } from 'admin/ride/redux/selectors/ride.selectors';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Ride } from 'admin/ride/model/ride.model';
import { RideListComponent } from '../../components/ride-list/ride-list.component';

@Component({
  selector: 'app-ride-page',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, RideListComponent],
  templateUrl: './ride-page.component.html',
  styleUrl: './ride-page.component.scss'
})
export class RidePageComponent implements OnInit {
  store = inject(Store);

  private route = inject(ActivatedRoute);

  rides$: Observable<Ride | null> = this.store.select(selectRide);

  isLoading$: Observable<boolean> = this.store.select(selectRidesLoadingStatus);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.store.dispatch(RideActions.retrieveRide({ id }));
      }
    });
  }
}
