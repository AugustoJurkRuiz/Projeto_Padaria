import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

export var icone:string;
export var titulo:string;

@Component({
  selector: 'app-product-read', // Define o seletor do componente
  templateUrl: './product-read.component.html', // Caminho para o template HTML
  styleUrls: ['./product-read.component.css'], // Caminho para o arquivo de estilos CSS
  encapsulation: ViewEncapsulation.None
})

export class ProductReadComponent implements OnInit{
  @Input() products: Product[] = [];
  displayedColumns = ['proId', 'proNome', 'proPrecoCusto', 'proPrecoVenda', 'action']; // Colunas exibidas na tabela
 ngOnInit(): void {
  icone = "storefront"
  titulo = "Produtos"
 }
}
