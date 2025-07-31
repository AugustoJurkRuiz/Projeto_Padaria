// Importações necessárias para o componente
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente.model'; // Modelo de dados do cliente
import { Router } from '@angular/router'; // Para navegação entre rotas
import { ClienteService } from '../cliente.service'; // Serviço para manipulação de dados do cliente
import { HttpClient } from '@angular/common/http';

// Decorador que define o componente Angular
@Component({
  selector: 'app-cliente-create', // Nome do seletor usado no HTML
  templateUrl: './cliente-create.component.html', // Caminho para o template HTML do componente
  styleUrls: ['./cliente-create.component.css'] // Caminho para o arquivo de estilos CSS do componente
})
export class ClienteCreateComponent implements OnInit {
  cliente: Cliente = {
    cliNome: '',
    cliCpf: '',
    conCelular: '',
    conTelefoneComercial: '',
    conEmail: '',
    endRua: '',
    endNumero: '',
    endCidade: '',
    endCep: '',
    endEstado: ''
  };
  // Construtor que injeta o serviço ClienteService e o Router
  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private http: HttpClient) { }

  // Método chamado ao inicializar o componente
  ngOnInit(): void {
  }

  submitted = false;
  createCliente(): void {
    this.submitted = true; // Ativa a borda vermelha se não for preenchido
    // Só envia se todos os campos estiverem preenchidos
    if (
      this.cliente.cliNome &&
      this.cliente.cliCpf &&
      this.cliente.conCelular &&
      this.cliente.conTelefoneComercial &&
      this.cliente.conEmail &&
      this.cliente.endRua &&
      this.cliente.endNumero &&
      this.cliente.endCidade &&
      this.cliente.endCep &&
      this.cliente.endEstado
    ) {
      this.clienteService.createCliente(this.cliente).subscribe(() => {
        this.clienteService.showMessage('Cliente criado!'); // Exibe mensagem de sucesso
        this.router.navigate(['/clientes']); // Navega para a lista de clientes
      });
    }
  }

  // Método para cancelar a operação e voltar para a lista de clientes
  cancel(): void {
    this.router.navigate(['/clientes']); // Navega para a lista de clientes
  }

  buscarCEP(): void {
    const cep = this.cliente.endCep.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cep.length === 8) {
      this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).subscribe({
        next: (dados) => {
          if (!dados.erro) {
            this.cliente.endRua = dados.logradouro;
            this.cliente.endCidade = dados.localidade;
            this.cliente.endEstado = dados.uf;
          } else {
            this.clienteService.showMessage('CEP não encontrado.');
          }
        },
        error: () => {
          this.clienteService.showMessage('Erro ao buscar CEP.');
        }
      });
    }
  }
}