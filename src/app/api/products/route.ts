import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const filePath = path.join(process.cwd(), 'public', 'products.json');
    const fileContents = await fs.promises.readFile(filePath, 'utf8');
    const allProducts = JSON.parse(fileContents);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const products = allProducts.slice(startIndex, endIndex);

    return NextResponse.json({
      products,
      currentPage: page,
      totalPages: Math.ceil(allProducts.length / limit),
    });
  } catch (error) {
    console.error('Error reading products file:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}