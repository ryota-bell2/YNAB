# VScodeのgithub copilotの使用を前提
```.github/copilot-instructions.md``` の内容を自動的に参照してくれる。 
人間が日本語で読む用の企画書は```/docs/plan.md```の中に書いてある。こちらも自動で編集できるようにしてある。
が、重要な案件の場合は明示的に
```
作業完了後、実際に実行・確認した内容をdocs/plan.mdへ日本語で追記してください。
```
と入力


# .githubの内容
AIが理解しやすいように英語で書いてある
- アプリの目的と対象ユーザー
- MVPに含める機能、含めない機能
- Next.js、TypeScript、Tailwind、Supabase、Vercelの技術方針
- 現在のリポジトリ構成
- src フォルダを使用していない現在の構成
- Supabaseクライアントの配置方針
- 現在発生しているimportエラーの解決順序
- .env.local とAPIキーの管理ルール
- Supabase公式クライアントとPrismaの判断方針
- M0からM3までの実装順序
- ユーザーストーリーと受け入れ条件
- RLSの必須ルール
- 2ユーザーによるアクセス制御テスト
- Definition of Ready
- Definition of Done
- GitブランチとPull Requestの運用
- GitHub Copilotがコード生成時に守る手順
- 未決定事項を勝手に補完しないルール
- 現時点での次の12作業
- 担当分担

# 使用例

調査⇨実行の順で使う

プロンプト例
調査
```
.github/copilot-instructions.mdを前提として、現在のリポジトリ構成を調査してください。

今はapp/page.tsxからSupabaseクライアントをimportした際に、
Module not found: Can't resolve '../lib/supabase/client'
が発生しています。

まだコードを変更せず、次の項目を確認して報告してください。

1. lib/supabase/client.tsが実在するか
2. ファイル名と拡張子が正しいか
3. tsconfig.jsonの@/*設定
4. app/page.tsxからの正しいimportパス
5. 修正が必要なファイル
```

実行
```
調査結果に基づいて、Supabaseクライアントのimportエラーを最小限の変更で修正してください。

変更後は次を確認してください。

- npm run devが成功する
- localhost:3000が表示される
- .env.localがGit管理されていない
- 変更したファイルと確認結果を説明する
```