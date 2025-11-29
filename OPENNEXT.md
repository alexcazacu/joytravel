# OpenNext Compatibility Guide

This Next.js template is specifically configured for OpenNext compatibility, enabling seamless deployment to AWS infrastructure.

## Key Configuration

### 1. Standalone Output

The most critical configuration for OpenNext compatibility is the `standalone` output mode in `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  output: 'standalone',
  // ... other config
};
```

This setting tells Next.js to create a self-contained build that can run independently without requiring the full `node_modules` directory.

### 2. App Router

This template uses Next.js App Router (located in `src/app/`), which is fully supported by OpenNext and provides:

- Server Components by default
- Built-in layouts and templates
- Enhanced routing capabilities
- Streaming and Suspense support

### 3. Supported Features

OpenNext supports all major Next.js 15 features used in this template:

- ✅ **App Router** - Modern routing with Server Components
- ✅ **API Routes** - Can be added in `src/app/api/`
- ✅ **Dynamic Routes** - Full support for `[param]` routes
- ✅ **Static Site Generation (SSG)** - Pre-rendered pages
- ✅ **Server-Side Rendering (SSR)** - On-demand rendering
- ✅ **Incremental Static Regeneration (ISR)** - Time-based revalidation
- ✅ **Middleware** - Edge and Node.js middleware
- ✅ **Server Actions** - Server-side mutations
- ✅ **Image Optimization** - Next.js Image component

## Build Process

When you run `npm run build`, Next.js will create:

1. `.next/standalone/` - Self-contained application
2. `.next/static/` - Static assets
3. `public/` - Public assets

OpenNext takes these outputs and packages them for AWS Lambda and other serverless environments.

## Future Infrastructure

This template is ready for AWS deployment. The infrastructure setup (using tools like SST, CDK, or Terraform) will be added later. The infrastructure will typically include:

- **AWS Lambda** - For server-side rendering
- **S3** - For static assets
- **CloudFront** - For CDN distribution
- **API Gateway** - For routing
- **DynamoDB** - For ISR cache (optional)

## Adding OpenNext Configuration

When ready to deploy, you can add an `open-next.config.ts` file at the project root:

```typescript
import type { OpenNextConfig } from '@opennextjs/aws';

const config: OpenNextConfig = {
  default: {
    // Custom configuration here
  },
};

export default config;
```

## Development Workflow

1. **Local Development**: `npm run dev`
2. **Build**: `npm run build`
3. **Test Production Build**: `npm run start`
4. **Deploy**: Infrastructure commands (to be added)

## Resources

- [OpenNext Documentation](https://opennext.js.org/aws)
- [Next.js Documentation](https://nextjs.org/docs)
- [OpenNext GitHub](https://github.com/opennextjs/opennextjs-aws)
- [SST Documentation](https://sst.dev/docs/start/aws/nextjs)

## Compatibility Notes

- Minimum Node.js version: 20.9+
- OpenNext supports Next.js 12.3.4 and above
- This template uses Next.js 15 (latest stable)
- All features in this template are OpenNext-compatible
