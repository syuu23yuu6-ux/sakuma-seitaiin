import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScrollToTop } from '../ScrollToTop';

describe('ScrollToTop Component', () => {
  beforeEach(() => {
    // スクロール状態のモック
    window.scrollY = 0;
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });

  it('should not be visible initially when scroll position is 0', () => {
    render(<ScrollToTop />);
    const button = screen.queryByRole('button', { name: 'ページ最上部へ戻る' });
    expect(button).not.toBeInTheDocument();
  });

  it('should become visible when scroll position is greater than 300', () => {
    render(<ScrollToTop />);
    
    // スクロール量を350にシミュレート
    window.scrollY = 350;
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    const button = screen.getByRole('button', { name: 'ページ最上部へ戻る' });
    expect(button).toBeInTheDocument();
  });

  it('should call window.scrollTo when clicked', () => {
    render(<ScrollToTop />);
    
    window.scrollY = 350;
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    const button = screen.getByRole('button', { name: 'ページ最上部へ戻る' });
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});
