import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '../fornecedor.model';
import { Router } from '@angular/router';
import { FornecedorService } from '../fornecedor.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fornecedor-create', // Define o seletor do componente
  templateUrl: './fornecedor-create.component.html', // Caminho para o template HTML
  styleUrls: ['./fornecedor-create.component.css'] // Caminho para o arquivo de estilos CSS
})
export class FornecedorCreateComponent implements OnInit {
  // Inicializa o objeto fornecedor com valores padrão
  fornecedor: Fornecedor = {
    forNomeFantasia: '',
    forCnpj: '',
    forRazaoSocial: '',
    conCelular: '',
    conTelefoneComercial: '',
    conEmail: '',
    endRua: '',
    endNumero: '',
    endCidade: '',
    endCep: '',
    endEstado: ''
  };

  // Injeta o serviço FornecedorService e o roteador Router no construtor
  constructor(
    private fornecedorService: FornecedorService,
    private router: Router,
    private http: HttpClient
  ) { }

  // Método executado ao inicializar o componente
  ngOnInit(): void { }

  // Método para criar um novo fornecedor
  createFornecedor(): void {
    this.fornecedorService.createFornecedor(this.fornecedor).subscribe(() => {
      this.fornecedorService.showMessage('Fornecedor criado!'); // Exibe mensagem de sucesso
      this.router.navigate(['/fornecedor']); // Redireciona para a lista de produtos
    });
  }

  // Método para cancelar a criação e voltar para a lista de fornecedores
  cancel(): void {
    this.router.navigate(['/fornecedor']);
  }

  buscarCEP(): void {
    const cep = this.fornecedor.endCep.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cep.length === 8) {
      this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).subscribe({
        next: (dados) => {
          if (!dados.erro) {
            this.fornecedor.endRua = dados.logradouro;
            this.fornecedor.endCidade = dados.localidade;
            this.fornecedor.endEstado = dados.uf;
          } else {
            this.fornecedorService.showMessage('CEP não encontrado.');
          }
        },
        error: () => {
          this.fornecedorService.showMessage('Erro ao buscar CEP.');
        }
      });
    }
  }
}