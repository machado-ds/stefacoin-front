import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { HttpInterceptorService } from './interceptors/http-interceptor.service';
import { HomeComponent } from './pages/private/home/home.component';
import { ListarProfessorComponent } from './pages/private/professor/listar-professor/listar-professor.component';
import { CadastroComponent } from './pages/public/cadastro/cadastro.component';
import { LoginComponent } from './pages/public/login/login.component';
import { PaginaNaoEncontradaComponent } from './pages/public/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { MensagemErroComponent } from './components/mensagem-erro/mensagem-erro.component';
import { MensagemSucessoComponent } from './components/mensagem-sucesso/mensagem-sucesso.component';
import { CardComponent } from './components/card/card.component';
import { ListaCursosComponent } from './components/lista-cursos/lista-cursos.component';
import { PerfilAlunoComponent } from './pages/private/aluno/perfil-aluno/perfil-aluno.component';
import { PerfilProfessorComponent } from './pages/private/professor/perfil-professor/perfil-professor.component';
import { DetalhesCursoComponent } from './pages/private/curso/detalhes-curso/detalhes-curso.component';
import { DetalhesAulaComponent } from './pages/private/aula/detalhes-aula/detalhes-aula.component';
import { AvaliaCursoComponent } from './pages/private/curso/avalia-curso/avalia-curso.component';
import { NovoCursoComponent } from './pages/private/curso/novo-curso/novo-curso.component';

export function tokenGetter() {
  return localStorage.getItem('jwttoken');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListarProfessorComponent,
    CadastroComponent,
    HomeComponent,
    PaginaNaoEncontradaComponent,
    HeaderComponent,
    MensagemErroComponent,
    MensagemSucessoComponent,
    CardComponent,
    ListaCursosComponent,
    PerfilAlunoComponent,
    PerfilProfessorComponent,
    DetalhesCursoComponent,
    DetalhesAulaComponent,
    AvaliaCursoComponent,
    NovoCursoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
  ],
  providers: [
    HttpInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    AuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
