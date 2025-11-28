import { generateApi } from 'swagger-typescript-api';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const outDir = resolve(process.cwd(), 'types/generated');
mkdirSync(outDir, { recursive: true });

async function main() {
  try {
    await generateApi({
      url: 'http://localhost:5000/api-docs/v1/swagger.yaml',
      output: outDir,
      fileName: 'Api.ts',
    });
    console.log('API生成成功');
  } catch (err) {
    console.error('API生成失敗:', err);
  }
}

main();
