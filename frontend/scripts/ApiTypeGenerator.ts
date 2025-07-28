import { generateApi } from 'swagger-typescript-api';

async function main() {
  try {
    await generateApi({
      url: 'http://localhost:5000/api-docs/v1/swagger.yaml',
      output: './types/generated',
      fileName: 'Api.ts',
    });
    console.log('API生成成功');
  } catch (err) {
    console.error('API生成失敗:', err);
  }
}

main();
