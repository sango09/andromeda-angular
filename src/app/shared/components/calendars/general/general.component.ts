import {Component, OnInit} from '@angular/core';
import {CalendarOptions} from '@fullcalendar/angular';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['../../../../../assets/css/dashboard/dashboard.css']
})
export class GeneralComponent implements OnInit {
  private calendarLoans = 'p0rnn4501mvji5jj7cr2j13ois@group.calendar.google.com';
  private calendarSupport = 'gdu032qshgiduem03a6n02dtmo@group.calendar.google.com';
  private calendarMaintenance = 'ouatutg6n3dtfli8eqrrdc09n0@group.calendar.google.com';
  calendarOptions: CalendarOptions;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  options: any[];

  constructor() {
  }

  ngOnInit(): void {
    this.calendarOptions = this.calendar(
      this.calendarLoans,
      this.calendarSupport
    );

    this.setCalendars();
  }

  setCalendars() {
    this.options = [
      {name: 'Calendario General', code: 'general'},
      {name: 'Prestamos Tecnologicos', code: 'prestamos'},
      {name: 'Soporte Técnico', code: 'soporte'},
    ];

    if (this.userInfo.is_admin || this.userInfo.is_assistant) {
      this.options.push(
        {name: 'Mantenimientos', code: 'mantenimiento'},
      );
    }
  }

  calendar(
    calendarOne = '',
    calendarTwo = '',
  ) {

    return {
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      initialView: 'dayGridMonth',
      expandRows: true,
      handleWindowResize: true,
      businessHours: true,
      dayMaxEventRows: true,
      navLinks: true,
      nowIndicator: true,
      timeZone: 'local',
      locale: 'es',
      selectable: true,
      selectMirror: true,
      buttonText: {
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Dia',
      },

      // Integration Google Calendar API
      googleCalendarApiKey: environment.PRIVATE_KEY,
      eventSources: [
        {
          googleCalendarId: calendarOne
        },
        {
          googleCalendarId: calendarTwo
        },
      ],
      eventClick(arg) {
        window.open(arg.event.url, '_blank', 'width=700,height=600');
        arg.jsEvent.preventDefault();
      }
    };
  }

  changeLocale(event: any) {
    let calendar = event.value.code;

    switch (calendar) {
      case 'prestamos': {
        this.calendarOptions = this.calendar(this.calendarLoans);
        break;
      }
      case 'soporte': {
        this.calendarOptions = this.calendar(this.calendarSupport);
        break;
      }
      case 'mantenimiento': {
        this.calendarOptions = this.calendar(this.calendarMaintenance);
        break;
      }
      default: {
        this.calendarOptions = this.calendar(
          this.calendarLoans,
          this.calendarSupport
        );
        break;
      }
    }
  }

}
