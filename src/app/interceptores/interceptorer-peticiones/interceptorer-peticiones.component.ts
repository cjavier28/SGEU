import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Obtén el token de donde lo tengas almacenado
  const authToken = localStorage.getItem('tokenBearer');

  if (authToken) {
    const authRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return next(authRequest); // 'next' ahora es una función
  }

  return next(req); // 'next' ahora es una función
};
