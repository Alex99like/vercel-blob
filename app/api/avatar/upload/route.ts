import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import axios from 'axios'

const url = "https://prod-files-secure.s3.us-west-2.amazonaws.com/3d9f4422-d6af-4734-8208-04195a73c696/036f52bc-c9f6-40ab-a6f0-6ba7f7b2c9e8/Rectangle_9.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20231030%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20231030T173307Z&X-Amz-Expires=3600&X-Amz-Signature=ec86c68a5bb77b5ea7b3eb666e83a2ff7a209f90961d499e0e10abe6967f354e&X-Amz-SignedHeaders=host&x-id=GetObject"

async function getImageAsBase64(url: string) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const image = Buffer.from(response.data, 'binary').toString('base64');
  return `data:image/png;base64,${image}`;
}

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = <string>searchParams.get('filename');
  // ⚠️ The below code is for App Router Route Handlers only

  const file = await getImageAsBase64(url)

  const blob = await put(filename, file, {
    access: 'public',
  });

  console.log(blob)

  return NextResponse.json({ blob });
}

// The next lines are required for Pages API Routes only
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }