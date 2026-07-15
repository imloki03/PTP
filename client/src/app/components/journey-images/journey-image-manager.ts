import {Component, input, output} from '@angular/core';
import type {JourneyImageItem} from '../../models/journey-image-item';

@Component({
  selector: 'app-journey-image-manager',
  templateUrl: './journey-image-manager.html',
  styleUrls: ['./journey-images.css'],
})
export class JourneyImageManager {
  readonly images = input<JourneyImageItem[]>([]);
  readonly focusedImageId = input<string | null>(null);
  readonly disabled = input(false);

  readonly filesSelected = output<File[]>();
  readonly focusImage = output<string>();
  readonly requestDelete = output<string>();

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.filesSelected.emit(Array.from(input.files));
      input.value = '';
    }
  }
}
