import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-crud', // Define o seletor do componente
  templateUrl: './product-crud.component.html', // Caminho para o template HTML
  styleUrls: ['./product-crud.component.css'] // Caminho para o arquivo de estilos CSS
})
export class ProductCrudComponent implements OnInit {
  // Construtor para injetar o serviço de roteamento
  constructor(private router: Router) { }

  // Método chamado ao inicializar o componente
  ngOnInit(): void {
  }
  
  // Método para navegar para a tela de criação de produtos
  navigateToProductCreate(): void {
    this.router.navigate(['/products/create']);
  }
}