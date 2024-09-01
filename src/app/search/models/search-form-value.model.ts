export interface SearchFormValueModel {
  cityFrom: {
    city: string;
    latitude: number;
    longitude: number;
  };
  cityTo: {
    city: string;
    latitude: number;
    longitude: number;
  };
  startDate?: Date;
}
