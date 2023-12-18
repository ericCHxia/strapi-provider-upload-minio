# Strapi-provider-upload-minio
This is a provider for strapi that allows you to upload files to a minio server.

## Installation
use `npm` to install this package
```bash
npm install strapi-provider-upload-minio
```
use `yarn` to install this package
```bash
yarn add strapi-provider-upload-minio
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