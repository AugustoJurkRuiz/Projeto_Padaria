import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../product/product.model';
import { ProductService } from '../../product/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Venda, Compra } from '../venda.model';
import { VendaService } from '../venda.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-venda-create',
  templateUrl: './venda-create.component.html',
  styleUrls: ['./venda-create.component.css']
})
export class VendaCreateComponent implements OnInit {

  vendaForm!: FormGroup;
  products: Product[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router,
    private vendaService: VendaService
  ) {}

  ngOnInit(): void {
    this.vendaForm = this.fb.group({
      vendaCodigo: [this.generateVendaCodigo(), Validators.required],
      vendaData: [new Date(), Validators.required],
      cliId: [null, Validators.required],
      fpgId: [null, Validators.required],
      compras: this.fb.array([], Validators.required)
    });

    this.productService.read().subscribe({
      next: produtos => this.products = produtos,
      error: err => this.snackBar.open('Erro ao carregar produtos', 'X', { duration: 3000 })
    });

    this.addCompra();
  }

  generateVendaCodigo(): string {
    const codigo = Math.floor(Math.random() * 1000000);
    return codigo.toString().padStart(6, '0');
  }

  get compras() {
    return this.vendaForm.get('compras') as FormArray;
  }

  createCompra(): FormGroup {
    return this.fb.group({
      proId: [null, Validators.required],
      compraQuantidade: [1, [Validators.required, Validators.min(1)]],
      compraPrecoVenda: [0, [Validators.required, Validators.min(0)]]
    });
  }

  addCompra(): void {
    this.compras.push(this.createCompra());
  }

  cancel(): void {
    this.router.navigate(['/vendas']);
  }

  removeCompra(index: number): void {
    this.compras.removeAt(index);
  }

  onProdutoChange(index: number): void {
    const compraGroup = this.compras.at(index);
    const proId = compraGroup.get('proId')?.value;

    const produto = this.products.find(p => p.proId === proId);
    if (produto) {
      compraGroup.patchValue({
        compraPrecoVenda: produto.proPrecoVenda
      });
    } else {
      compraGroup.patchValue({
        compraPrecoVenda: 0
      });
    }
  }

  onSubmit(): void {
    const raw = this.vendaForm.value;

    const vendaValorTotal = raw.compras.reduce(
      (sum: number, item: Compra) => sum + item.compraQuantidade * item.compraPrecoVenda,
      0
    );

    const venda: Venda = {
      ...raw,
      vendaValorTotal,
      vendaData: new Date(raw.vendaData).toISOString()
    };

    this.vendaService.create(venda).subscribe({
      next: () => {
        this.snackBar.open('Venda criada com sucesso!', 'X', { duration: 3000 });
        this.router.navigate(['/vendas']);
      },
      error: (err) => {
        if (err.status === 409) {
          // erro de código duplicado (conflito)
          const novoCodigo = this.generateVendaCodigo();
          this.vendaForm.get('vendaCodigo')?.setValue(novoCodigo);
          this.snackBar.open('Código duplicado. Novo código gerado automaticamente.', 'X', { duration: 3000 });
        } else {
          this.snackBar.open('Erro ao criar venda', 'X', { duration: 3000 });
          console.error(err);
        }
      }
    });
  }
}
