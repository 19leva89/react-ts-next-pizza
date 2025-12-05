# This project contains the following technologies

Animation and Interaction:
- React Insta Stories (stories like Instagram)

Authentication and User Management:
- Bcrypt-ts (password hashing)
- NextAuth (authentication)

Core Technologies:
- React 19
- TypeScript
- Next 16 (framework)

Data Fetching and State Management:
- Axios (sending request to backend)
- Prisma 7 (ORM for DB)
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


# To run the client and server via concurrently:
terminal powershell -> `npm i` (install dependencies)
terminal powershell -> `npx npm-check-updates --interactive` (update dependencies)
terminal powershell -> `npm run all`
terminal powershell -> `npm run lint` (loading ESLint checker)
terminal powershell -> `npm run knip` (loading Knip checker)

# Database commands:
terminal powershell -> `npx prisma generate`
terminal powershell -> `npx prisma db push`
terminal powershell -> `npx prisma migrate reset`

terminal powershell -> `npx prisma db seed` (loading test DB)

# GitHub commands:
terminal powershell -> `git pull origin master` (get latest changes)

terminal powershell -> `git add .` (add all changes)
terminal powershell -> `git commit -m "commit message"` (commit changes)
terminal powershell -> `git checkout -b <branch-name>` (create new branch)

terminal powershell -> `git push origin master` (push changes to master)
terminal powershell -> `git push origin master:<branch-name>` (if branch already exists)
terminal powershell -> `git push origin <branch-name>` (push changes to branch)

# Stripe commands:
terminal CommandPrompt -> `stripe login`
terminal CommandPrompt -> `stripe listen --forward-to localhost:3000/api/webhook`