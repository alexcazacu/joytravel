# JoyTravel

A Next.js 15 application compatible with OpenNext for AWS deployment.

## Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **ESLint** for code quality
- **OpenNext compatible** with standalone output enabled

## Getting Started

### Prerequisites

- Node.js 20.9 or higher
- npm, yarn, or pnpm

### Installation

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

Build the application for production:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

This will create a standalone build in `.next/standalone` that's compatible with OpenNext.

### Lint

Run ESLint:

```bash
npm run lint
# or
yarn lint
# or
pnpm lint
```

## OpenNext Compatibility

This project is configured for OpenNext compatibility with the following settings:

- `output: 'standalone'` in `next.config.ts`
- App Router structure
- TypeScript support
- All Next.js 15 features supported

## Project Structure

```
joytravel/
├── src/
│   └── app/
│       ├── layout.tsx      # Root layout
│       ├── page.tsx        # Home page
│       └── globals.css     # Global styles
├── public/                 # Static assets
├── next.config.ts          # Next.js configuration
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── postcss.config.mjs     # PostCSS configuration
├── eslint.config.mjs      # ESLint configuration
└── package.json           # Dependencies
```

## Deployment

This application is ready to be deployed using OpenNext to AWS. Infrastructure setup will be added later.

For more information about OpenNext, visit [opennext.js.org](https://opennext.js.org/aws).

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [OpenNext Documentation](https://opennext.js.org/aws)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
