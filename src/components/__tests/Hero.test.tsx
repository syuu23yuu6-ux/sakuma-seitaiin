import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Hero } from '../Hero';
import { siteContent } from '../../config/siteContent';

// Embla Carousel がテスト環境で動作するよう、必要に応じてモック化する
vi.mock('embla-carousel-react', () => {
  return {
    default: () => [
      () => {}, // emblaRef mock
      {
        scrollNext: vi.fn(),
        scrollPrev: vi.fn(),
        on: vi.fn(),
        off: vi.fn(),
      }, // emblaApi mock
    ],
  };
});

describe('Hero Component', () => {
  it('renders badge correctly', () => {
    render(<Hero />);
    const badgeText = siteContent.hero.badge;
    expect(screen.getByText(new RegExp(badgeText.split(' / ')[0]))).toBeInTheDocument();
  });

  it('renders main heading text', () => {
    render(<Hero />);
    const heading = screen.getByRole('heading', { level: 1 });
    // タイトルは改行やタイピングアニメーションで文字が分割されている可能性があるため、textContentを検証
    const titleClean = siteContent.hero.title.replace(/\n/g, '');
    expect(heading.textContent?.replace(/\s/g, '')).toContain(titleClean);
  });

  it('renders brand description', () => {
    render(<Hero />);
    const descText = siteContent.hero.desc;
    expect(screen.getByText(new RegExp(descText.substring(0, 15)))).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<Hero />);
    const { ctaPrimary, ctaSecondary } = siteContent.hero;
    expect(screen.getByRole('link', { name: new RegExp(ctaPrimary.text) })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: new RegExp(ctaSecondary.text) })).toBeInTheDocument();
  });

  it('renders scroll indicator', () => {
    render(<Hero />);
    expect(screen.getByText(/SCROLL/i)).toBeInTheDocument();
  });
});
