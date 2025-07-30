import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../product/product.model';
import { ProductService } from '../../product/product.service';
import { Cliente } from '../../cliente/cliente.model';
import { ClienteService } from '../../cliente/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Venda, Compra } from '../venda.model';
import { VendaService } from '../venda.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { FormaPagamento } from '../../formaPagamento/formaPagamento.model';
import { formaPagamentoService } from '../../formaPagamento/formaPagamento.service';
 
@Component({
  selector: 'app-venda-create',
  templateUrl: './venda-create.component.html',
  styleUrls: ['./venda-create.component.css']
})
export class VendaCreateComponent implements OnInit {
  vendaForm!: FormGroup;
  products: Product[] = [];
  clienteControl = new FormControl('');
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  formaPagamentos: FormaPagamento[] = [];
  formaPagamentoControl = new FormControl('');
  formaPagamentosFiltrados: FormaPagamento[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    private router: Router,
    private vendaService: VendaService,
    private formaPagamentoService: formaPagamentoService
  ) { }

  ngOnInit(): void {

    this.vendaForm = this.fb.group({
      vendaCodigo: [this.generateVendaCodigo(), Validators.required],
      vendaData: [new Date(), Validators.required],
      cliId: [null, Validators.required],
      fpgId: [null, Validators.required],
      compras: this.fb.array([], Validators.required,
      )
    });

    this.clienteService.readClientes().subscribe(clientes => {
      this.clientes = clientes;
      this.clientesFiltrados = clientes;

      this.clienteControl.valueChanges.subscribe(value => {
        const filter = value?.toLowerCase() || '';
        this.clientesFiltrados = this.clientes.filter(cliente =>
          cliente.cliNome.toLowerCase().includes(filter)
        );
      });
    });

    this.formaPagamentoService.read().subscribe(fp => {
      this.formaPagamentos = fp;
      this.formaPagamentosFiltrados = fp;

      this.formaPagamentoControl.valueChanges.subscribe(value => {
        const filter = value?.toLowerCase() || '';
        this.formaPagamentosFiltrados = this.formaPagamentos.filter(fp =>
          fp.fpgDescricao.toLowerCase().includes(filter)
        );
      });
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

  displayCliente(cliente: Cliente): string {
    return cliente?.cliNome || '';
  }

  onClienteSelecionado(cliente: Cliente): void {
    this.vendaForm.get('cliId')?.setValue(cliente.cliId);
  }

  displayFormaPagamento(fp: FormaPagamento): string {
    return fp && fp.fpgDescricao ? fp.fpgDescricao : '';
  }

  onFormaPagamentoSelecionada(fp: FormaPagamento): void {
    this.vendaForm.get('fpgId')?.setValue(fp.fpgId);
  }
}

