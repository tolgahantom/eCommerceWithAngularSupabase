import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: false,
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Input() isEditable: boolean = true;
  @Output() ratingChange = new EventEmitter<number>();

  hoverIndex: number = 0;

  setRating(value: number) {
    if (this.isEditable) {
      this.rating = value;
      this.ratingChange.emit(value);
    }
  }

  setHover(value: number) {
    if (this.isEditable) {
      this.hoverIndex = value;
    }
  }

  clearHover() {
    if (this.isEditable) {
      this.hoverIndex = 0;
    }
  }
}
