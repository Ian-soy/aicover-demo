# AI Cover

AI Cover Generator by [aicover.design](https://aicover.design)

[中文说明](/README_CN.md)

## Live Demo

[https://aicover.design](https://aicover.design)

## Quick Start

1. clone project

```shell
git clone https://github.com/all-in-aigc/aicover
```

2. install dependencies

```shell
cd aicover
pnpm install
```

3. init database

create your database use [local postgres](https://wiki.postgresql.org/wiki/Homebrew) or [vercel-postgres](https://vercel.com/docs/storage/vercel-postgres) or [supabase](https://supabase.com/)

create tables from sql at `data/install.sql`

4. set environmental values

put `.env.local` under `aicover` root dir with values list below

```
OPENAI_API_KEY=""

POSTGRES_URL=""

AWS_AK=""
AWS_SK=""
AWS_REGION=""
AWS_BUCKET=""

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

STRIPE_PUBLIC_KEY=""
STRIPE_PRIVATE_KEY=""

WEB_BASE_URI=""
```

5. local development

```shell
pnpm dev
```

open `http://localhost:3000` for preview

## Credit to

- [nextjs](https://nextjs.org/docs) for full-stack development
- [clerk](https://clerk.com/docs/quickstarts/nextjs) for user auth
- [aws s3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/upload-objects.html) for image storage
- [stripe](https://stripe.com/docs/development) for payment
- [node-postgres](https://node-postgres.com/) for data processing
- [tailwindcss](https://tailwindcss.com/) for page building
