---
description: Vanilla HTML/CSS/JS プロジェクトにおけるテスト駆動開発（TDD）の標準フローを開始する
---

# /tdd (Test-Driven Development Workflow)

このコマンドが実行された場合、エージェントは直ちに指定された実装対象（セクションや機能）に対して TDD（Test-Driven Development）フローを開始します。

## Workflow Steps

以下の手順を必ず順番に実行し、ステップごとにユーザーへ進行状況やSpec定義を報告してください。

### Step 1: Spec定義 (Red)
1. ユーザーに対して、これから実装するコンポーネント・セクションの要件定義（Spec）を宣言します。
2. 以下の項目を明確に定義してください：
   - 必要なHTMLの要素やクラス構造（Block/Elementなど）
   - CSS Open Propsを使用したデザイントークン
   - GSAPやAOSで期待されるアニメーションやJSの振る舞い
3. 現在このSpecを満たしていないこと（= Fail / Red 状態）を示します。

### Step 2: 最小実装 (Green)
1. Step 1 で定義したSpec（期待される動作）を満たすための最小限のコード（HTML/CSS/JS）を作成・提示します。
2. 実際のファイルにコードを記述します。

### Step 3: 品質と仕様の検証
// turbo
1. ブラウザでの表示確認や、作成したコードが「Web Development Golden Rules Ultimate」に違反していないか（Web Vitals, BEM規則, innerHTMLの不使用など）をチェックします。
2. 期待した動作（Green状態）を達成できたかを報告します。

### Step 4: リファクタリング (Refactor)
1. コードを綺麗にし、`@layer` 構造やCSSカスタムプロパティ（`:root`変数）の適用漏れがないか整理します。
2. 完了次第、ユーザーに次の実装対象への移行を確認します。

## System Instruction
このコマンドが実行されたら、現在タスクとして設定されている（あるいはユーザーから指定された）機能に対して、直ちに **Step 1: Spec定義 (Red)** を実行し、内容をユーザーに明示・確認させてください。
