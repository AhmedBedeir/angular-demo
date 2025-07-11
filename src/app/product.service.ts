import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  _httpClient = inject(HttpClient);
  private productsUrl = 'https://dummyjson.com/products';
  constructor() { }

  getProducts(): Observable<Product[]> {
    return this._httpClient.get<{products: Product[]}>(this.productsUrl).pipe(
      map(response => response.products.map(product => ({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        category: product.category
      })))
    );
  }
  getProductById(id: string): Observable<Product> {
    return this._httpClient.get<Product>(`${this.productsUrl}/${id}`).pipe(
      map(product => ({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        category: product.category,
        description: product.description,
        images: product.images,
        stock: product.stock,
        discountPercentage: product.discountPercentage,
        reviews: product.reviews
      }))
    );
  }
  getProductsByCategory(category: string): Observable<Product[]> {
    return this._httpClient.get<{products: Product[]}>(`${this.productsUrl}/category/${category}`).pipe(
      map(products => products.products.map(product => ({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        category: product.category
      })))
    );
  }
}
