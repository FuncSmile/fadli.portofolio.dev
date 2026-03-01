import { handleUpload } from '@vercel/blob/client';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
    const body = (await request.formData());
    const file = body.get('file') as File | null;

    if (!file) {
        return NextResponse.json(
            { error: 'No file provided' },
            { status: 400 }
        );
    }

    try {
        const blob = await put(file.name, file, {
            access: 'public',
        });

        return NextResponse.json(blob);
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json(
            { error: 'Error uploading file' },
            { status: 500 }
        );
    }
}
