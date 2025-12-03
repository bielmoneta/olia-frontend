import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Tenta pegar 'auth-token' (Usuário/Escola)
  let token = sessionStorage.getItem('auth-token');

  // 2. Se não achou, tenta pegar 'token' (Governo)
  if (!token) {
    token = sessionStorage.getItem('token');
  }

  // Verifica se a URL é do OpenStreetMap
  const isExternalApi = req.url.includes('nominatim.openstreetmap.org');

  // Só adiciona o token se ELE EXISTIR e se NÃO FOR uma API externa
  if (token && !isExternalApi) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(authReq);
  }

  return next(req);
};
