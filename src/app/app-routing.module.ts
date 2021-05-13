import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaCursosResolver } from './components/lista-cursos/lista-cursos.resolver';
import { AuthGuardService } from './guards/auth-guard.service';
import { PerfilAlunoComponent } from './pages/private/aluno/perfil-aluno/perfil-aluno.component';
import { HomeComponent } from './pages/private/home/home.component';
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
