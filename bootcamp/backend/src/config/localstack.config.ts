import { S3Client } from '@aws-sdk/client-s3';

export const s3Config = {
  region: process.env.AWS_REGION || 'us-east-1',
  endpoint: process.env.AWS_ENDPOINT || 'http://localhost:4566',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'test',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'test',
  },
  forcePathStyle: true, // Necessário para LocalStack
};

export const s3Client = new S3Client(s3Config);

export const bucketName = process.env.S3_BUCKET_NAME || 'activity-images';