# shizen-saibai

# DEMO

### Topページ
<img width="600" height="600" alt="トップページ" src="https://github.com/user-attachments/assets/086d3103-f63d-4c7b-8f26-af33ff8cb35c" />

### Myページ
<img width="600" height="600" alt="Myページ" src="https://github.com/user-attachments/assets/7be33a8e-843a-4e92-ab1c-454b58b1c192" />

### 画像アップロード
<img width="600" height="600" alt="画像アップロード" src="https://github.com/user-attachments/assets/902f07b8-314c-4a1e-b2d1-c9a1b66fc95a" />

### 診断結果一覧ページ
<img width="600" height="600" alt="診断結果一覧ページ" src="https://github.com/user-attachments/assets/3db2774d-5f3c-4363-be4b-0ace927e98cc" />

### 診断結果詳細ページ兼診断結果ページ
<img width="600" height="600" alt="診断結果ページ兼詳細ページ" src="https://github.com/user-attachments/assets/33c63ba6-e660-4f95-b8a2-249d44a41173" />

# Features

"hoge"のセールスポイントや差別化などを説明する

# 使用バージョン

* Next.js: 15.3.3
* React: 19.1.0
* Rails:  7.1.5
* Ruby: 3.4.4
* Python: 3.13
* FastAPI: 0.115.12
* MySQL: 8.0.32

# 使い方
* インストール方法
```
git clone git@github.com:yuta20253/shizen-saibai.git
```
## Rails

- 開発者から.envファイルをもらう


* サーバー立ち上げ
```
docker compose up -d # ※up -d後、localhost:5000でOK
```

```
docker compose exec rails bash
```

コンテナ内での操作
```
bin/rails db:prepare # DB作成＋マイグレーション実行
```
```
bin/rails db:seed # 初期データ投入
```
railsのコマンドを使用するとき(例 controller作成)
```
bin/rails g controller todos 
```
(例 model作成)
```
bin/rails g model Todo 
```

## Next.js

 frontendディレクトリで
```
cd frontend
npm ci
npm run dev
```

## FastAPI

```
http://localhost:8000/ # アクセスするだけ
```
# プロジェクト構成
```
.
├── README.md
├── api
│   ├── Dockerfile
│   ├── app
│   └── requirements.txt
├── docker-compose.yml
├── frontend
│   ├── README.md
│   ├── app
│   ├── next-env.d.ts
│   ├── next.config.ts
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   └── tsconfig.json
└── rails
    ├── Dockerfile
    ├── Gemfile
    ├── Gemfile.lock
    ├── README.md
    ├── Rakefile
    ├── app
    ├── bin
    ├── config
    ├── config.ru
    ├── db
    ├── entrypoint.sh
    ├── lib
    ├── log
    ├── public
    ├── spec
    ├── storage
    ├── tmp
    └── vendor
```
# Note

注意点などがあれば書く
