import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaCursosResolver } from './components/lista-cursos/lista-cursos.resolver';
import { AuthGuardService } from './guards/auth-guard.service';
import { PerfilAlunoComponent } from './pages/private/aluno/perfil-aluno/perfil-aluno.component';
import { DetalhesAulaComponent } from './pages/private/aula/detalhes-aula/detalhes-aula.component';
import { DetalhesCursoComponent } from './pages/private/curso/detalhes-curso/detalhes-curso.component';
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
      cursos: ListaCursosResolver
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
    component: PerfilAlunoComponent
  },
  {
    path: 'professor/:professorId',
    component: PerfilProfessorComponent
  },
  {
    path: 'curso/:cursoId',
    component: DetalhesCursoComponent
  },
  {
    path: 'curso/:cursoId/aula/:aulaId',
    component: DetalhesAulaComponent
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
