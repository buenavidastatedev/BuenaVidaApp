import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { v2 as CloudinaryType, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
    constructor(
        @Inject('CLOUDINARY')
        private readonly cloudinary: typeof CloudinaryType,
    ) { }

    async uploadImage(
        file: Express.Multer.File,
        folder: string,
    ): Promise<UploadApiResponse> {
        if (!file) {
            throw new InternalServerErrorException('No file received');
        }

        return new Promise<UploadApiResponse>((resolve, reject) => {
            const upload = this.cloudinary.uploader.upload_stream(
                {
                    folder,
                    resource_type: 'image',
                },
                (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                    if (error || !result) {
                        return reject(
                            new InternalServerErrorException('Error uploading image to Cloudinary'),
                        );
                    }
                    resolve(result);
                },
            );

            Readable.from(file.buffer).pipe(upload);
        });
    }

    async deleteImage(publicId: string): Promise<void> {
        await this.cloudinary.uploader.destroy(publicId, {
            resource_type: 'image',
        });
    }
}