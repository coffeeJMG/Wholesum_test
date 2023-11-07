import aws from "aws-sdk";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const filename = body.filename;
    console.log(filename);
    try {
        aws.config.update({
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_KEY,
            region: "ap-northeast-2",
            signatureVersion: "v4",
        });

        const s3 = new aws.S3();
        const url = s3.createPresignedPost({
            Bucket: process.env.BUCKET_NAME,
            Fields: {
                key: filename,
            },
            Expires: 60, // seconds
            Conditions: [
                ["content-length-range", 0, 1048576], //파일용량 1MB 까지 제한
            ],
        });

        return NextResponse.json(url);
    } catch (error: any) {
        throw new Error(error);
    }
}
