import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LegalModal } from '../LegalModal';

describe('LegalModal Component', () => {
  it('should not render when isOpen is false', () => {
    const { container } = render(<LegalModal isOpen={false} type="tokusho" onClose={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render Tokusho content when type is tokusho', () => {
    render(<LegalModal isOpen={true} type="tokusho" onClose={() => {}} />);
    expect(screen.getByText('特定商取引法に基づく表記')).toBeInTheDocument();
    expect(screen.getByText('運営事業者')).toBeInTheDocument();
    expect(screen.getByText('役務の対価')).toBeInTheDocument();
  });

  it('should render Guarantee rules when type is guarantee', () => {
    render(<LegalModal isOpen={true} type="guarantee" onClose={() => {}} />);
    expect(screen.getByText('保証制度の適用条件細則')).toBeInTheDocument();
    expect(screen.getByText('1. 対象と保証内容')).toBeInTheDocument();
    expect(screen.getByText('2. 適用条件')).toBeInTheDocument();
  });

  it('should call onClose when close buttons are clicked', () => {
    const handleClose = vi.fn();
    render(<LegalModal isOpen={true} type="tokusho" onClose={handleClose} />);

    const closeButtons = screen.getAllByRole('button', { name: /閉じる/i });
    expect(closeButtons.length).toBe(2);

    // ✕ボタン
    fireEvent.click(closeButtons[0]);
    expect(handleClose).toHaveBeenCalledTimes(1);

    // フッター閉じるボタン
    fireEvent.click(closeButtons[1]);
    expect(handleClose).toHaveBeenCalledTimes(2);
  });

  it('should call onClose when overlay is clicked', () => {
    const handleClose = vi.fn();
    render(<LegalModal isOpen={true} type="tokusho" onClose={handleClose} />);

    const overlay = screen.getByTestId('legal-overlay');
    expect(overlay).toBeInTheDocument();
    fireEvent.click(overlay);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
