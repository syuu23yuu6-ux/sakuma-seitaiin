import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StickyCTA } from '../StickyCTA';
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

describe('StickyCTA Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(mockScrollY, 'get').mockReturnValue(0);
  });

  it('renders CTA texts when scrolled down and has design enhancement classes', () => {
    vi.spyOn(mockScrollY, 'get').mockReturnValue(600);
    render(<StickyCTA />);
    
    act(() => {
      scrollCallback(600);
    });

    const requestButton = screen.getByRole('link', { name: /ネット予約・お問合せ/ });
    expect(requestButton).toBeInTheDocument();
    expect(requestButton).toHaveClass('btn-shimmer');
    expect(requestButton).toHaveClass('hover:scale-105');

    const phoneButton = screen.getByRole('link', { name: /お電話でお問合せ/ });
    expect(phoneButton).toBeInTheDocument();
    expect(phoneButton).toHaveClass('hover:scale-105');
  });

  it('renders correct Phone link on the Phone contact button', () => {
    vi.spyOn(mockScrollY, 'get').mockReturnValue(600);
    render(<StickyCTA />);
    
    act(() => {
      scrollCallback(600);
    });
    
    const phoneButton = screen.getByRole('link', { name: /お電話でお問合せ/ });
    expect(phoneButton).toHaveAttribute('href', `tel:${siteContent.contacts.telNumber.replace(/-/g, '')}`);
  });

  it('renders correct Ekiten link on the Net Booking button', () => {
    vi.spyOn(mockScrollY, 'get').mockReturnValue(600);
    render(<StickyCTA />);
    
    act(() => {
      scrollCallback(600);
    });
    
    const requestButton = screen.getByRole('link', { name: /ネット予約・お問合せ/ });
    expect(requestButton).toHaveAttribute('href', siteContent.contacts.ekitenRsvUrl);
    expect(requestButton).toHaveAttribute('target', '_blank');
    expect(requestButton).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('is hidden when scroll position is low and visible when scroll position is high', () => {
    const { container } = render(<StickyCTA />);
    
    act(() => {
      scrollCallback(0);
    });

    expect(container.firstChild).toBeNull();

    vi.spyOn(mockScrollY, 'get').mockReturnValue(600);
    act(() => {
      scrollCallback(600);
    });
    
    expect(screen.getByText('ネット予約・お問合せ')).toBeInTheDocument();
  });
});
