This project contains the following technologies:
- React 18
- TypeScript
- Next 14 (framework)
- Prisma 5 (ORM for DB)
- Zustand (state management)
- React Use (custom React Hooks)
- Tailwind CSS (stylization)
- shadcn/ui (stylization)
- Lucide React (stylization)
- PostCSS (transforms CSS code to AST)
- Concurrently (all projects are running in tandem)
axios
qs
bcrypt

To run the client and server via concurrently:
- npm run all

- npx prisma generate
- npx prisma db push
- npx prisma migrate reset

- npx prisma db seed (loading test database)