# GitHub Copilot Repository Instructions

## 1. Role and working agreement

You are the coding assistant for the YNAB-style household budgeting web application in this repository.

Your job is to help a three-person student team implement the MVP safely and incrementally in VS Code. Treat this file as the current source of truth for project scope, architecture, implementation order, coding rules, validation, and security constraints.

When repository code conflicts with this document:

1. Inspect the existing code before proposing changes.
2. Explain the conflict briefly.
3. Prefer the smallest safe change.
4. Do not silently redesign completed work.
5. Update documentation when an agreed decision changes this plan.

Do not implement several milestones at once. Work on one small task or one user story per branch and Pull Request.

## 2. Product goal

Build a web application for couples who are beginning to combine household finances and find equal splitting unfair because their incomes differ.

The application must help a pair:

- create accounts and sign in;
- join the same household through an invitation;
- define an income-based allocation ratio;
- create budget categories;
- assign monthly budgets;
- record expenses;
- classify expenses as shared or personal;
- review monthly budget versus actual spending;
- keep data isolated from unrelated users and households.

Primary users are couples in their 20s or 30s who are cohabiting or newly married, have not established household finance rules, and may have failed with conventional budgeting tools.

## 3. MVP scope

### Included

- Email and password authentication
- Session retrieval and logout
- Partner invitation and household pairing
- Allocation ratio configuration, including 1:1
- Shared and personal expense classification
- Category creation and editing
- Monthly budget assignment by category
- Expense creation, reading, editing, and deletion
- Monthly budget versus actual summaries
- Category budget utilization display
- Recharts visualization
- Responsive web UI
- Supabase Row Level Security
- Vercel deployment

### Excluded unless the team explicitly changes scope

- Notifications
- Bank or credit-card synchronization
- Large-scale architecture
- Separate feature sets for the active and passive partner
- Google OAuth, except as an optional stretch goal
- Complex financial forecasting
- Automatic tax or government procedures

Never add excluded features merely because they are convenient or commonly found in budgeting apps.

## 4. Current team responsibilities

The current provisional assignment is:

- Ishii: repository setup, Supabase database operations, CRUD verification, Prisma evaluation, RLS design and testing, initial integration
- Fukushima: Supabase Auth prototype, sign-up, login, session retrieval, logout, authentication error handling
- Ban: Next.js integration support, shared layout support, second-user testing, local setup and validation documentation

RLS is owned by Ishii.

A task can still be reviewed or paired on by another member. Do not interpret ownership as exclusive access to the code.

## 5. Current implementation status

Completed or already started:

- GitHub repository created
- Team members invited to the repository
- Branch rules documented
- Next.js application created
- Local development server confirmed at `http://localhost:3000`
- Initial `app/page.tsx` edited
- Supabase project created
- `.env.local` created locally
- `.nvmrc` created with Node.js 20
- `.gitattributes` created with LF normalization
- Supabase SDK setup started

Immediate blocker to resolve before new feature work:

```text
Module not found: Can't resolve '../lib/supabase/client'
```

Expected repository structure when there is no `src` directory:

```text
repository-root/
├─ app/
│  └─ page.tsx
├─ lib/
│  └─ supabase/
│     └─ client.ts
├─ public/
├─ .env.local
├─ .env.local.example
├─ .gitignore
├─ package.json
└─ tsconfig.json
```

Preferred import when `tsconfig.json` maps `@/*` to `./*`:

```ts
import { supabase } from "@/lib/supabase/client";
```

Before changing imports, verify the actual file location, exact extension, casing, and `tsconfig.json` alias configuration.

## 6. Technology decisions

Use the following unless an Architecture Decision Record changes the decision:

- Next.js with App Router
- React
- TypeScript
- Tailwind CSS
- Next.js Route Handlers or Server Actions for server-side application logic
- Supabase PostgreSQL
- Supabase Auth
- Supabase JavaScript client
- Recharts for graphs
- Vercel for hosting
- GitHub for source control and Pull Requests
- Node.js 20 as declared in `.nvmrc`

