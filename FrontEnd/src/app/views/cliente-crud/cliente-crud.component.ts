import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/component/cliente/cliente.model';
import { ClienteService } from 'src/app/component/cliente/cliente.service';
import { HeaderService } from 'src/app/component/template/header/header.service';

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
    private headerService: HeaderService,
    private router: Router,
    private clienteService: ClienteService
    ) { }

  // Método chamado ao inicializar o componente
  ngOnInit(): void {
    this.headerService.setTitulo('Clientes');
    this.headerService.setIcone('person');
    this.clienteService.readClientes().subscribe(clientes => {
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
    this.filteredClientes = this.allClientes.filter(cliente =>
      cliente.cliNome.toLowerCase().includes(term) ||
      cliente.cliCpf.toLowerCase().includes(term)
    );
  }
}