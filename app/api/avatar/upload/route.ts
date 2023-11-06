import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import axios from 'axios'

const url = "https://prod-files-secure.s3.us-west-2.amazonaws.com/3d9f4422-d6af-4734-8208-04195a73c696/043c90a8-a7e3-4ab9-a594-7fbcbe1a8e70/Rectangle_8_%282%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20231106%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20231106T145805Z&X-Amz-Expires=3600&X-Amz-Signature=65936d5e35dbc634ec93fe832e37cef4f095f9170a048c077e1ef27a9174a80c&X-Amz-SignedHeaders=host&x-id=GetObject"

async function getImageAsBase64(url: string) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
    const uint8Array = new Uint8Array(response.data);
    return uint8Array;
}

 
export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');
  console.log(request.body)
  const blob = await put(filename!, request.body!, {
    access: 'public',
  });
  console.log(blob)

  return NextResponse.json(blob);
}

// export async function POST(request: Request): Promise<NextResponse> {
//   const { searchParams } = new URL(request.url);
//   const filename = <string>searchParams.get('filename');
//   // ⚠️ The below code is for App Router Route Handlers only

//   const file = await getImageAsBase64(url)

//   const blob = await put(filename, file, {
//     access: 'public',
//   });

//   console.log(blob)

//   return NextResponse.json({ blob });
// }

// // The next lines are required for Pages API Routes only
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }