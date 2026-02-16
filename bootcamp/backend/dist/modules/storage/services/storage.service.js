"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const localstack_config_1 = require("../../../config/localstack.config");
const business_exception_1 = require("../../../shared/exceptions/business.exception");
const crypto_1 = require("crypto");
class StorageService {
    constructor() {
        this.allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    }
    /**
     * Valida se o arquivo é uma imagem válida
     */
    validateImage(mimetype) {
        if (!this.allowedMimeTypes.includes(mimetype)) {
            throw business_exception_1.BusinessException.invalidImageFormat();
        }
    }
    /**
     * Faz upload de imagem para o S3 (LocalStack)
     */
    async uploadImage(file, folder = 'images') {
        this.validateImage(file.mimetype);
        const fileExtension = file.originalname.split('.').pop();
        const fileName = `${folder}/${(0, crypto_1.randomUUID)()}.${fileExtension}`;
        const command = new client_s3_1.PutObjectCommand({
            Bucket: localstack_config_1.bucketName,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
        });
        await localstack_config_1.s3Client.send(command);
        // Retorna a URL pública (no LocalStack)
        return `http://localhost:4566/${localstack_config_1.bucketName}/${fileName}`;
    }
    /**
     * Gera URL pré-assinada para download
     */
    async getPresignedUrl(key, expiresIn = 3600) {
        const command = new client_s3_1.GetObjectCommand({
            Bucket: localstack_config_1.bucketName,
            Key: key,
        });
        return (0, s3_request_presigner_1.getSignedUrl)(localstack_config_1.s3Client, command, { expiresIn });
    }
    /**
     * Deleta imagem do S3
     */
    async deleteImage(key) {
        const command = new client_s3_1.DeleteObjectCommand({
            Bucket: localstack_config_1.bucketName,
            Key: key,
        });
        await localstack_config_1.s3Client.send(command);
    }
}
exports.StorageService = StorageService;
