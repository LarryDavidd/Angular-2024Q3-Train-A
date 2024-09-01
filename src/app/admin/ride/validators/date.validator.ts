import { FormControl } from '@angular/forms';

export const DateValidator = (control: FormControl): { [key: string]: string } | null => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDate = new Date(control.value);

  if (selectedDate < today) {
    return {
      date: 'The date is invalid'
    };
  }

  return null;
};
