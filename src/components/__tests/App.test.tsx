import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../../App';
import { lpContent } from '../../config/lpContent';

// テスト中の外部コンポーネント用モック
vi.mock('embla-carousel-react', () => {
  return {
    default: () => [
      () => {},
      {
        scrollNext: vi.fn(),
        scrollPrev: vi.fn(),
        on: vi.fn(),
        off: vi.fn(),
      },
    ],
  };
});

describe('App Component Legacy Routing', () => {
  beforeEach(() => {
    // pathnameをリセット
    vi.stubGlobal('location', {
      ...window.location,
      pathname: '/'
    });
  });

  it('renders home page on default root path', () => {
    render(<App />);
    // メインの見出しやセクションが表示されることを検証
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  }, 15000);

  it('renders shoulder pain LP on legacy sakuma_seitaiin1 lp1 path', () => {
    vi.stubGlobal('location', {
      ...window.location,
      pathname: '/sakuma_seitaiin1/lp1'
    });
    render(<App />);
    const expectedCatch = lpContent['lp1'].mainCatch;
    expect(screen.getAllByText(expectedCatch).length).toBeGreaterThan(0);
  });

  it('renders waist pain LP on legacy sakuma_seitaiin1 Romanized path (yotsu)', () => {
    vi.stubGlobal('location', {
      ...window.location,
      pathname: '/sakuma_seitaiin1/yotsu'
    });
    render(<App />);
    const expectedCatch = lpContent['lp2'].mainCatch;
    expect(screen.getAllByText(expectedCatch).length).toBeGreaterThan(0);
  });

  it('renders maternity LP on legacy sakuma_seitaiin2 Romanized path (kotsubankyosei)', () => {
    vi.stubGlobal('location', {
      ...window.location,
      pathname: '/sakuma_seitaiin2/kotsubankyosei'
    });
    render(<App />);
    const expectedCatch = lpContent['lp10'].mainCatch;
    expect(screen.getAllByText(expectedCatch).length).toBeGreaterThan(0);
  });

  it('renders 404 block for invalid legacy sub-path', () => {
    vi.stubGlobal('location', {
      ...window.location,
      pathname: '/sakuma_seitaiin1/invalid-route'
    });
    render(<App />);
    // 互換性のないパスはトップページがフォールバックされる
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
