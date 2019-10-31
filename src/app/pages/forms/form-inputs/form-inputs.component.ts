import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import { ConnectionService } from 'ng-connection-service';
import { ToasterConfig } from 'angular2-toaster';
import { Guid } from "guid-typescript";

import 'style-loader!angular2-toaster/toaster.css';
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./form-inputs.component.scss'],
  templateUrl: './form-inputs.component.html',
})
export class FormInputsComponent {
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  starRate = 2;
  heartRate = 4;
  radioGroupValue = 'This is value 2';
  userInput = {
    id: Guid.create().toString(),
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    username: ''
  }
  isConnected = true;
  constructor(private service: SmartTableData,
  private connSvc : ConnectionService,
  private toastrService: NbToastrService) {
    const data = this.service.getData();
    this.source.load(data);
    this.connSvc.monitor().subscribe(
      isConn => {
        this.isConnected = isConn;
        this.showToast( 
          this.status,
          'connection Status Changed',
          this.isConnected ? 'Online' : 'Offline'
        )
 
      }
    )
  }

  Save() {
    console.log(this.userInput)
    this.service.saveData(
      this.userInput
    )
    const data = this.service.getData();
    this.source.load(data);
    this.userInput = {
      id: Guid.create().toString(),
      firstName: '',
      lastName: '',
      age: '',
      email: '',
      username: ''
    };
  }

  onDeleteConfirm(event): void {
   
    if (window.confirm('Are you sure you want to delete?')) {
      this.service.delete(event.data.id);
      const data = this.service.getData();
      this.source.load(data);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = false;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.BOTTOM_RIGHT;
  preventDuplicates = true;
  status: NbComponentStatus = 'primary';

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `. ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `Toast ${this.index}${titleContent}`,
      config);
  }
}
