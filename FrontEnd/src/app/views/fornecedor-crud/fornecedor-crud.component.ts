import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fornecedor } from 'src/app/component/fornecedor/fornecedor.model';
import { FornecedorService } from 'src/app/component/fornecedor/fornecedor.service';
import { HeaderService } from 'src/app/component/template/header/header.service';

@Component({
  selector: 'app-fornecedor-crud', // Define o seletor do componente
  templateUrl: './fornecedor-crud.component.html', // Caminho para o template HTML
  styleUrls: ['./fornecedor-crud.component.css'] // Caminho para o arquivo de estilos CSS
})
export class FornecedorCrudComponent implements OnInit {
  searchTerm: string = '';
  allFornecedores: Fornecedor[] = [];
  filteredFornecedores: Fornecedor[] = [];
  // Construtor para injetar o serviço de roteamento
  constructor(
    private headerService: HeaderService,
    private router: Router,
    private fornecedorService: FornecedorService
  ) { }

  // Método chamado ao inicializar o componente
  ngOnInit(): void {
    this.headerService.setTitulo('Fornecedores');
    this.headerService.setIcone('business');
    this.fornecedorService.readFornecedor().subscribe((fornecedor: Fornecedor[]) => {
      this.allFornecedores = fornecedor;
      this.filteredFornecedores = fornecedor;
    });
  }

  // Método para navegar para a tela de criação de fornecedores
  navigateToFornecedorCreate(): void {
    this.router.navigate(['/fornecedor/create']);
  }

  filterFornecedores(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredFornecedores = this.allFornecedores.filter(p =>
      p.forNomeFantasia.toLowerCase().includes(term)
    );
  }
}