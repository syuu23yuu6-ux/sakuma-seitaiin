import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PrivacyModal } from '../PrivacyModal';

describe('PrivacyModal Component', () => {
  it('should not render when isOpen is false', () => {
    const { container } = render(<PrivacyModal isOpen={false} onClose={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render privacy content and call onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<PrivacyModal isOpen={true} onClose={handleClose} />);

    // 主要なコンテンツが表示されていることを検証
    expect(screen.getByText(/個人情報保護方針/)).toBeInTheDocument();
    expect(screen.getByText(/法令を遵守するとともに/)).toBeInTheDocument();
    expect(screen.getByText(/1\. 個人情報の収集・利用目的/)).toBeInTheDocument();

    // 閉じるボタンがクリックされたときに onClose が呼ばれること
    const closeButtons = screen.getAllByRole('button', { name: /閉じる/i });
    expect(closeButtons.length).toBe(2);

    // ✕ボタンをクリック
    fireEvent.click(closeButtons[0]);
    expect(handleClose).toHaveBeenCalledTimes(1);

    // フッターの「閉じる」ボタンをクリック
    fireEvent.click(closeButtons[1]);
    expect(handleClose).toHaveBeenCalledTimes(2);
  });

  it('should call onClose when overlay background is clicked', () => {
    const handleClose = vi.fn();
    render(<PrivacyModal isOpen={true} onClose={handleClose} />);

    // モーダルの背景（アウターコンテナ）をクリック
    const overlay = screen.getByTestId('privacy-overlay');
    expect(overlay).toBeInTheDocument();
    fireEvent.click(overlay);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