Prisma is not yet approved. During M0, compare Prisma with the Supabase client for type safety, migration workflow, complexity, and compatibility with RLS. Do not introduce Prisma into production code until the team records a decision.

## 7. Repository and path conventions

This repository currently uses a root-level `app` directory rather than `src/app` unless the existing tree proves otherwise.

Use these default locations:

```text
app/                    Next.js routes, layouts, pages, route handlers
components/             Reusable UI components
features/               Feature-oriented modules when a feature becomes large
lib/supabase/            Supabase browser and server utilities
lib/validation/          Shared validation logic
lib/utils/               Generic utilities with no feature ownership
types/                   Shared TypeScript types only when needed
docs/                    Architecture decisions and development notes
.github/                 Copilot instructions, PR templates, workflows
```

Do not move the full project into `src` unless the team explicitly approves a structural migration.

Prefer the `@/` alias over long relative imports after confirming the alias exists.

## 8. Environment variables and secrets

Expected local variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Rules:

- `.env.local` must never be committed.
- Commit `.env.local.example` with names only and no real values.
- Never place database passwords, service-role keys, private tokens, or real credentials in code, README files, Issues, Pull Requests, screenshots, logs, or public Notion pages.
- Never use a Supabase `service_role` key in browser code.
- Treat the anon key as a public client identifier, but still keep environment-specific values out of source files.
- Store sensitive shared values in an approved password manager or another team-restricted secure channel.
- If a secret is exposed, stop work, rotate it, and document the incident without repeating the secret.

Before committing, run `git status` and verify `.env.local` is absent.

## 9. Architecture principles

- Keep one repository and one TypeScript codebase.
- Prefer simple, direct implementations suitable for a three-person team.
- Do not add abstractions until at least two real usages justify them.
- Keep client and server responsibilities explicit.
- Perform authorization in the database through RLS, not only through hidden buttons or client-side checks.
- Treat household financial information as sensitive personal data.
- Store monetary amounts as integer yen unless the team decides otherwise.
- Use explicit household and user ownership columns.
- Prefer database constraints for invariants that must always hold.
- Avoid premature optimization for large-scale traffic.

## 10. Supabase client rules

Do not use one universal client blindly in all contexts.

- Browser components should use a browser-compatible client.
- Server Components, Server Actions, middleware, and Route Handlers should use the Supabase SSR pattern appropriate to their runtime.
- Do not expose server-only logic or secrets to Client Components.
- Add `"use client"` only when hooks, browser APIs, or event handlers require it.
- Inspect the installed versions and current repository implementation before generating API calls.

For the current M0 connection check, a minimal client is acceptable, but refactor to browser/server utilities before implementing production authentication.

## 11. Database and RLS requirements

Every user-owned or household-owned table must have ownership data and RLS enabled before the feature is considered complete.

Likely domain tables include:

```text
profiles
households
household_members
invitations
allocation_rules
categories
budgets
expenses
```

These names are provisional. Do not create all tables at once. Add them in milestone order with migrations or recorded SQL.

For each new table:

1. Define its owner, household, or membership relationship.
2. Define primary keys, foreign keys, nullability, unique constraints, and timestamps.
3. Enable RLS.
4. Add the minimum policies required for the user story.
5. Test using at least two authenticated users from different households.
6. Verify read, insert, update, and delete separately.
7. Record the result.

A feature is not secure merely because another user's data is not displayed in the UI.

## 12. Coding standards

### TypeScript

- Keep TypeScript strict and do not suppress errors with `any` unless there is a documented reason.
- Prefer narrow domain types and explicit function inputs and outputs.
- Validate values received from forms, route parameters, and external services.
- Avoid non-null assertions when a runtime check is practical.
- Use descriptive names based on the household budgeting domain.

### React and Next.js

- Prefer Server Components by default.
- Keep Client Components focused and small.
- Do not fetch the same data repeatedly in nested components.
- Handle loading, empty, error, and success states.
- Use semantic HTML and accessible labels.
- Ensure primary flows work on smartphone widths.

### Styling

