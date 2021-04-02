import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// FullCalendar Modules
import {FullCalendarModule} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timegrid from '@fullcalendar/timegrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import bootstrapPlugin from '@fullcalendar/bootstrap';

// Components
import {GeneralComponent} from './general/general.component';

// Modules
import {TranslateModule} from '@ngx-translate/core';
import {CalendarsRoutingModule} from './calendars-routing.module';
import {DropdownModule} from 'primeng/dropdown';


FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  timegrid,
  googleCalendarPlugin,
  bootstrapPlugin,
]);


@NgModule({
  declarations: [
    GeneralComponent],
  imports: [
    CommonModule,
    FullCalendarModule,
    CalendarsRoutingModule,
    TranslateModule,
    DropdownModule,
  ]
})
export class CalendarsModule {
}
