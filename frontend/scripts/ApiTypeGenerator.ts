// import * as fs from 'fs';
// import * as path from 'path';
// import YAML from 'yaml';
// import prettier from 'prettier';
// import { fileURLToPath } from 'url';

// // __dirname の代替
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // OpenAPI 3.0 スキーマ定義の一部（必要に応じて拡張可能）
// interface OpenAPISpec {
//   components?: {
//     schemas?: Record<string, SchemaObject>;
//   };
//   paths: Record<string, PathItemObject>;
// }

// interface PathItemObject {
//   [method: string]: OperationObject | undefined; // get, post, put, delete など
// }

// interface OperationObject {
//   operationId?: string;
//   security?: unknown;
//   requestBody?: RequestBodyObject;
//   parameters?: ParameterObject[];
//   responses: Record<string, ResponseObject>;
// }

// interface RequestBodyObject {
//   required?: boolean;
//   content: Record<string, MediaTypeObject>;
// }

// interface MediaTypeObject {
//   schema?: SchemaObject;
// }

// interface ParameterObject {
//   name: string;
//   in: 'query' | 'header' | 'path' | 'cookie';
//   required?: boolean;
//   schema?: SchemaObject;
// }

// interface ResponseObject {
//   description?: string;
//   content?: Record<string, MediaTypeObject>;
// }

// interface SchemaObject {
//   $ref?: string;
//   type?: string;
//   format?: string;
//   required?: string[];
//   properties?: Record<string, SchemaObject>;
//   items?: SchemaObject;
// }

// // メイン処理
// export async function generateApiTypes() {
//   const specPath = path.resolve(__dirname, '../swagger/v1/swagger.yaml');
//   const file = fs.readFileSync(specPath, 'utf-8');
//   const spec = YAML.parse(file) as OpenAPISpec;

//   let output = `/**\n * This file is auto-generated from swagger.yaml\n */\n\n`;

//   // components.schemas から型を生成（あれば）
//   if (spec.components?.schemas) {
//     for (const [name, schema] of Object.entries(spec.components.schemas)) {
//       output += generateTypeFromSchema(name, schema);
//     }
//   }

//   // paths を処理
//   for (const [route, methods] of Object.entries(spec.paths)) {
//     for (const [method, operation] of Object.entries(methods)) {
//       if (!operation) continue;

//       const operationId = operation.operationId || generateOperationId(method, route);

//       if (operation.security) {
//         output += `// Security: ${JSON.stringify(operation.security)}\n`;
//       }

//       // リクエストボディ型生成
//       const requestBodySchema = operation.requestBody?.content['application/json']?.schema;
//       if (requestBodySchema) {
//         const typeName = capitalize(operationId) + 'Request';
//         output += generateTypeFromSchema(typeName, requestBodySchema);
//       }

//       // パラメータ型生成
//       if (operation.parameters) {
//         const paramTypeName = capitalize(operationId) + 'Params';
//         output += generateParamsInterface(paramTypeName, operation.parameters);
//       }

//       // レスポンス型生成（複数対応）
//       if (operation.responses) {
//         for (const [status, response] of Object.entries(operation.responses)) {
//           const schema = response.content?.['application/json']?.schema;
//           if (schema) {
//             const typeName = `${capitalize(operationId)}Response${status}`;
//             output += generateTypeFromSchema(typeName, schema);
//           }
//         }
//       }
//     }
//   }

//   const formatted = await prettier.format(output, { parser: 'typescript' });
//   fs.writeFileSync(path.resolve(__dirname, '../types/api.d.ts'), formatted);
//   console.log('TypeScript definitions generated.');
// }

// // パラメータの型を生成
// function generateParamsInterface(typeName: string, parameters: ParameterObject[]): string {
//   const props = parameters
//     .map(param => {
//       const optionalMark = param.required ? '' : '?';
//       const tsType = mapOpenAPITypeToTS(param.schema);
//       return `  ${param.name}${optionalMark}: ${tsType}; // in: ${param.in}`;
//     })
//     .join('\n');

