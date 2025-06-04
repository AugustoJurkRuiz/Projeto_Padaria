import { Component, OnInit} from '@angular/core';
import { icone } from 'src/app/views/home/home.component';
import { titulo } from 'src/app/views/home/home.component';




@Component({
  selector: 'app-header', // Define o seletor do componente
  templateUrl: './header.component.html', // Caminho para o template HTML
  styleUrls: ['./header.component.css'] // Caminho para o arquivo de estilos CSS
})

export class HeaderComponent  implements  OnInit{
  public icone = icone;
  public titulo = titulo;
  ngOnInit(): void {
      
  }
  // Componente de cabeçalho vazio, pronto para implementação futura
}
