import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client, bucketName } from '../../../config/localstack.config';
import { BusinessException } from '../../../shared/exceptions/business.exception';
import { randomUUID } from 'crypto';

export class StorageService {
  private readonly allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

  /**
   * Valida se o arquivo é uma imagem válida
   */
  private validateImage(mimetype: string): void {
    if (!this.allowedMimeTypes.includes(mimetype)) {
      throw BusinessException.invalidImageFormat();
    }
  }

  /**
   * Faz upload de imagem para o S3 (LocalStack)
   */
  async uploadImage(
    file: Express.Multer.File,
    folder: string = 'images'
  ): Promise<string> {
    this.validateImage(file.mimetype);

    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${folder}/${randomUUID()}.${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await s3Client.send(command);

    // Retorna a URL pública (no LocalStack)
    return `http://localhost:4566/${bucketName}/${fileName}`;
  }

  /**
   * Gera URL pré-assinada para download
   */
  async getPresignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    return getSignedUrl(s3Client, command, { expiresIn });
  }

  /**
   * Deleta imagem do S3
   */
  async deleteImage(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    await s3Client.send(command);
  }
}