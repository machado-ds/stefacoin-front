import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaCursosAlunoMatriculadoResolver } from './components/lista-cursos/lista-cursos-matriculados.resolver';
import { ListaCursosResolver } from './components/lista-cursos/lista-cursos.resolver';
import { AuthGuardService } from './guards/auth-guard.service';
import { PerfilAlunoComponent } from './pages/private/aluno/perfil-aluno/perfil-aluno.component';
import { DetalhesAulaComponent } from './pages/private/aula/detalhes-aula/detalhes-aula.component';
import { AvaliaCursoComponent } from './pages/private/curso/avalia-curso/avalia-curso.component';
import { DetalhesCursoComponent } from './pages/private/curso/detalhes-curso/detalhes-curso.component';
import { EditaCursoComponent } from './pages/private/curso/edita-curso/edita-curso.component';
import { NovoCursoComponent } from './pages/private/curso/novo-curso/novo-curso.component';
import { HomeComponent } from './pages/private/home/home.component';
import { PerfilProfessorComponent } from './pages/private/professor/perfil-professor/perfil-professor.component';
import { CadastroComponent } from './pages/public/cadastro/cadastro.component';
import { LoginComponent } from './pages/public/login/login.component';
import { PaginaNaoEncontradaComponent } from './pages/public/pagina-nao-encontrada/pagina-nao-encontrada.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: HomeComponent,
    resolve: {
      cursos: ListaCursosResolver,
      cursosAluno:  ListaCursosAlunoMatriculadoResolver
    }
  },
  {
    path: 'nova-conta',
    component: CadastroComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'aluno/:alunoId',
    canActivate: [AuthGuardService],
    component: PerfilAlunoComponent
  },
  {
    path: 'professor/:professorId',
    canActivate: [AuthGuardService],
    component: PerfilProfessorComponent
  },
  {
    path: 'curso/:cursoId',
    canActivate: [AuthGuardService],
    component: DetalhesCursoComponent
  },
  {
    path: 'curso/:cursoId/avaliar',
    canActivate: [AuthGuardService],
    component: AvaliaCursoComponent
  },
  {
    path: 'curso/:cursoId/editar',
    canActivate: [AuthGuardService],
    component: EditaCursoComponent
  },
  {
    path: 'curso/:cursoId/aula/:aulaId',
    canActivate: [AuthGuardService],
    component: DetalhesAulaComponent
  },
  {
    path: 'novo-curso',
    canActivate: [AuthGuardService],
    component: NovoCursoComponent
  },
  {
    path: 'nao-encontrado',
    component: PaginaNaoEncontradaComponent,
    data: {
      title: 'Não Encontrado'
    }
  },
  {
    path: '**',
    redirectTo: 'nao-encontrado'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
