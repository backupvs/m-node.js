import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY!,
        secretAccessKey: process.env.SECRET_ACCESS_KEY!
    },
    region: process.env.BUCKET_REGION
});

export const uploadImage = async (imageFile: Express.Multer.File, imageName: string) => {
    const params = {
        Bucket: process.env.BUCKET_NAME!,
        Key: imageName,
        Body: imageFile.buffer,
        ContentType: imageFile.mimetype
    };

    const command = new PutObjectCommand(params);

    return s3.send(command);
};

export default { uploadImage };