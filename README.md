# NextJS-Cognito-App-Shell #

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It includes a cloud formation yaml and surrounding bash script to headlessly make your user pool. You may want to edit the aws-infrastructure components to put better prefixes on assets that better fit your planned app.

Huge thanks to Alex Ruskin and his [Step-by-Step NextJS Auth Setup with AWS Cognito](https://youtu.be/wiWDOgIu7cU?si=CzEyA1PqNKEd-dEQ) YouTube video. A super clean and organized way to introduce Cognito to the shell app. Subscribe to [Alex's channel on YouTube](https://www.youtube.com/@alexrusin) for more great learnin'.

It appeared that the default NextJS app was a bit challenged when it came to dark mode (e.g., text and label font colors would "disappear" on the SideNav or forms), so we found a nice fix for that. Huge thanks goes to Dave Grey, who provided an excellent post on [Light and Dark Mode in Next.js App router + Tailwind with No Flicker](https://www.davegray.codes/posts/light-dark-mode-nextjs-app-router-tailwind). This post also points you to a short and sweet [YouTube video](https://www.youtube.com/watch?v=7zqI4qMDdg8) that gets you through the essentials. [Dave's channel on YouTube](https://www.youtube.com/@DaveGrayTeachesCode) is another great resource, as is [his blog](https://www.davegray.codes/). 


## Getting Started

Recommended that one use this as a "starter project" for when one wants a NextJS app that also uses AWS Cognito for their user management. In most cases, unless you are contributing to improving this starter project, you will want to just copy the repo (e.g., download a zip of it into a folder representing your own new project), and go to town on it.

Not completely automated, but only a few simple steps right now, though again, you may want to edit the aws-infrastructure components as well to put better prefixes on assets that better fit your planned app.
```
npm install

# Script assumes you are up-to-date with AWS CLI and have your favorite 
# account/ID profile active. There are various commands to explore which 
# account will be referenced by "$ aws" commands.
cd aws-infrastructure-as-code
./deploy-cognito-auth.sh <Your-Prefix>
cd ..

cp .env.example .env
#
# MANUAL STEP: Edit the .env file to include the NEXT_USER_POOL_ID 
#              and the NEXT_USER_POOL_CLIENT_ID values.

# Launch it to localhost:3000
npm run dev
```
After that you can go to town, changing logo, wiring up Contact US, etc.

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

Other things to consider: 

1. I tried bringing the project up to what was now the @Latest of both Next and React, but failed miserably, and ended up rolling back to Next.js 14.1.4. I suspect there will be some vulnerabilities whihc will drive another try. All I can say is that flexible Auth is a bear and a huge time sync.

1. Be sure to change out the public/logo-light.png and public/logo-dark.png with your preferred logos. 

1. The Contact Us page is set up but not wired. A future improvement might be to optionally set up SES on the same AWS account to be able to have it wired and ready to go once a project is established.

1. The theme is still a bit scraggly, left over form the Vercel Next Tutorial. I think it deserves some super clean-up and standardizing so that all the page and layout files don't have a bunc hof Tailwind in them. As nice as Tailwind is, no one wants to read 20 or so class modifiers when just rrying to get a functional layout.

1. One place the theme is a mess is the dashboard sidenav, when on a small screen, does not go hamburger and instead goes permanently stacked and visible.  Yuck. Another big todo, but of course, perhaps people don't want a dashboard so it might not be an issue.

## Contact Us Infrastructure Setup (SES + Lambda + API Gateway)

This stack wires up infrastructure for the "Contact Us" form handler using AWS SES, Lambda, and API Gateway.

### Prerequisites

* AWS CLI is installed and configured (`aws configure`)
* A verified email address in SES (manual step, see below)

### Step 1: Verify a Destination Email with SES

Amazon SES requires all email recipients to be verified in **Sandbox Mode** (which is the default in most new AWS accounts).

1. Go to the [SES Console](https://console.aws.amazon.com/ses/home).
2. Navigate to **Verified identities**.
3. Click **Create identity** and select **Email address**.
4. Enter your desired recipient email (e.g., `team@example.com`) and click **Create identity**.
5. Check your inbox and click the verification link.
6. Once verified, you can use this address as the value of the `VerifiedEmail` parameter in deployment.

You can skip this step if your SES account is already in **production mode** (i.e., not sandboxed).

### Step 3: Deploy the Stack


```bash
cd aws-infrastructure-as-code 
./deploy-ses-contact-us.sh <prefix> <s3-bucket-name> <lambda-zip-path> <verified-email>
```

For example:

```bash
./deploy-ses-contact-us.sh myapp my-lambda-artifacts-bucket contact-handler.zip team@example.com
```

This will:

* Create the S3 bucket if needed
* Create and upload your ZIP
* Deploy a CloudFormation stack named `<prefix>-ses-contact-stack`
* Output a usable API endpoint for your Contact Us form

### Step 4: Hook It Up

Use the generated API Gateway endpoint in your Contact Us form (ui/forms/ContactUsForm.tsx) frontend code. It should POST JSON like:

```json
{
  "email": "bobbu@example.com",
  "message": "Just wanted to say hi!"
}
```
### Minimizng Your Messages Going to Junk Mail 

Automated emailers are notorious for getting labeled as junk by various services. There are a number of things tyou can do to prevent your important "Contact Us" messages from getting lost in junk. First, you can take it one step further and just write messages received into a database you control. Short of that, if just using SES as we offer here, you can follow the guideliunes outliend in this
[Email Deliverability Checklist](docs/email_deliverability_checklist.md) for more.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
