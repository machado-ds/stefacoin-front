import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Curso } from 'src/app/models/curso';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario: Usuario;
  cursos: Curso[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private cursoService: CursoService) { }

  ngOnInit(): void {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.usuario = this.authService.getUsuario();
    });
  }

  getCursos() {
    return this.cursoService
      .getCursos()
      .subscribe(cursos => {
        this.cursos = this.cursos.concat(cursos);
      })
  }

}
