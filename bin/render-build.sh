#!/usr/bin/env bash
set -o errexit

echo "Installing gems"
bundle install

echo "Running migrations"
bundle exec rails db:migrate

echo "Seeding database"
bundle exec rails db:seed

echo "Precompiling assets"
bundle exec rails assets:precompile

# 古いアセットを削除（必要なら）
# bundle exec rails assets:clean
