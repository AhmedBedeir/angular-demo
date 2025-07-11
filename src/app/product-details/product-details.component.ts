import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly titleService = inject(Title);
  private readonly route = inject(ActivatedRoute);

  product: Product | null = null;
  productId: string = '';
  errorMessage: string = '';
  ngOnInit(): void {
    this.loadProductDetails();
  }

  loadProductDetails(): void {
   this.route.params.subscribe(params => {
      this.productId = params['productId'];
      this.productService.getProductById(this.productId).subscribe({
        next: (product) => {
          this.product = product;
          console.log(product)
          this.titleService.setTitle(`Product Details - ${product.title}`);
        },
        error: (err) => {
          console.error('Error fetching product details:', err);
          if (err.status === 404) {
            this.errorMessage = 'Product not found';
          }
          else {
            this.errorMessage = 'An error occurred while fetching product details';
          }
        },
      });
   })
  }

}
