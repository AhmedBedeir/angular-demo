import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductComponent } from "../product/product.component";
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../loading/loading.component";
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent, CommonModule, LoadingComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] | null = null;
  selectedCategory: string = 'all';
  isLoading: boolean = false;
  title: string = 'Products List';
  categoryTaps: string[] = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
];
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        console.log('Products fetched:', products);
        this.products = products;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.isLoading = false;
      },
      complete: () => {
        console.log('Products fetched successfully');
      }
    });
  }

  getProductsByCategory(category: string): void {
    this.isLoading = true;
    this.selectedCategory = category;
    this.title = `Products in ${category.charAt(0).toUpperCase() + category.slice(1)}`;

    if (category === 'all') {
      this.getProducts();
      this.title = 'Products List';
      this.isLoading = false;
      return;
    }

    this.productService.getProductsByCategory(category).subscribe({
      next: (products) => {
        console.log(`Products for category ${category} fetched:`, products);
        this.products = products;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(`Error fetching products for category ${category}:`, err);
        this.isLoading = false;
      },
      complete: () => {
        console.log(`Products for category ${category} fetched successfully`);
      }
    });
  }

  onCategorySelect(category: string): void {
    this.getProductsByCategory(category);
  }
}
