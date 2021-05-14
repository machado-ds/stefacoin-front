import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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
  tipoUsuario: number;
  cursos: Curso[] = [];
  cursosMatriculados: Curso[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private cursoService: CursoService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.usuario = this.authService.getUsuario();
    });

    this.tipoUsuario = this.authService.getUsuario().tipo;

    this.cursos = this.activatedRoute.snapshot.data['cursos'];
    this.cursosMatriculados = this.activatedRoute.snapshot.data['cursosAluno'];
  }
}
