# Projeto-web

Site com login e registro simples para gerenciar usuários a partir do Angular/Typescript com SQL.


## Stack utilizada:

 * Angular
 * Typescript
 * JWT tokens
 * HTML
 * AuthGuard
 
 Iniciando projeto.
 
 Certifique-se de ter a versão 12 do Angular instalada, caso não tenha, use o código:
 
 ```npm install -g @angular/cli@12.2.0```
 
 Para verificar a versão:
 
 ```ng --version```
 
 Feito isso, rode o comando:
 
```npm install```

---

## Sobre o projeto:

Cada recurso tem sua própria pasta (account, home e users). 
Outros códigos comuns, como components, services, models, helpers, 
são colocados em pastas prefixadas com um underline _ para diferenciá-los facilmente dos recursos e agrupá-los no topo da estrutura de pastas.

O auth guard é um guarda de rota angular que é usado para evitar que usuários não autenticados acessem rotas restritas, 
ele faz isso implementando a CanActivateinterface que permite ao Guard decidir se uma rota pode ser ativada com o canActivate(). 
Se o método retornar truea rota é ativada, caso contrário, se o método retornar false a rota é bloqueada.

O JWT Interceptor intercepta solicitações http do aplicativo para adicionar um token de autenticação JWT de autorização se o usuário estiver conectado e a solicitação for para o aplicativo api url ( environment.apiUrl).

---

## Links Úteis:

* [JWT Token](https://jwt.io/)
* [TypeScript](https://www.typescriptlang.org/)
* [Angular CLI](https://angular.io/cli)
