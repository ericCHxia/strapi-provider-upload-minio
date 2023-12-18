import type { ReadStream } from "node:fs";
import minio from "minio";
import { ClientOptions } from "minio";
export interface MinioProviderConfig extends ClientOptions {
  bucket: string;
  signatureUrlExpires?: number;
  [key: string]: any;
}
interface File {
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: Record<string, unknown>;
  hash: string;
  ext?: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  path?: string;
  provider?: string;
  provider_metadata?: Record<string, unknown>;
  stream?: ReadStream;
  buffer?: Buffer;
  rootPath?: string;
}
module.exports = {
  init: ({ rootPath, ...config }: MinioProviderConfig) => {
    const client = new minio.Client(config);
    const filePrefix = rootPath ? `${rootPath.replace(/\/+$/, "")}/` : "";
    const getFileKey = (file: File) => {
      const path = file.path ? `${file.path}/` : "";
      return `${filePrefix}${path}${file.hash}${file.ext}`;
    };
    const upload = async (file: File) => {
      const fileKey = getFileKey(file);
      const metaData = {
        "Content-Type": file.mime,
      };
      const data = file.stream || Buffer.from(file.buffer as any, "binary");
      await client.putObject(config.bucket, fileKey, data, metaData);
    };
    return {
      upload(file: File) {
        return upload(file);
      },
      uploadStream(file: File) {
        return upload(file);
      },
      async isPrivate() {
        return true;
      },
      delete(file: File) {
        const fileKey = getFileKey(file);
        return client.removeObject(config.bucket, fileKey);
      },
      async getSignedUrl(file: File) {
        const fileKey = getFileKey(file);
        const url = await client.presignedUrl(
          "GET",
          config.bucket,
          fileKey,
          config.signatureUrlExpires || 24 * 60 * 60
        );
        return { url };
      },
    };
  },
};
