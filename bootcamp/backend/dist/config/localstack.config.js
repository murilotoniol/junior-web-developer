"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bucketName = exports.s3Client = exports.s3Config = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
exports.s3Config = {
    region: process.env.AWS_REGION || 'us-east-1',
    endpoint: process.env.AWS_ENDPOINT || 'http://localhost:4566',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'test',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'test',
    },
    forcePathStyle: true, // Necessário para LocalStack
};
exports.s3Client = new client_s3_1.S3Client(exports.s3Config);
exports.bucketName = process.env.S3_BUCKET_NAME || 'activity-images';