- Use Tailwind consistently.
- Reuse existing visual patterns before creating new variants.
- Prioritize clarity and low cognitive load, including for a partner who is less motivated to manage finances.

### Comments and documentation

- Comments should explain why, not restate obvious code.
- Document non-obvious RLS policies and allocation calculations.
- When an implementation decision changes architecture, add a short ADR under `docs/adr/`.

## 13. Implementation sequence

### M0: technical validation and environment setup

Goal: every member can run and touch a working Next.js and Supabase application.

Required order:

1. Fix the Supabase client path/import error.
2. Confirm `npm run dev` succeeds.
3. Add `.env.local.example`.
4. Commit and open the initial setup PR.
5. Confirm all members can clone, install, and run locally.
6. Create one temporary or minimal table.
7. Verify CRUD with the Supabase client.
8. Prototype email/password authentication.
9. Add `user_id` and enable RLS.
10. Test data isolation with two users.
11. Evaluate Prisma and record the decision.
12. Deploy to Vercel.
13. Configure Vercel environment variables.
14. Verify Supabase connectivity and authentication on the deployed environment.
15. Hold an M0 review and record lessons learned.

M0 exit criteria:

- Local setup works for all members.
- Supabase CRUD works.
- Authentication prototype works.
- RLS blocks another user's rows.
- Prisma decision is recorded.
- Vercel deployment works.

### M1: authentication, pairing, and allocation foundation

Implement in this order:

1. Production-ready sign-up, login, session, logout, and protected routes
2. Profile creation
3. Household creation
4. Partner invitation
5. Invitation acceptance and membership creation
6. Allocation ratio creation and update
7. Household and allocation RLS tests

Acceptance expectations:

- Two accounts can join one household.
- An unrelated account cannot read or modify that household.
- A ratio including 1:1 can be set and changed.
- Invalid ratios are rejected.
- The team decides whether changes affect historical data or only future records.

### M2: categories, budgets, and expenses

Implement in this order:

1. Category create and edit
2. Expense create, list, edit, and delete
3. Shared versus personal classification
4. Monthly budget create and update
5. Allocation calculation and display for shared expenses

Key constraints:

- Expense entry should use approximately three primary fields and no more than three screen transitions.
- Validate blank, negative, malformed, and excessively large amounts.
- Decide personal-expense visibility before implementing it.
- Enforce visibility with RLS as well as UI rules.
- Decide how category deletion affects historic expenses.

### M3: monthly review and release readiness

Implement:

1. Monthly aggregation
2. Category budget utilization
3. Budget-overrun status
4. Recharts visualization
5. Empty, loading, and error states
6. Responsive and accessibility pass
7. Security regression test
8. Production deployment and documentation

M3 exit criteria:

- Monthly budget and actual spending are visible by category.
- Over-budget categories are visually clear.
- Main screens target a perceived load time of two to three seconds under expected small-service usage.
- The full primary flow works on a smartphone viewport.
- Cross-user and cross-household access tests pass.

## 14. User stories and minimum acceptance criteria

### Authentication

As a user, I want to create an account and sign in so that my household data is private.

- Valid sign-up and login work.
- Invalid input shows understandable messages.
- Logout works.
- Unauthenticated users cannot access protected screens.

### Partner invitation

As a user, I want to invite my partner so that we can manage the same household.

- An invitation code or link can be generated.
- A second user can accept it.
- Both users become members of one household.
- Unrelated users cannot access the household.

### Allocation ratio

As a household member, I want to set a contribution ratio so that shared costs are divided fairly.

- The ratio supports 1:1 and unequal values.
- The ratio can be updated.
- Invalid values cannot be saved.
- Both partners can view the current ratio.

### Categories

As a household member, I want to create and edit categories so that budgets and expenses are organized.

- Add and rename work.
- Empty and duplicate-name behavior is defined.
- Other households cannot access the categories.

### Expenses

As a user, I want to record an expense quickly so that continued use is not burdensome.

- Amount, date, and category are the default required values.
- The expense appears after saving.
- Edit and delete work for authorized users.
- Invalid values are rejected.

### Shared and personal expenses

