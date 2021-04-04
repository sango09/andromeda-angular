import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  informationSection = [

    {
      'title': 'Gestión óptima del sistema',
      'img': 'programming.png',
      'text': 'Administra todos los reportes, solicitudes y personal fácilmente',
      'order-1': '',
      'order-2': '',
      'list':
        [
          {'text': 'Utiliza el dashboard en cualquier dispositivo.'},
          {'text': 'Calendario completamente sincronizado con Google Calendar.'},
          {'text': 'Calificación de los usuarios.'},
          {'text': 'Completo control del personal técnico.'},
        ]

    },
    {
      'title': 'Reportes en tiempo real',
      'img': 'data.png',
      'text': 'Los informes generados por Andromeda permiten dar seguimiento al desempeño del personal, la satisfacción de los usuarios e identificar las principales fallas de los servicios.',
      'order-1': 'order-1 order-md-2 ',
      'order-2': 'order-2 order-md-1',
    },
    {
      'title': 'Gestión de activos',
      'img': 'team.png',
      'text': 'Gestione todos sus activos de TI bajo un mismo sistema sin dificultades.',
      'order-1': '',
      'order-2': '',
      'list':
        [
          {'text': 'Gestione sus activos con nuestro dashboard de forma intuitiva y segura.'},
          {'text': 'Integración con Amazon Web Services.'},
          {'text': 'Supervisé todos los movimientos de sus activos.'},
        ]
    },
    {
      'title': 'Gestión de Tickets',
      'img': 'mobile.png',
      'text': 'Andromeda transforma automáticamente todas las solicitudes de sus usuarios en tickets, y de ésta forma darle seguimiento a las solicitudes de forma rápida y sencilla.',
      'order-1': 'order-1 order-md-2 ',
      'order-2': 'order-2 order-md-1',
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.informationSection);
  }

}
