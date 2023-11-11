# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)
    uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast
    Refresh

## run tests

```bash
docker compose exec client npm run test
```

## cypress open

```bash
docker compose exec client npm run cypress:open
```

## cypress e2e test

```bash
docker compose exec client npm run test:e2e
```
