import { type APIRequestContext, type APIResponse } from '@playwright/test';
import { type AuthRequest } from './models/auth.model';

// Equivalente a un page object, pero para la API de autenticación (ver src/services/authService.js)
export class AuthClient {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async login(email: string, password: string): Promise<APIResponse> {
    const data: AuthRequest = { email, password };
    // Ruta relativa: se resuelve contra baseURL (API_BASE_URL), que termina en "/"
    return this.request.post('v1/auth', { data });
  }

  async renew(token: string): Promise<APIResponse> {
    return this.request.get('v1/auth/renew', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
