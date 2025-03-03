import { Component } from '@angular/core';

@Component({
  selector: 'app-detail',
  standalone: false,
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  selectedIndex = 0;

  productImages = [
    {
      image:
        'https://cdn.dsmcdn.com/ty1549/product/media/images/ty1549/prod/QC/20240916/20/8ebd2c22-cd7b-33ff-be16-c57bf1498654/1_org_zoom.jpg',
    },
    {
      image:
        'https://cdn.dsmcdn.com/ty1550/product/media/images/ty1549/prod/QC/20240916/20/44a5cfa3-676c-3d12-9a6b-4361202b8206/1_org_zoom.jpg',
    },
    {
      image:
        'https://cdn.dsmcdn.com/ty1556/product/media/images/ty1556/prod/QC/20240918/09/fe79a250-c0e4-3572-8ac0-28fa2c926a61/1_org_zoom.jpg',
    },
    {
      image:
        'https://cdn.dsmcdn.com/ty1618/prod/QC/20241224/17/c8be8154-3b16-3fed-9d8d-be2a856a4dc0/1_org_zoom.jpg',
    },
  ];

  changeMainImage(index: number) {
    this.selectedIndex = index;
  }

  nextImage() {
    this.productImages.length - 1 > this.selectedIndex
      ? this.selectedIndex++
      : (this.selectedIndex = 0);
  }

  prevImage() {
    this.selectedIndex =
      this.selectedIndex === 0
        ? this.productImages.length - 1
        : this.selectedIndex - 1;
  }
}
