import { Component, Input } from '@angular/core';
import { VendaService } from '../venda.service';
import { Venda } from '../venda.model';
import { Router } from '@angular/router';
import { ClienteService } from '../../cliente/cliente.service';
import { Cliente } from '../../cliente/cliente.model'; // se tiver o model

@Component({
  selector: 'app-venda-read',
  templateUrl: './venda-read.component.html',
  styleUrls: ['./venda-read.component.css']
})

export class VendaReadComponent {
  @Input() vendas: (Venda & { cliNome?: string })[] = [];
  @Input() clientes: Cliente[] = [];

  displayedColumns = ['vendaCodigo', 'cliId', 'vendaValorTotal']; // Colunas exibidas na tabela


  constructor(
    private vendaService: VendaService,
    private router: Router,
    private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.vendaService.read().subscribe(vendas => {
      this.vendas = vendas; // Atribui os dados recebidos à lista de fornecedores
      console.log(vendas); // Exibe os dados no console para depuração
    });
  }

}