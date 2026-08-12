# YNAB式家計管理アプリ

## ブランチ運用

- main: 常にデプロイ可能な状態を維持
- feature/機能名 のブランチを作成して開発
- 開発後は Pull Request（PR）を作成
- PRは他メンバー1人以上のレビュー承認後にマージ
- mainブランチへ直接pushは禁止

### ブランチ命名例

feature/login
feature/supabase-auth
feature/expense-input
feature/category-management

### 開発フロー

1. mainから最新を取得
2. featureブランチ作成
3. 実装
4. GitHubへpush
5. Pull Request作成
6. レビュー
7. mainへマージ