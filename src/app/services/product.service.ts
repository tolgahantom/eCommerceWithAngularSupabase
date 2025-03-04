import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  ProductList = [
    {
      id: '1',
      name: 'Apple iPhone 15 Pro',
      description: 'Powerful smartphone with A17 Pro chip and titanium design.',
      price: 1299,
      stock: 50,
      categoryId: 'smartphones',
      images: [
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_120141353?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402',
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_120141256?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402',
      ],
      discount: 5,
      rating: 2.5,
    },
    {
      id: '2',
      name: 'Samsung Galaxy S24 Ultra',
      description: 'Flagship Android smartphone with S Pen and 200MP camera.',
      price: 1399,
      stock: 40,
      categoryId: 'smartphones',
      images: [
        'https://example.com/galaxys24ultra_1.jpg',
        'https://example.com/galaxys24ultra_2.jpg',
      ],
      discount: 10,
      rating: 4.7,
    },
    {
      id: '3',
      name: 'Asus ROG Strix RTX 4090',
      description: 'High-end gaming graphics card with 24GB GDDR6X memory.',
      price: 1999,
      stock: 25,
      categoryId: 'graphics-cards',
      images: [
        'https://example.com/rogstrix4090_1.jpg',
        'https://example.com/rogstrix4090_2.jpg',
      ],
      discount: 0,
      rating: 4.9,
    },
    {
      id: '4',
      name: 'Sony PlayStation 5',
      description:
        'Next-gen gaming console with ultra-fast SSD and ray tracing support.',
      price: 499,
      stock: 60,
      categoryId: 'gaming-consoles',
      images: ['https://example.com/ps5_1.jpg'],
      discount: 0,
      rating: 4.9,
    },
    {
      id: '5',
      name: 'Apple MacBook Air M2',
      description: 'Ultra-thin laptop with M2 chip and Liquid Retina display.',
      price: 1199,
      stock: 30,
      categoryId: 'laptops',
      images: [
        'https://example.com/macbookairm2_1.jpg',
        'https://example.com/macbookairm2_2.jpg',
      ],
      discount: 5,
      rating: 4.8,
    },
    {
      id: '6',
      name: 'Dell XPS 15',
      description: 'Premium 15-inch laptop with 4K display and Intel Core i9.',
      price: 1799,
      stock: 20,
      categoryId: 'laptops',
      images: ['https://example.com/dellxps15_1.jpg'],
      discount: 8,
      rating: 4.7,
    },
    {
      id: '7',
      name: 'Bose QuietComfort 45',
      description:
        'Noise-canceling wireless headphones with long battery life.',
      price: 349,
      stock: 100,
      categoryId: 'headphones',
      images: ['https://example.com/boseqc45_1.jpg'],
      discount: 10,
      rating: 4.7,
    },
    {
      id: '8',
      name: 'Sony WH-1000XM5',
      description:
        'Industry-leading noise-canceling headphones with high-resolution audio.',
      price: 399,
      stock: 80,
      categoryId: 'headphones',
      images: ['https://example.com/sonywh1000xm5_1.jpg'],
      discount: 5,
      rating: 4.8,
    },
    {
      id: '9',
      name: 'GoPro Hero 12',
      description: 'Rugged 5K action camera with HyperSmooth stabilization.',
      price: 499,
      stock: 35,
      categoryId: 'cameras',
      images: [
        'https://example.com/goprohero12_1.jpg',
        'https://example.com/goprohero12_2.jpg',
      ],
      discount: 7,
      rating: 4.6,
    },
    {
      id: '10',
      name: 'Canon EOS R6 Mark II',
      description:
        'Full-frame mirrorless camera with 24MP sensor and 4K video.',
      price: 2499,
      stock: 15,
      categoryId: 'cameras',
      images: ['https://example.com/canoneosr6mkii_1.jpg'],
      discount: 5,
      rating: 4.9,
    },
    {
      id: '11',
      name: 'Samsung 55" OLED TV',
      description: '4K OLED TV with Quantum HDR and 120Hz refresh rate.',
      price: 1499,
      stock: 45,
      categoryId: 'televisions',
      images: ['https://example.com/samsung55oled_1.jpg'],
      discount: 12,
      rating: 4.7,
    },
    {
      id: '12',
      name: 'Dyson V15 Detect',
      description:
        'High-performance cordless vacuum with laser dust detection.',
      price: 699,
      stock: 25,
      categoryId: 'home-appliances',
      images: ['https://example.com/dysonv15detect_1.jpg'],
      discount: 10,
      rating: 4.8,
    },
    {
      id: '13',
      name: 'Nintendo Switch OLED',
      description: 'Portable gaming console with a vibrant OLED display.',
      price: 349,
      stock: 50,
      categoryId: 'gaming-consoles',
      images: ['https://example.com/switcholed_1.jpg'],
      discount: 5,
      rating: 4.8,
    },
    {
      id: '14',
      name: 'Logitech MX Master 3S',
      description:
        'Advanced wireless mouse with customizable buttons and precision tracking.',
      price: 99,
      stock: 200,
      categoryId: 'computer-accessories',
      images: ['https://example.com/mxmaster3s_1.jpg'],
      discount: 5,
      rating: 4.9,
    },
    {
      id: '15',
      name: 'Razer BlackWidow V4',
      description: 'Mechanical gaming keyboard with Razer Green switches.',
      price: 169,
      stock: 75,
      categoryId: 'computer-accessories',
      images: [
        'https://example.com/blackwidowv4_1.jpg',
        'https://example.com/blackwidowv4_2.jpg',
      ],
      discount: 10,
      rating: 4.8,
    },
  ];

  constructor() {}

  getAllProduct(page: number, productsPerPage: number) {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage - 1;

    return this.ProductList.slice(startIndex, endIndex);
  }

  getProductById(id: string) {
    return this.ProductList[+id - 1];
  }

  getBlogCount() {
    return this.ProductList.length;
  }
}
