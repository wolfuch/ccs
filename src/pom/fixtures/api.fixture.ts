import { test as base } from '@playwright/test';
import { AuthClient } from '../api/auth.client';

type ApiFixtures = {
  authApi: AuthClient;
};

// Los specs de API importan `test` y `expect` desde aquí para recibir los clientes ya construidos
export const test = base.extend<ApiFixtures>({
  authApi: async ({ request }, use) => {
    await use(new AuthClient(request));
  },
});

export { expect } from '@playwright/test';

//to do: fixture con token por worker (login una vez) cuando se conozca la respuesta de v1/auth
