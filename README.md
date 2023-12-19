# Strapi-provider-upload-minio
This is a provider for strapi that allows you to upload files to a minio server.

## Installation
use `npm` to install this package
```bash
npm install https://github.com/ericCHxia/strapi-provider-upload-minio/releases/download/v1.0.0/strapi-provider-upload-minio-v1.0.1.tgz
```
use `yarn` to install this package
```bash
yarn add https://github.com/ericCHxia/strapi-provider-upload-minio/releases/download/v1.0.0/strapi-provider-upload-minio-v1.0.1.tgz
```

## Configuration
To configure the provider you need to add the following settings to your `config/plugins.ts` file.
```ts
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "strapi-provider-upload-minio",
      providerOptions: {
        endPoint: env("MINIO_ENDPOINT"),
        accessKey: env("MINIO_ACCESS_KEY_ID"),
        secretKey: env("MINIO_ACCESS_SECRET"),
        bucket: env("MINIO_BUCKET"),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});

```