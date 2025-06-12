# NextJS-Cognito-App-Shell #

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It includes a cloud formation yaml and surrounding bash script to headlessly make your user pool. You may want to edit the aws-infrastructure components to put better prefixes on assets that better fit your planned app.

Huge thanks to Alex Ruskin and his [Step-by-Step NextJS Auth Setup with AWS Cognito](https://youtu.be/wiWDOgIu7cU?si=CzEyA1PqNKEd-dEQ) YouTube video. A super clean and organized way to introduce Cognito to the shell app. Subscribe to [Alex's channel on YouTube](https://www.youtube.com/@alexrusin) for more great learnin'.

It appeared that the default NextJS app was a bit challenged when it came to dark mode (e.g., text and label font colors would "disappear" on the SideNav or forms), so we found a nice fix for that. Huge thanks goes to Dave Grey, who provided an excellent post on [Light and Dark Mode in Next.js App router + Tailwind with No Flicker](https://www.davegray.codes/posts/light-dark-mode-nextjs-app-router-tailwind). This post also points you to a short and sweet [YouTube video](https://www.youtube.com/watch?v=7zqI4qMDdg8) that gets you through the essentials. [Dave's channel on YouTube](https://www.youtube.com/@DaveGrayTeachesCode) is another great resource, as is [his blog](https://www.davegray.codes/). 


## Getting Started

Not completely automated, but only a few simple steps right now, though again, you may want to edit the aws-infrastructure components as well to put better prefixes on assets that better fit your planned app.
```
npm install

# Script assumes you are up-to-date with AWS CLI and have your favorite 
# account/ID profile active. There are various commands to explore which 
# account will be referenced by "$ aws" commands.
cd aws-infrastructure-as-code
./deploy-cognito-auth.sh
cd ..

cp .env.sample .env
# MANUAL STEP: Edit the .env file to include the NEXT_USER_POOL_ID and the NEXT_USER_POOL_CLIENT_ID values.

# Launch it to localhost:3000
npm run dev
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
