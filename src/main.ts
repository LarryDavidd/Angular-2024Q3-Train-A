import { startServer } from '@planess/train-a-backend';
import { AppComponent } from './app/app.component';
import { appConfig } from 'app.config';
import { bootstrapApplication } from '@angular/platform-browser';

startServer()
  .then(() => bootstrapApplication(AppComponent, appConfig))
  // eslint-disable-next-line no-console
  .catch((err) => console.error(err));
