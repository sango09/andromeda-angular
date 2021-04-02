import {Component, OnInit} from '@angular/core';
import {AssistantsService} from '../../../../core/services/assistants/assistants.service';
import {AssistantsModel} from '../../../../core/modules/assistants';

@Component({
  selector: 'app-assistants',
  templateUrl: './assistants.component.html',
  styleUrls: ['../../../../../assets/css/dashboard/dashboard.css'],
})
export class AssistantsComponent implements OnInit {

  assistants: AssistantsModel[] = [];
  loading = true;

  constructor(
    private assistantsService: AssistantsService,
  ) {
  }

  ngOnInit(): void {
    this.fetchAssistants();
  }

  fetchAssistants() {
    this.assistantsService.getAllAssistants()
      .subscribe(res => {
        this.assistants = res;
        this.loading = false;
      }, error => console.error(error));
  }

}
