import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: async () => (await import('admin/admin.module')).AdminModule
  }
];