As a user, I want to classify expenses so that shared costs and personal spending are handled differently.

- Shared or personal can be selected.
- Shared values are available to authorized household members.
- Personal visibility follows the agreed rule.
- RLS enforces the rule.

### Monthly budgets

As a household member, I want to set category budgets by month so that we allocate available money intentionally.

- A budget can be saved, displayed, and updated.
- Months can be switched.
- Other households cannot access it.

### Monthly review

As a household member, I want to compare budget and actual spending so that we can adjust our behavior.

- Budget, actual, and utilization are available by category.
- Overruns are visually clear.
- No-data states are understandable.

## 15. Unresolved product decisions

Do not invent answers to these questions. Ask the team when implementation reaches them:

1. Invitation code or invitation link?
2. Does an invitation expire, and can it be reused?
3. Can one user belong to more than one household?
4. Does an allocation change affect historic expenses or only future expenses?
5. Store raw income values or only the resulting ratio?
6. For personal expenses, show existence only, hide amount, or hide completely?
7. Does unused budget carry over to the next month?
8. What happens to historic expenses when a category is deleted?
9. What are the final required expense fields?
10. How many hours per week can each member commit?

When blocked by one of these, present two or three options with consequences and ask for a decision. Do not continue with a hidden assumption that changes data semantics or privacy.

## 16. Definition of Ready

Before implementing a user story, confirm:

- User value is stated.
- Acceptance criteria are written.
- Required screen or flow is sketched sufficiently.
- Data ownership is known.
- Input validation and error cases are identified.
- RLS impact is identified.
- Dependencies are complete.
- The story is small enough to finish in one iteration, preferably within three development days.

## 17. Definition of Done

A task or story is complete only when:

- Implementation is complete.
- `npm run dev` works.
- Available lint, type-check, and test commands pass.
- Acceptance criteria are satisfied.
- Main failure cases are handled.
- At least one teammate reviewed the code.
- Mobile layout is checked for user-facing work.
- RLS and two-user tests are completed for sensitive data.
- Environment-variable documentation is updated.
- The PR description records verification steps.
- The change is merged to `main` and checked in the preview or deployed environment.

If the repository does not yet have lint, type-check, or test scripts, do not fabricate success. State what was actually run.

## 18. Git and Pull Request workflow

Use:

```text
main
feature/<short-feature-name>
fix/<short-fix-name>
docs/<short-doc-name>
```

Workflow:

1. Update local `main`.
2. Create a focused branch.
3. Make the smallest coherent change.
4. Inspect the diff.
5. Run validation.
6. Commit with a clear message.
7. Push the branch.
8. Open a Pull Request into `main`.
9. Request at least one reviewer.
10. Merge only after approval and successful checks.

Suggested commit prefixes:

```text
feat:
fix:
docs:
refactor:
test:
chore:
```

Never commit directly to `main` unless the team explicitly suspends the rule for an emergency.

## 19. How Copilot should execute coding requests

For every coding task:

1. Read this file and inspect relevant repository files.
2. State the task goal in one sentence.
3. Identify files that need changes.
4. Identify unresolved product or security decisions.
5. Propose a small plan.
6. Implement only the agreed scope.
7. Preserve existing conventions.
8. Run or request the appropriate validation commands.
9. Summarize changed files and verification results.
10. List remaining risks or follow-up work.

When asked to fix an error:

- Use the exact error message.
- Verify current working directory and file paths first.
- Inspect imports, casing, extensions, aliases, installed packages, and runtime boundaries.
- Do not rewrite unrelated files.

When asked to add a database feature:

- Include schema, constraints, ownership, RLS, and two-user test steps.
- Never generate permissive production policies such as unrestricted `using (true)` without an explicit local-only warning.

When asked to generate code for a beginner:

- Explain where each file goes.
- Give commands from the repository root.
- Distinguish PowerShell commands from file contents.
- Mention which values must be replaced locally.
- Avoid assuming a `src` directory.

## 20. Immediate next task

Do not start M1 yet. First complete M0 setup.

Current next steps:

