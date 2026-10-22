# Project context

React (Vite) login front end for Red Negocios, plus a Playwright E2E suite. Work in this repo is mostly QA automation.

## E2E stack

- Playwright ^1.63 + TypeScript, Page Object Model (POM).
- Config: `playwright.config.ts` (`testDir: ./src/pom`, projects: chromium, firefox, webkit, reporter: html).
- CI: `.github/workflows/playwright.yml`.
- Docs: `docs/wiki/Pruebas-Automatizadas-E2E.md` (Spanish; keep it updated when adding page objects or specs).

## Layout

```
src/pom/pages/   *.page.ts   one class per page/component
src/pom/tests/   *.spec.ts   test cases, consume page objects only
```

## Conventions

- Page objects: `readonly` Locator fields, assigned in the constructor, exposed through high-level async methods (`submitLogin`, `goToMetricas`). Specs must not call `page.locator(...)` directly for elements a page object owns.
- Locator priority: `getByTestId` first, then role/text. Avoid generated ids such as `#pr_id_1_content`.
- File names: snake_case with `.page.ts` / `.spec.ts` suffixes.
- Tags: every test carries `{ tag: ['@smoke', '@<feature>'] }` (e.g. `@login`).
- Environment: values come from `.env_playwright` via dotenv (`VITE_APP_URL_EVALUACION`, `BASE_URL_MANDANTE`, `USER_NAME`, `USER_PASS`). Template: `.env_example`. Never hardcode or commit credentials.
- Pending work is marked with `//to do` comments; do not delete them without implementing.

## Commands

```bash
npm run smoke        # all @smoke tests
npm run loginTest    # login.spec.ts only
npx playwright test --project=chromium
npx playwright show-report
```

## Working rules

- Skills to prefer: `playwright` (POM/selectors), `typescript`, `work-unit-commits`.
- Conventional commits; keep tests and docs in the same commit as the behavior they cover.
