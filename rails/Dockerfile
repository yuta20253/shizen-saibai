# syntax = docker/dockerfile:1
ARG RUBY_VERSION=3.4.4
FROM ruby:${RUBY_VERSION}-slim-bookworm AS base

WORKDIR /rails

ENV RAILS_ENV=development \
    BUNDLE_PATH=/usr/local/bundle

# ---------- build stage ----------
FROM base AS build

# 1) C拡張gemのビルドに必要なパッケージをインストール
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      build-essential \
      libyaml-dev \
      libffi-dev \
      libreadline-dev \
      zlib1g-dev \
      default-libmysqlclient-dev \
      git \
      libvips \
      pkg-config \
      curl \
      make && \
    rm -rf /var/lib/apt/lists/*

# 2) Bundlerアップデート（psychやprism対策）
RUN gem update --system -N && \
    gem install bundler -v 2.5.11

# 3) Gemfileをコピーしてbundle install（開発用まで）
COPY Gemfile Gemfile.lock ./
RUN bundle lock --add-platform x86_64-linux && \
    bundle install --jobs 4 --retry 3 --with development test && \
    rm -rf ~/.bundle /usr/local/bundle/ruby/*/cache

# 4) アプリケーションコードのコピー & bootsnap
COPY . .
RUN bundle exec bootsnap precompile app/ lib/

# ---------- final stage ----------
FROM base

# 5) 本番でも必要な最小限のパッケージに加え、ビルドに必要なパッケージを追加
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      build-essential \
      make \
      libyaml-dev \
      libffi-dev \
      libreadline-dev \
      zlib1g-dev \
      default-libmysqlclient-dev \
      curl \
      default-mysql-client \
      libvips \
      pkg-config && \
    rm -rf /var/lib/apt/lists/*

# 6) アプリとgemをコピー
COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /rails /rails

# 7) 非rootユーザー作成＆権限付与
RUN useradd -m rails && \
    chown -R rails:rails /rails /usr/local/bundle

USER rails

ENTRYPOINT ["/rails/bin/docker-entrypoint"]
EXPOSE 3000
CMD ["./bin/rails", "server"]
