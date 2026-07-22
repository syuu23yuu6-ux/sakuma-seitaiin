---
name: Web Development Golden Rules
description: GitHubの世界基準ベストプラクティスに基づく、最高品質のWeb開発絶対基準
---

# Web開発におけるゴールデンルール (Golden Rules Ultimate)

本プロジェクトの開発において、以下のゴールデンルールをあらゆるコード・設計の絶対的な判断基準とします。
これらは、`clean-code-javascript`, `html5-boilerplate`, `Core Web Vitals`, `W3C WCAG` などの世界標準から抽出した、最高品質を担保するためのルールです。

## 1. パフォーマンス・最適化 (Performance & Web Vitals)
**「Core Web Vitals (LCP, INP, CLS) 最優先のレンダリング」**
- **アセット最適化**: ヒーロー画像には `fetchpriority="high"` を付与し、それ以外の画像（`<img>` や `<video>`）には必ず `loading="lazy"` と明示的な `width`, `height` 属性を指定し、CLS (Layout Shift) を防ぐこと。
- **スクリプト読み込み**: レンダリングブロックを防ぐため、外部JSは極力 `defer`（または適宜 `async`）で読み込むこと。
- **アニメーション最適化**: ブラウザのメインスレッドを圧迫するスタイル（`width`, `height`, `top` 等）によるアニメーションを禁止し、ハードウェアアクセラレーションが効く `transform` と `opacity` のみに限定すること。

## 2. 構造とアクセシビリティ (HTML & A11y)
**「機械にも、スクリーンリーダーにも完全に理解されるSemantic HTML」**
- **Semantic HTML**: `<main>`, `<article>`, `<section>`, `<aside>`, `<nav>` を正しく使い分け、見出し（`<h1>`〜`<h6>`）の階層（アウトライン）を絶対にスキップ・破綻させないこと。
- **アクセシビリティ (WCAG準拠)**:
  - アイコンのみのボタンなどには `aria-label` を付与し、用途を明記すること。
  - フォーカスリングを outline `none` だけで消すのは厳禁（`:focus-visible` を用いてキーボード操作時の視認性を担保）。
- **モーションと配慮**: アニメーション（GSAP/AOS）を多用するため、システム設定に配慮し `@media (prefers-reduced-motion: reduce)` のサポートをCSS/JSに組み込むこと。

## 3. スタイル設計 (CSS Architecture)
**「詳細度戦争を防ぎ、再利用可能で保守性の高いCSSへ」**
- **Single Source of Truth (一元管理)**: 色やサイズは全て `:root` の CSS変数（Open Props）を参照し、ハードコード（マジックナンバー）を禁止する。
- **カスケード・レイヤー**: `@layer` を用いて（`reset`, `tokens`, `base`, `layout`, `components`, `sections`, `utilities`, `animations`）の階層を厳守し、`!important` はユーティリティクラス以外での使用を禁ずる。
- **BEM命名規則**: CSSクラスは `.card`, `.card__title`, `.card--highlight` のような Blocks/Elements/Modifiers 構造を維持し、カプセル化を守ること。

## 4. ロジック設計 (Clean JavaScript)
**「副作用を持たない純粋関数と、単一責任原則の徹底」**
- **単一責任の原則 (Single Responsibility)**: 関数は「1つの仕事」だけをする。DOMの操作とデータの処理は明確に分離すること。
- **クリーンな命名規則**: `handleData()` などの曖昧な名前は避け、`fetchCourseList()` / `toggleFaqAccordion()` のように「何をする関数か」が明確に伝わる命名にすること。
- **防御的プログラミングとセキュリティ**:
  - `innerHTML` はクロスサイトスクリプティング（XSS）の脆弱性となるため直接使用しない。必ず `textContent` を用いるか、信頼できるHTML構築関数（DOMParser等）を利用すること。
- **メモリリーク防止**: イベントリスナー（特にスクロールやリサイズ）は GSAPの `matchMedia()` による自動クリーンアップに任せるか、自作リスナーの場合は必ず明示的に削除（`removeEventListener`）すること。

## 5. TDDとプロセス (AI Agent 指示)
- **TDDサイクル厳守**: コードを生成する前には必ず「期待されるHTMLのSemantic構造」や「GSAPアニメーションの仕様」をSpecとして提示(Red)し、検証した上で実装(Green)に移ること。
- **Refactor (リファクタリング)**: 動けば良いではなく、常にこの `Golden Rules` に違反していないか（特にマジックナンバー、BEM規則、`innerHTML`のリスク等）を実装完了直後に再評価・改善すること。

---
**Agent Instruction**: 開発のあらゆるステップ・意思決定において、この「Golden Rules Ultimate」をコンテキストとしてバックグラウンドで走らせ、これらの基準を満たしているかをセルフチェックしてから回答を生成してください。
