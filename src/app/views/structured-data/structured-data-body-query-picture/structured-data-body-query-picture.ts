import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { wait } from 'src/app/tools/tools';
import { StructuredDataBodyQueryModel } from 'src/app/views/structured-data/structured-data-body-query/structured-data-body-query.model';

@Component({
  selector: 'app-structured-data-body-query-picture',
  templateUrl: './structured-data-body-query-picture.html',
  styleUrls: ['./structured-data-body-query-picture.less'],
})
export class StructuredDataBodyQueryPictureComponent
  implements OnInit, AfterViewInit
{
  @Input()
  models?: StructuredDataBodyQueryModel[];
  @Input()
  picture?: string;
  @Input()
  selected?: StructuredDataBodyQueryModel;

  @Output() closeEvent = new EventEmitter<StructuredDataBodyQueryModel>();
  constructor() {}

  @ViewChild('canvas')
  canvas?: ElementRef;
  @ViewChild('image')
  image?: ElementRef;

  ngOnInit(): void {
    if (this.models && this.models.length > 0) {
      if (!this.selected) {
        this.selected = this.models[0];
      }
    }
    console.log(this.models);
  }
  ngAfterViewInit(): void {
    if (this.canvas && this.image) {
      let image = this.image.nativeElement as HTMLImageElement;
      let canvas = this.canvas.nativeElement as HTMLCanvasElement;
      canvas.style.width = image.offsetWidth + 'px';
      canvas.style.height = image.offsetHeight + 'px';
      canvas.style.top = image.offsetTop + 'px';
      canvas.style.left = image.offsetLeft + 'px';
      canvas.width = image.offsetWidth;
      canvas.height = image.offsetHeight;
    }
  }
  close() {
    this.closeEvent.emit(this.selected);
  }

  onselectchanged(event: Event) {
    if (this.selected) {
      if (!this.selected.BodyRect) return;
      if (this.models) {
        this.drawBodyRect(this.models.indexOf(this.selected));
      }
    }
  }
  onimageload() {
    if (!this.selected || !this.selected.BodyRect) return;
    wait(
      () => {
        return !!(this.image && this.canvas);
      },
      () => {
        this.drawBodyRect();
      }
    );
  }

  drawBodyRect(index: number = 0) {
    if (this.image && this.canvas && this.selected) {
      let ctx = (this.canvas.nativeElement as HTMLCanvasElement).getContext(
        '2d'
      )!;
      let width = (this.canvas.nativeElement as HTMLCanvasElement).width;
      let height = (this.canvas.nativeElement as HTMLCanvasElement).height;
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.clearRect(0, 0, width, height);
      let rect = this.selected.BodyRect!;
      let x = rect.X * width;
      let y = rect.Y * height;
      ctx.strokeRect(x, y, rect.Width * width, rect.Height * height);
      ctx.fillStyle = 'rgba(255, 0,0, 0.2)';
      ctx.fillRect(x, y, rect.Width * width, rect.Height * height);

      ctx.font = '16px "Source Han Sans CN Normal"';
      ctx.lineWidth = 1;
      ctx.fillStyle = 'red';
      ctx.fillRect(x, y, 50, 30);
      ctx.fillStyle = 'white';
      ctx.fillText('目标' + (index + 1), x + 5, y + 20);
    }
  }
}
