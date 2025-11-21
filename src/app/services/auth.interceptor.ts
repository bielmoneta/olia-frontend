import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // 1. Pega o token salvo no login
  const token = sessionStorage.getItem('auth-token');

  // 2. Se tiver token, clona a requisição e adiciona o cabeçalho
  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }

  // 3. Se não tiver token, manda como está
  return next(req);
};
