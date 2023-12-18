# Strapi-provider-upload-minio
This is a provider for strapi that allows you to upload files to a minio server.

## Installation
use `npm` to install this package
```bash
npm install git+https://github.com/ericCHxia/strapi-provider-upload-minio.git
```
use `yarn` to install this package
```bash
yarn add git+https://github.com/ericCHxia/strapi-provider-upload-minio.git
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