import { Injectable } from '@angular/core';
import { SmartTableData } from '../data/smart-table';

@Injectable()
export class SmartTableService extends SmartTableData {

  data = [

  ];

  saveData(obj) {
    this.data.push(obj);
    localStorage.setItem('ePOS_Data', JSON.stringify(this.data));
  }
  
  delete(id) {
    this.data = this.data.filter(
      d => d.id != id
    )
    localStorage.setItem('ePOS_Data', JSON.stringify(this.data));
  }

  getData() {
    if (this.data && this.data.length == 0) {
      let data = localStorage.getItem('ePOS_Data');
      if(data) {
        this.data = JSON.parse(localStorage.getItem('ePOS_Data'));
      }
 
    }
    return this.data;
  }
}
