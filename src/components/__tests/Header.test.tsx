import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Header } from '../Header';
import { siteContent } from '../../config/siteContent';

const mockScrollY = {
  get: () => 0,
  getPrevious: () => 0,
};

vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof import('framer-motion')>();
  return {
    ...actual,
    useScroll: () => ({
      scrollY: mockScrollY,
    }),
    useMotionValueEvent: () => {}
  };
});

describe('Header Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(mockScrollY, 'get').mockReturnValue(0);
    vi.spyOn(mockScrollY, 'getPrevious').mockReturnValue(0);
  });

  it('renders all required navigation links in desktop layout', () => {
    render(<Header />);
    
    // ブランドロゴの検証 (テキストまたは画像の alt 属性のいずれかとして存在することを検証)
    const { logoText } = siteContent.contacts;
    const logoElement = screen.queryByText(logoText) || screen.queryByAltText(logoText);
    expect(logoElement).toBeInTheDocument();
    
    // デスクトップ用ナビゲーションリンクの検証
    expect(screen.getByRole('link', { name: 'ホーム' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '特徴' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '施術メニュー・料金' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'スタッフ紹介' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'よくある質問' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '用語集' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'アクセス' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '新着ブログ' })).toBeInTheDocument();
  });

  it('renders CTA button with text "ネット予約・お問合せ" in desktop layout with design enhancement classes', () => {
    render(<Header />);
    const ctaLink = screen.getByRole('link', { name: 'ネット予約・お問合せ' });
    expect(ctaLink).toBeInTheDocument();
    expect(ctaLink).toHaveClass('btn-shimmer');
    expect(ctaLink).toHaveClass('hover:scale-105');
  });

  it('has persistent solid background and border classes for maximum readability', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-white/95');
    expect(header).toHaveClass('backdrop-blur-md');
    expect(header).toHaveClass('border-b');
    expect(header).toHaveClass('border-primary/10');
  });

  it('has accessibility attributes on the mobile menu toggle button', () => {
    render(<Header />);
    
    const toggleButton = screen.getByRole('button', { name: /メニュー/i });
    expect(toggleButton).toBeInTheDocument();
    
    // 初期状態 (メニューが閉じている)
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(toggleButton).toHaveAttribute('aria-label', 'メニューを開く');
    expect(toggleButton).toHaveAttribute('aria-controls', 'mobile-menu');
    
    // クリックしてメニューを開く
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    expect(toggleButton).toHaveAttribute('aria-label', 'メニューを閉じる');
  });
});

