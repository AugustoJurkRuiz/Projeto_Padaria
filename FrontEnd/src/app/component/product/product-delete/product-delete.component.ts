import { Component } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FornecedorService } from '../../fornecedor/fornecedor.service';
import { Fornecedor } from '../../fornecedor/fornecedor.model';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent {
  product!: Product;
  fornecedores: Fornecedor[] = [];


  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private fornecedorService: FornecedorService) { }

  ngOnInit(): void {
    this.fornecedorService.readFornecedor().subscribe((fornecedores: Fornecedor[]) => {
      this.fornecedores = fornecedores;
    });
    const proId = this.route.snapshot.paramMap.get('proId');
    this.productService.readById(proId!).subscribe(product => {
      // Converte se ainda estiver como string
      if (typeof product.proAtivo === 'string') {
        product.proAtivo = product.proAtivo === 'true';
      }
      this.product = product;
    });
  }

  deleteProduct(): void {
    this.productService.delete(this.product.proId!).subscribe(() => {
      this.productService.showMessage('Produto excluido com sucesso!')
      this.router.navigate(['/products'])
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
