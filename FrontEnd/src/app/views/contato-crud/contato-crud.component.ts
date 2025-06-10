import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contato } from 'src/app/component/contato/contato-read.model';
import { contatoService } from 'src/app/component/contato/contato.service';

@Component({
  selector: 'app-contato-crud', // Define o seletor do componente
  templateUrl: './contato-crud.component.html', // Caminho para o template HTML
  styleUrls: ['./contato-crud.component.css'] // Caminho para o arquivo de estilos CSS
})
export class ContatoCrudComponent implements OnInit {
  searchTerm: string = '';
  allContatos: Contato[] = [];
  filteredContatos: Contato[] = [];
  // Construtor para injetar o serviço de roteamento
  constructor(
    private router: Router,
    private contatoService: contatoService
  ) { }

  // Método chamado ao inicializar o componente
  ngOnInit(): void {
    this.contatoService.read().subscribe(contato => {
      this.allContatos = contato;
      this.filteredContatos = contato;
    });
  }

  // Método para navegar para a tela de criação de contatos
  navigateToContatoCreate(): void {
    this.router.navigate(['/contato/create']);
  }

  filterContatos(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredContatos = this.allContatos.filter(p =>
      p.conCelular.toLowerCase().includes(term) ||
      p.conEmail.toLowerCase().includes(term) ||
      p.conTelefoneComercial.toLowerCase().includes(term)
    );
  }
}