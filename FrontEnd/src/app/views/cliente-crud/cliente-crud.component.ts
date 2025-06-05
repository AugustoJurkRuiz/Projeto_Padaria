import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/component/cliente/cliente.model';
import { ClienteService } from 'src/app/component/cliente/cliente.service';

@Component({
  selector: 'app-cliente-crud', // Define o seletor do componente
  templateUrl: './cliente-crud.component.html', // Caminho para o template HTML
  styleUrls: ['./cliente-crud.component.css'] // Caminho para o arquivo de estilos CSS
})
export class ClienteCrudComponent implements OnInit {
  searchTerm: string = '';
  allClientes: Cliente[] = [];
  filteredClientes: Cliente[] = [];

  // Construtor para injetar o serviço de roteamento
  constructor(
    private router: Router,
    private clienteService: ClienteService
    ) { }

  // Método chamado ao inicializar o componente
  ngOnInit(): void {
    this.clienteService.read().subscribe(clientes => {
      this.allClientes = clientes;
      this.filteredClientes = clientes;
    });
  }
  
  // Método para navegar para a tela de criação de clientes
  navigateToClienteCreate(): void {
    this.router.navigate(['/clientes/create']);
  }

  filterClientes(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredClientes = this.allClientes.filter(p =>
      p.cliNome.toLowerCase().includes(term)
    );
  }
}