import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/header.service';



@Component({
  selector: 'app-header', // Define o seletor do componente
  templateUrl: './header.component.html', // Caminho para o template HTML
  styleUrls: ['./header.component.css'] // Caminho para o arquivo de estilos CSS
})

export class HeaderComponent  implements  OnInit{
  public titulo = '';
  public icone = '';
  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    this.headerService.titulo$.subscribe(t => this.titulo = t);
    this.headerService.icone$.subscribe(i => this.icone = i);
  }
  // Componente de cabeçalho vazio, pronto para implementação futura
}
