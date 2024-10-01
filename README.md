This project contains the following technologies

Authentication and User Management:
- Bcrypt (password hashing)
- NextAuth (authentication)

Core Technologies:
- React 18
- TypeScript
- Next 14 (framework)

Data Fetching and State Management:
- Axios (sending request to backend)
- Prisma 5 (ORM for DB)
- Zustand (state management)

Database Management:
- PostgreSQL (relational database)

Form and Validation:
- Zod (first schema validation)

Image Handling and Optimization:
- Sharp (image optimizator)

Middleware and Server Utilities:
- Concurrently (all projects are running in tandem)

Miscellaneous:
- React hot toast (stylization message)

Styling and UI Frameworks:
- Lucide React (stylization)
- shadcn/ui (stylization)
- Tailwind CSS (stylization)

Utilities and Libraries:
- PostCSS (transforms CSS code to AST)
- React Use (custom React Hooks)
- QueryString (Parse and stringify URL)


To run the client and server via concurrently:
- npm run all

- npx prisma generate
- npx prisma db push
- npx prisma migrate reset

- npx prisma db seed (loading test database)