# Backend (Bootcamp)

Instruções rápidas para executar o backend localmente.

Pré-requisitos:
- Docker & Docker Compose (recomendado)
- Node 18+ (se executar localmente sem Docker)

Rodando com Docker Compose (recomendado):

```bash
docker-compose up --build
```

Isso cria serviços: Postgres, LocalStack (S3) e a aplicação.

Documentação da API (Swagger):
- Após subir a aplicação, acesse `http://localhost:3000/api-docs`.

Rodando localmente sem Docker:

```bash
npm install
npm run prisma:generate
npm run dev
```

Testes:

```bash
npm test
```

Observações e próximos passos:
- A aplicação já possui autenticação JWT, upload para LocalStack e validações com `zod`.
- Ainda podem ser adicionadas mais coberturas de testes e melhorias na infra (ex.: scripts de seed/migrations no docker-compose).
