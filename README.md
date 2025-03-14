This project contains the following technologies

Animation and Interaction:
- React Insta Stories (stories like Instagram)

Authentication and User Management:
- Bcryptjs (password hashing)
- NextAuth (authentication)

Core Technologies:
- React 19
- TypeScript
- Next 15 (framework)

Data Fetching and State Management:
- Axios (sending request to backend)
- Prisma 6 (ORM for DB)
- React Hook Form (working with forms)
- Zustand (state management)

Database Management:
- PostgreSQL (relational database)

Email Services:
- Resend (send email)

Form and Validation:
- Zod (first schema validation)

Image Handling and Optimization:
- Sharp (image optimizer)

Middleware and Server Utilities:
- Concurrently (all projects are running in tandem)
- Node Cron (scheduling background tasks)

Miscellaneous:
- React hot toast (stylization message)

Payment:
- Stripe (payment service provider)

Styling and UI Frameworks:
- Lucide React (stylization)
- Next Js TopLoader (using top progress bar)
- shadcn/ui (stylization)
- Tailwind CSS (stylization)

Utilities and Libraries:
- Knip (code analyzer and declutter)
- PostCSS (transforms CSS code to AST)
- React Use (custom React Hooks)
- QueryString (Parse and stringify URL)


To run the client and server via concurrently:
terminal powershell -> npm run all
terminal powershell -> npm run knip

terminal powershell -> npx prisma generate
terminal powershell -> npx prisma db push
terminal powershell -> npx prisma migrate reset

terminal powershell -> npx prisma db seed (loading test database)

terminal CommandPrompt -> stripe login
terminal CommandPrompt -> stripe listen --forward-to localhost:3000/api/webhook