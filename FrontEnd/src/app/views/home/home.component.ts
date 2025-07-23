import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/component/product/product.service';
import { ClienteService } from 'src/app/component/cliente/cliente.service';
import { contatoService } from 'src/app/component/contato/contato.service';
import { formaPagamentoService } from 'src/app/component/formaPagamento/formaPagamento.service';
import { FornecedorService } from 'src/app/component/fornecedor/fornecedor.service';
import { HeaderService } from 'src/app/component/template/header/header.service';
import { VendaService } from 'src/app/component/venda/venda.service';



@Component({
  selector: 'app-home', // Define o seletor do componente
  templateUrl: './home.component.html', // Caminho para o template HTML
  styleUrls: ['./home.component.css'] // Caminho para o arquivo de estilos CSS
})

export class HomeComponent implements OnInit {

  constructor(
    private headerService: HeaderService,
    public productService: ProductService,
    public clienteService: ClienteService,
    public contatoService: contatoService,
    public formaPagamentoService: formaPagamentoService,
    public vendaService: VendaService,
    public fornecedorService: FornecedorService) { }
  productCount: number = 0;
  clienteCount: number = 0;
  contatoCount: number = 0;
  formaPagamentoCount: number = 0;
  fornecedorCount: number = 0;
  vendaCount: number = 0;

  ngOnInit(): void {
    this.headerService.setTitulo('Início');
    this.headerService.setIcone('home');

    this.productService.read().subscribe(products => {
      this.productCount = products.length; // Conta a quantidade de produtos
      const count = this.productService.getProductCount();
    });
    this.clienteService.readClientes().subscribe(clientes => {
      this.clienteCount = clientes.length; // Conta a quantidade de clientes
      const count = this.clienteService.getClienteCount();
    });
    this.contatoService.read().subscribe(contatos => {
      this.contatoCount = contatos.length; // Conta a quantidade de contatos
      const count = this.contatoService.getContatoCount();
    });
    this.formaPagamentoService.read().subscribe(formaPagamento => {
      this.formaPagamentoCount = formaPagamento.length; // Conta a quantidade de fornecedores
      const count = this.formaPagamentoService.getformaPagamentoCount();
    });
    this.fornecedorService.readFornecedor().subscribe(fornecedor => {
      this.fornecedorCount = fornecedor.length; // Conta a quantidade de formas de pagamentos
      const count = this.fornecedorService.getfornecedorCount();
    });
    this.vendaService.read().subscribe(venda => {
      this.vendaCount = venda.length; // Conta a quantidade de vendas
      const count = this.vendaService.getVendaCount();
    });
  }
}
