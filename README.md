# NextJS-Cognito-App-Shell #

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It includes a cloud formation yaml and surrounding bash script to headlessly make your user pool. You may want to edit the aws-infrastructure components to put better prefixes on assets that better fit your planned app.

I'll eventually put a link in to the youTube video I used and copied from to give the YouTuber proper credit, but I am in a rush today.

## Getting Started

Basically, six steps right now, though again, you may want to edit the aws-infrastructure components as well to put better prefixes on assets that better fit your planned app.
```
$ npm install

$ cd aws-infrastructure-as-code

# Script assumes you are up-to-date with AWS CLI and have your favorite 
# account/ID profile active. There are various commands to explore which 
# account will be referenced by "$ aws" commands.
$ ./deploy-cognito-auth.sh

$ cp .env.sample .env

# MANUAL STEP: Edit the .env file to include the NEXT_USER_POOL_ID and the NEXT_USER_POOL_CLIENT_ID values.

$ npm run dev
```

If you are using different tools other than NPM, you can run the dev server in other ways...

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
