import { AfterViewInit, Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-categories',
  standalone: false,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate__animated', 'animate__zoomIn');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const mainDiv = this.el.nativeElement.querySelector('.main');
    if (mainDiv) {
      observer.observe(mainDiv);
    }
  }
}
