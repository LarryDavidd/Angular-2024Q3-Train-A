import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ride } from 'admin/ride/redux/models/ride.models';
import * as RideActions from 'admin/ride/redux/actions/ride.actions';
import { selectRide, selectRidesLoadingStatus } from 'admin/ride/redux/selectors/ride.selectors';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RideCardComponent } from '../ride-card/ride-card.component';

@Component({
  selector: 'app-ride-list',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, RideCardComponent],
  templateUrl: './ride-list.component.html',
  styleUrl: './ride-list.component.scss'
})
export class RideListComponent implements OnInit {
  store = inject(Store);

  private route = inject(ActivatedRoute);

  rides$: Observable<Ride | null> = this.store.select(selectRide);

  isLoading$: Observable<boolean> = this.store.select(selectRidesLoadingStatus);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log(id);
      if (id) {
        this.store.dispatch(RideActions.retrieveRide({ id }));
      }
    });
  }
}
