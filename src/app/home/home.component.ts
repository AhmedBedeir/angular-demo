import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CategoryComponent } from "../category/category.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategoryComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  currentSlide = 0;
  slides = [
    {
      src: 'https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Slide 1'
    },
    {
      src: 'https://images.unsplash.com/photo-1659353740113-2d76240c7a88?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Slide 2'
    },
    {
      src: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Slide 3'
    },
    {
      src: 'https://images.unsplash.com/photo-1634733988596-093e2a324c2f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Slide 4'
    }
  ];

  ngOnInit(): void {
    // Auto-slide every 5 seconds
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  ngAfterViewInit(): void {
    // Re-initialize Flowbite carousel after view is ready
    if (typeof window !== 'undefined' && (window as any).initFlowbite) {
      setTimeout(() => {
        (window as any).initFlowbite();
      }, 100);
    }
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }
}