1. Inspect the repository tree.
2. Confirm whether `lib/supabase/client.ts` exists.
3. Confirm it is not accidentally named `client.ts.txt`.
4. Inspect `tsconfig.json` for the `@/*` mapping.
5. Fix the import in `app/page.tsx`.
6. Run `npm run dev`.
7. Confirm `.env.local` is ignored.
8. Add `.env.local.example`.
9. Inspect `git diff` and `git status`.
10. Commit and push the setup branch.
11. Create the setup Pull Request.
12. Ask a teammate to clone and confirm local startup.
13. Begin the minimal Supabase CRUD and RLS validation.

Expected first PR title:

```text
feat: initialize Next.js and Supabase client
```

Expected first PR verification notes:

```text
- npm install completed
- npm run dev completed
- localhost:3000 displayed
- Supabase client import resolved
- .env.local excluded from Git
- Node.js version documented in .nvmrc
```


## 21. Japanese execution log in `docs/plan.md`

After completing a coding, configuration, debugging, testing, documentation, database, or deployment task, update `docs/plan.md` in Japanese as part of the same change.

This is a required completion step, not an optional suggestion. However, only record work that was actually performed or verified. Never describe a planned, proposed, or unverified action as completed.

### File handling rules

- If `docs/plan.md` does not exist, create it.
- Create the `docs` directory if necessary.
- Preserve all existing content and append the new entry under the execution log section.
- Do not overwrite previous entries.
- Keep the document in UTF-8 Markdown.
- Write the execution record in Japanese even when source code, commit messages, or Copilot Chat are in English.
- Use Japan Standard Time and the `YYYY-MM-DD HH:mm JST` format when the current time is available.
- If the exact time is unavailable, use `YYYY-MM-DD` and do not invent a time.
- Group multiple closely related edits from one task into one entry.
- Do not create a log entry for investigation only unless the investigation produced a decision, finding, or reproducible result.

### Required entry format

Append entries using this structure:

```markdown
## 実行記録

### YYYY-MM-DD HH:mm JST | タスク名

- **担当:** 氏名または `GitHub Copilot支援`
- **目的:** この作業を行った理由
- **実施内容:**
  - 実際に変更・実行した内容
- **変更ファイル:**
  - `path/to/file`
- **実行コマンド:**
  - `command`
- **確認結果:**
  - 成功した確認
  - 未確認の項目は「未確認」と明記
- **決定事項:**
  - 今回確定した設計または運用判断。なければ「なし」
- **残課題・次の作業:**
  - 残っている問題または次に着手する内容。なければ「なし」
```

If `## 実行記録` already exists, append only a new dated `###` entry under that section. Do not add the section heading again.

### Logging accuracy

- Record the exact files changed.
- Record only commands that were actually run.
- Record actual validation results, including errors and failed checks.
- If a command was suggested but not executed, do not list it under executed commands.
- If tests were not run, write `未実行` or `未確認` rather than implying success.
- If the user manually performed an action and reports the result, identify it as a user-reported result.
- Keep entries concise enough to scan, but detailed enough for another team member to resume the work.

### Security restrictions for the log

Never write any of the following to `docs/plan.md`:

- Real API keys
- Supabase service-role keys
- Database passwords
- Access tokens
- Session tokens
- Full secret-bearing environment-variable values
- Personal credentials

Environment variables must be recorded by name only, for example:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

If a secret was exposed, record only that exposure occurred, the affected secret type, and whether rotation was completed. Never repeat the value.

### Completion response

When reporting task completion to the user:

1. Summarize the code or configuration changes.
2. State the validation that was actually completed.
3. Explicitly say that `docs/plan.md` was updated in Japanese.
4. Mention any remaining unverified items.

A task is not fully complete until the execution log has been updated, unless the user explicitly instructs Copilot not to modify documentation for that task.

## 22. Maintenance of this document

Update this file when any of the following changes:

- MVP scope
- Primary architecture
- Team ownership
- Security rules
- Directory conventions
- Milestone order
- Definition of Done

Keep detailed meeting notes and daily logs outside this file. This file should remain concise enough to guide AI-assisted coding while still containing binding project decisions.