import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-new-collection',
  templateUrl: './new-collection.component.html',
  styleUrl: './new-collection.component.scss',
  standalone: false,
})
export class NewCollectionComponent {
  itemsPerSlide: number = 3;

  slides: any[] = [
    {
      image:
        'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
    },
    {
      image:
        'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
    },
    {
      image:
        'https://cdn.create.vista.com/api/media/small/145265777/stock-photo-close-up-of-a-tigers-face',
    },
    {
      image:
        'https://cdn.create.vista.com/api/media/small/145265777/stock-photo-close-up-of-a-tigers-face',
    },
    {
      image:
        'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
    },
    {
      image:
        'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
    },
    {
      image:
        'https://cdn.create.vista.com/api/media/small/145265777/stock-photo-close-up-of-a-tigers-face',
    },
    {
      image:
        'https://cdn.create.vista.com/api/media/small/145265777/stock-photo-close-up-of-a-tigers-face',
    },
    {
      image:
        'https://cdn.create.vista.com/api/media/small/145265777/stock-photo-close-up-of-a-tigers-face',
    },
  ];
}
