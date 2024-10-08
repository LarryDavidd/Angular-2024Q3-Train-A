import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { JsonPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { SearchFormComponent } from '../../components/search-form/search-form.component';
import { SearchFilterComponent } from '../../components/search-filter/search-filter.component';
import { ResultListComponent } from '../../components/result-list/result-list.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  imports: [JsonPipe, MatButton, SearchFormComponent, SearchFilterComponent, ResultListComponent],
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  constructor(protected http: HttpService) {}
}
