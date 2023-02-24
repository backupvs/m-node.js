import {
    S3Client,
    CopyObjectCommand,
    DeleteObjectCommand,
    DeleteObjectsCommand,
    ListObjectsV2Command,
    PutObjectCommand
} from "@aws-sdk/client-s3";
import { getRandomName } from "@utils/random.util";

const SIX_HOURS = 1000 * 60 * 60 * 6;

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
    // Copy the object to the new key with undescore
    const copyParams = {
        Bucket: process.env.BUCKET_NAME,
        CopySource: `${process.env.BUCKET_NAME}/${name}`,
        Key: `_${Date.now()}_${name}`,
    };
    await s3.send(new CopyObjectCommand(copyParams));

    // Delete the original object
    const deleteParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: name,
    };
    const deleteResponse = await s3.send(new DeleteObjectCommand(deleteParams));
};

export const clearDeletedImages = async () => {
    const now = Date.now();
    const keyObjects = await getSoftDeletedImages();
    if (keyObjects.length === 0) return 0;

    const toDelete = keyObjects.filter(obj => {
        const deletedAt = obj.Key?.substring(1).split("_")[0];
        return (now - Number(deletedAt)) > SIX_HOURS;
    });

    const params = {
        Bucket: process.env.BUCKET_NAME,
        Delete: { Objects: toDelete, Quiet: true }
    };

    await s3.send(new DeleteObjectsCommand(params));

    return toDelete.length || 0;
};

async function getSoftDeletedImages() {
    const listResult = await s3.send(new ListObjectsV2Command({
        Bucket: process.env.BUCKET_NAME
    }));

    if (listResult.Contents && listResult.Contents.length === 0) return [];
    
    return listResult.Contents!
        .map(({ Key }) => ({ Key }))
        .filter(obj => obj.Key?.startsWith("_"));
}

export const awsService = { uploadImage, softDeleteImage, clearDeletedImages };