//   return `export interface ${typeName} {\n${props}\n}\n\n`;
// }

// // スキーマから型を生成（再帰的に無名オブジェクトも処理）
// function generateTypeFromSchema(typeName: string, schema: SchemaObject): string {
//   if (schema.$ref) {
//     const refType = schema.$ref.split('/').pop()!;
//     return `export type ${typeName} = ${refType};\n\n`;
//   }

//   if (schema.type === 'object' || schema.properties) {
//     const requiredProps = schema.required || [];
//     const props = Object.entries(schema.properties || {})
//       .map(([key, val]) => {
//         const optionalMark = requiredProps.includes(key) ? '' : '?';
//         const tsType = mapOpenAPITypeToTS(val);
//         return `  ${key}${optionalMark}: ${tsType};`;
//       })
//       .join('\n');

//     return `export interface ${typeName} {\n${props}\n}\n\n`;
//   }

//   if (schema.type === 'array' && schema.items) {
//     const itemType = mapOpenAPITypeToTS(schema.items);
//     return `export type ${typeName} = ${itemType}[];\n\n`;
//   }

//   return `export type ${typeName} = unknown;\n\n`;
// }

// // OpenAPIの型をTypeScript型に変換（再帰的に無名オブジェクトはインラインinterfaceで展開）
// function mapOpenAPITypeToTS(schema?: SchemaObject): string {
//   if (!schema) return 'unknown';

//   if (schema.$ref) {
//     return schema.$ref.split('/').pop()!;
//   }

//   switch (schema.type) {
//     case 'integer':
//     case 'number':
//       return 'number';
//     case 'string':
//       if (schema.format === 'date-time') return 'string'; // Dateにしたいなら要調整
//       return 'string';
//     case 'boolean':
//       return 'boolean';
//     case 'array':
//       if (!schema.items) return 'unknown[]';
//       return mapOpenAPITypeToTS(schema.items) + '[]';
//     case 'object':
//       if (schema.properties) {
//         const requiredProps = schema.required || [];
//         const props = Object.entries(schema.properties)
//           .map(([key, val]) => {
//             const optionalMark = requiredProps.includes(key) ? '' : '?';
//             return `  ${key}${optionalMark}: ${mapOpenAPITypeToTS(val)};`;
//           })
//           .join('\n');
//         return `{\n${props}\n}`;
//       }
//       return 'unknown';
//     default:
//       return 'unknown';
//   }
// }

// // operationIdを自動生成
// function generateOperationId(method: string, route: string) {
//   return (
//     method +
//     '_' +
//     route
//       .replace(/[\/{}]/g, '_')
//       .replace(/__+/g, '_')
//       .replace(/^_+|_+$/g, '')
//   );
// }

// // 先頭大文字化
// function capitalize(str: string) {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }

// // 実行
// generateApiTypes().catch(console.error);

// import path from 'path';
// import { generateApi } from 'swagger-typescript-api';

// const GEN_FILE_DIR = 'src/types/generated';

// generateApi({
//   fileName: 'Api.ts',
//   url: 'http://localhost:5000/api-docs',
//   output: path.resolve(process.cwd(), GEN_FILE_DIR),
//   hooks: {
//     // `onCreateProperty` はこのように定義
//     onCreateProperty: ((property: any) => {
//       if (property.format === 'date-time' && property.type === 'string') {
//         return {
//           ...property,
//           tsType: 'Date',
//         };
//       }
//       return property;
//     }) as any
//   },
// });

import path from 'path';
import { generateApi } from 'swagger-typescript-api';

const GEN_FILE_DIR = 'src/types/generated';

generateApi({
  fileName: 'Api.ts',
  url: 'http://localhost:5000/api-docs',
  output: path.resolve(process.cwd(), GEN_FILE_DIR),

  primitiveTypeConstructs: () => ({
    string: {
      'date-time': 'Date',
    },
  }),
});
