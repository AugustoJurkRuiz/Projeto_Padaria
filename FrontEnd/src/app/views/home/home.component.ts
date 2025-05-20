import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/component/product/product.service';
import { ClienteService } from 'src/app/component/cliente/cliente.service';
import { formaPagamentoService } from 'src/app/component/formaPagamento/formaPagamento.service';



@Component({
  selector: 'app-home', // Define o seletor do componente
  templateUrl: './home.component.html', // Caminho para o template HTML
  styleUrls: ['./home.component.css'] // Caminho para o arquivo de estilos CSS
})
export class HomeComponent implements OnInit{
  constructor(public productService: ProductService,
              public clienteService: ClienteService, 
              public contatoService: ContatoService,
              public formaPagamentoService: formaPagamentoService,
              public fornecedorService: ClienteService){}
  productCount: number = 0;

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.productCount = products.length; // Conta a quantidade de produtos
    const count = this.productService.getProductCount();
  });
    this.clienteService.read().subscribe(clientes => {
      this.clienteCount = clientes.length; // Conta a quantidade de produtos
    const count = this.clienteService.getClienteCount();
  });
  this.productService.read().subscribe(products => {
      this.productCount = products.length; // Conta a quantidade de produtos
    const count = this.productService.getProductCount();
  });
  this.productService.read().subscribe(products => {
      this.productCount = products.length; // Conta a quantidade de produtos
    const count = this.productService.getProductCount();
  });
}
}