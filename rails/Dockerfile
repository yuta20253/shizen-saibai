# syntax = docker/dockerfile:1
ARG RUBY_VERSION=3.4.4
FROM ruby:${RUBY_VERSION}-slim-bookworm AS base

WORKDIR /rails

ENV RAILS_ENV=production \
    BUNDLE_DEPLOYMENT=1 \
    BUNDLE_PATH=/usr/local/bundle \
    BUNDLE_WITHOUT="development:test"

# ---------- build stage ----------
FROM base AS build

# 1) 必要なビルドツール + libyaml-dev を追加
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      build-essential \
      libyaml-dev \
      default-libmysqlclient-dev \
      git \
      libvips \
      pkg-config && \
    rm -rf /var/lib/apt/lists/*

# 2) Bundler/RubyGems を安定版でアップデート（psych 依存対策）
RUN gem update --system -N && \
    gem install bundler -v 2.5.11

# 3) Gemfile を先にコピーして bundle install
COPY Gemfile Gemfile.lock ./
RUN bundle lock --add-platform x86_64-linux && \
    bundle install --jobs 4 --retry 3 && \
    rm -rf ~/.bundle /usr/local/bundle/ruby/*/cache

# 4) アプリケーションコード
COPY . .
RUN bundle exec bootsnap precompile app/ lib/

# ---------- final stage ----------
FROM base

# 5) 本番実行に必要な最小パッケージ
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      curl \
      default-mysql-client \
      libvips && \
    rm -rf /var/lib/apt/lists/*

# 6) ビルド済みの gem とアプリをコピー
COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /rails /rails

# 7) 非 root ユーザーで実行 & 所有権を修正
RUN useradd -m rails && \
    chown -R rails:rails /rails /usr/local/bundle

USER rails

ENTRYPOINT ["/rails/bin/docker-entrypoint"]
EXPOSE 3000
CMD ["./bin/rails", "server"]
