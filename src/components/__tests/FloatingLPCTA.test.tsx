import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FloatingLPCTA } from '../FloatingLPCTA';
import { siteContent } from '../../config/siteContent';

// Framer Motion をモック化して、テスト側から scrollY の変更イベントをシミュレートできるようにする
const mockScrollY = {
  get: () => 0,
  getPrevious: () => 0,
};

let scrollCallback: (latest: number) => void = () => {};

vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof import('framer-motion')>();
  return {
    ...actual,
    useScroll: () => ({
      scrollY: mockScrollY,
    }),
    useMotionValueEvent: (_value: any, _event: string, callback: (v: any) => void) => {
      scrollCallback = callback;
    }
  };
});

describe('FloatingLPCTA Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(mockScrollY, 'get').mockReturnValue(0);
  });

  it('is hidden initially when scroll position is low', () => {
    const { container } = render(<FloatingLPCTA />);
    
    act(() => {
      scrollCallback(0);
    });

    expect(container.firstChild).toBeNull();
  });

  it('renders CTA buttons when scrolled down', () => {
    vi.spyOn(mockScrollY, 'get').mockReturnValue(400);
    render(<FloatingLPCTA />);
    
    act(() => {
      scrollCallback(400);
    });

    expect(screen.getByText('ご相談・ご予約はこちら')).toBeInTheDocument();

    const ekitenButton = screen.getByRole('link', { name: /エキテン簡単ネット予約/ });
    expect(ekitenButton).toBeInTheDocument();
    expect(ekitenButton).toHaveAttribute('href', siteContent.contacts.ekitenRsvUrl);
    expect(ekitenButton).toHaveAttribute('target', '_blank');
    expect(ekitenButton).toHaveAttribute('rel', 'noopener noreferrer');

    const phoneButton = screen.getByRole('link', { name: /お電話でお問合せ/ });
    expect(phoneButton).toBeInTheDocument();
    expect(phoneButton).toHaveAttribute('href', `tel:${siteContent.contacts.telNumber.replace(/-/g, '')}`);
  });
});
