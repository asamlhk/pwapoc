import { Component } from '@angular/core';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';

import { NgxPicaService } from '@digitalascetic/ngx-pica';
import { ProfitBarAnimationChartService } from '../../../@core/mock/profit-bar-animation-chart.service';
import { resolve } from 'path';

@Component({
  selector: 'ngx-buttons',
  styleUrls: ['./buttons.component.scss'],
  templateUrl: './buttons.component.html',
})
export class ButtonsComponent {
  pdfSrc = "/assets/19pages.pdf";
  showall = false;
  constructor(private _ngxPicaService: NgxPicaService) {

  }
  dataURLtoFile(dataurl, filename) {

    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  printCanvas(dataUrl) {
    var windowContent = '<!DOCTYPE html>';
    windowContent += '<html>'
    windowContent += '<head><title>Print canvas</title></head>';
    windowContent += '<body>'
    windowContent += '<img src="' + dataUrl + '">';
    windowContent += '</body>';
    windowContent += '</html>';
    var printWin = window.open('', '', 'width=340,height=260');
    printWin.document.open();
    printWin.document.write(windowContent);
    printWin.document.close();
    printWin.focus();

  }


  print(): Promise<any> {
    const canvases = document.getElementsByTagName("canvas");
    let html;
    let ImagesResized: File[] = [];

    let files = Array.from(canvases).map(
      c => this.dataURLtoFile(c.toDataURL(), "dummy")
    )
    const w = Array.from(canvases)[0].width;
    const h = Array.from(canvases)[0].height;

    //files = files.filter((f, i) =>
    // i < 5
    //)

    return new Promise(resolve => {

      this._ngxPicaService.resizeImages(files, w / 2, h / 2).subscribe(
        imageResized => {
          console.log('converting')

          ImagesResized.push(imageResized);

          if (ImagesResized.length == files.length) {
            let html = "";
            ImagesResized.map(
              f => {
                html += "<image src='" + URL.createObjectURL(f) + "'>"
              }
            )
            console.log('doen')
            resolve(html)
          }
        }
      )
    });
  }

  printPDF() {
    this.showall = true;
    setTimeout(
      () => {
        this.print().then(
          html => {
            this.printElem(html);
    
          }
        )
      }, 8000
    )


  }


  printElem(html) {
    console.log(html)
    var mywindow = window.open('', 'Print', 'height=600,width=800');

    mywindow.document.write('<html><head><title>Print</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write(html);
    mywindow.document.write('</body></html>');


    mywindow.focus();
    setTimeout(
      () => {
        mywindow.print();
        mywindow.close();
        this.showall = false;
      }

      , 1000
    )

    return true;
  }
}
