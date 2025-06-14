# CLAUDE.md

このファイルはClaude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 開発コマンド / Development Commands

- `npm run dev` - 開発サーバーをTurbopackで起動 (http://localhost:3000) / Start development server with Turbopack
- `npm run build` - 本番用ビルド / Build for production
- `npm run start` - 本番サーバー起動 / Start production server
- `npm run lint` - ESLint実行 / Run ESLint

## アーキテクチャ / Architecture

Next.js 15のApp Routerパターンを使用したアプリケーション:
- **Frontend Framework**: React 19 with Next.js 15 App Router
- **Styling**: Tailwind CSS v4 with mobile-first responsive design
- **Typography**: Geist font family (Sans and Mono variants)
- **TypeScript**: Strict mode enabled with path aliases (`@/*`)
- **Node Version**: 22.14.0 (specified in engines)

## コーディング規約 / Code Style Requirements (.cursorrules より)

**言語とフレームワーク**:
- 全てのコードでTypeScriptを使用
- typesよりinterfacesを優先
- 関数型・宣言型プログラミングパターンを使用、classは避ける
- コンポーネントは名前付きエクスポートを使用
- 基本的にアロー関数を使用

**アーキテクチャパターン**:
- Client ComponentsよりReact Server Components (RSC)を優先
- 'use client'、'useEffect'、'setState'の使用を最小限に抑える
- URL検索パラメータの状態管理には'nuqs'を使用

**命名規則**:
- ディレクトリは小文字とダッシュを使用 (例: `components/auth-wizard`)
- 補助動詞を用いた説明的な変数名を使用 (例: `isLoading`, `hasError`)

**ファイル構造の順序**:
1. エクスポートされたコンポーネント
2. サブコンポーネント
3. ヘルパー関数
4. 静的コンテンツ
5. 型・インターフェース

**UIとスタイリング**:
- Shadcn UI、Radix UI、Tailwindを使用
- モバイルファーストアプローチでレスポンシブデザインを実装
- 画像最適化: WebPフォーマット使用、サイズデータ含める、レイジーローディング実装

**パフォーマンス**:
- Server-Side Rendering (SSR)を優先
- Web Vitals (LCP, CLS, FID)を最適化
- コードの重複を避け、イテレーションとモジュール化を優先