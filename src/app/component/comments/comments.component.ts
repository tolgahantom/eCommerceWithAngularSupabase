import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  standalone: false,
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent implements OnInit {
  comments: any[] = [];
  newComment: string = '';
  productId: string | null = '';

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      if (this.productId) {
        this.loadComments(this.productId);
      }
    });
  }

  async loadComments(id: string | null) {
    if (id == null) return;

    this.productService.getComments(id).then((data) => {
      this.comments = data;
    });
  }

  async addComment() {
    const user = await firstValueFrom(this.authService.getUser());
    if (!user) {
      alert('Yorum yapabilmek için giriş yapmalısınız.');
      return;
    }

    if (!this.newComment.trim()) {
      alert('Yorum boş olamaz!');
      return;
    }

    if (this.productId == null) return;

    await this.productService.addComment(
      this.productId,
      user.id,
      this.newComment
    );
    this.newComment = '';
    this.loadComments(this.productId);
  }
}
