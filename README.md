# shizen-saibai

# DEMO

"hoge"の魅力が直感的に伝えわるデモ動画や図解を載せる

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

# Author

作成情報を列挙する

* 作成者
* 所属
* E-mail
