import { Component, Input} from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-read', // Define o seletor do componente
  templateUrl: './product-read.component.html', // Caminho para o template HTML
  styleUrls: ['./product-read.component.css'], // Caminho para o arquivo de estilos CSS
  
})

export class ProductReadComponent{
  @Input() products: Product[] = [];
  displayedColumns = ['proId', 'proNome', 'proPrecoCusto', 'proPrecoVenda', 'action']; // Colunas exibidas na tabela
 
}
