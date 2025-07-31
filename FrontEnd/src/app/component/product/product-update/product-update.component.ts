import { Component } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FornecedorService } from '../../fornecedor/fornecedor.service';
import { Fornecedor } from '../../fornecedor/fornecedor.model';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent {
  product!: Product;
  fornecedores: Fornecedor[] = []; 

  constructor(private productService: ProductService,
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

  updateProduct(): void {
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage('Produto atualizado com sucesso!')
      this.router.navigate(['/products'])
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
