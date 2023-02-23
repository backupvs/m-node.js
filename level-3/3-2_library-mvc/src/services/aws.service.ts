import { S3Client, PutObjectCommand, DeleteObjectCommand, PutObjectTaggingCommand } from "@aws-sdk/client-s3";
import { getRandomName } from "@utils/random.util";

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY!,
        secretAccessKey: process.env.SECRET_ACCESS_KEY!
    },
    region: process.env.BUCKET_REGION
});

export const uploadImage = async (imageFile: Express.Multer.File) => {
    const name = getRandomName();
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: name,
        Body: imageFile.buffer,
        ContentType: imageFile.mimetype
    };

    return { promise: s3.send(new PutObjectCommand(params)), generatedName: name };
};

export const softDeleteImage = async (name: string) => {
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: name,
        Tagging: {
            TagSet: [
                {
                    Key: "status",
                    Value: "delete"
                }
            ]
        }
    };

    return s3.send(new PutObjectTaggingCommand(params));
};

export const deleteImage = async (name: string) => {
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: name,
    };

    return s3.send(new DeleteObjectCommand(params));
};

export const awsService = { uploadImage, softDeleteImage, deleteImage };