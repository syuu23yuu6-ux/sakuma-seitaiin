import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ContactForm } from '../ContactForm';
import { siteContent } from '../../config/siteContent';

describe('ContactForm Component', () => {
  let originalGasUrl: string | undefined;

  beforeEach(() => {
    originalGasUrl = import.meta.env.VITE_GAS_URL;
    // @ts-ignore
    import.meta.env.VITE_GAS_URL = undefined;
  });

  afterEach(() => {
    // @ts-ignore
    import.meta.env.VITE_GAS_URL = originalGasUrl;
  });

  it('should render all input fields and labels', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/お名前/)).toBeInTheDocument();
    expect(screen.getByLabelText(/フリガナ/)).toBeInTheDocument();
    expect(screen.getByLabelText(/メールアドレス/)).toBeInTheDocument();
    expect(screen.getByLabelText(/電話番号/)).toBeInTheDocument();
    expect(screen.getByLabelText(/お悩みの症状/)).toBeInTheDocument();
    expect(screen.getByLabelText(/ご希望のメニュー/)).toBeInTheDocument();
    expect(screen.getByLabelText(/ご希望の日時/)).toBeInTheDocument();
    expect(screen.getByLabelText(/ご質問・ご要望など/)).toBeInTheDocument();
    expect(screen.getByLabelText(/プライバシーポリシーに同意する/)).toBeInTheDocument();
    
    expect(screen.getByRole('button', { name: '入力内容を確認する' })).toBeInTheDocument();
  });

  it('should show success message on successful form submission', async () => {
    render(<ContactForm />);

    // フィールドへの入力
    fireEvent.change(screen.getByLabelText(/お名前/), { target: { value: '山田 花子' } });
    fireEvent.change(screen.getByLabelText(/フリガナ/), { target: { value: 'ヤマダ ハナコ' } });
    fireEvent.change(screen.getByLabelText(/メールアドレス/), { target: { value: 'mail@example.com' } });
    fireEvent.change(screen.getByLabelText(/お悩みの症状/), { target: { value: '肩こり' } });
    fireEvent.change(screen.getByLabelText(/ご希望のメニュー/), { target: { value: 'さくま式バランス整体（50分）' } });
    fireEvent.click(screen.getByLabelText(/プライバシーポリシーに同意する/));

    // 送信
    fireEvent.click(screen.getByRole('button', { name: '入力内容を確認する' }));

    // 成功メッセージの表示を待つ
    await waitFor(() => {
      expect(screen.getByText('送信が完了しました')).toBeInTheDocument();
      expect(screen.getByText(/ご予約・お問合せいただきありがとうございます。/)).toBeInTheDocument();
    });
  });

  it('renders phone number details', () => {
    render(<ContactForm />);
    const { telNumber } = siteContent.contacts;
    expect(screen.getByText(telNumber)).toBeInTheDocument();
    expect(screen.getByText(/お電話でのご連絡/)).toBeInTheDocument();
  });

  it('should render privacy policy link pointing to /privacy_policy with target _blank', () => {
    render(<ContactForm />);

    const privacyLink = screen.getByRole('link', { name: 'プライバシーポリシー' });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute('href', '/privacy_policy');
    expect(privacyLink).toHaveAttribute('target', '_blank');
  });

  it('should call fetch to GAS URL on form submission when VITE_GAS_URL is provided', async () => {
    const originalGasUrl = import.meta.env.VITE_GAS_URL;
    import.meta.env.VITE_GAS_URL = 'https://script.google.com/macros/s/test-id/exec';

    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ result: 'success' }),
      } as Response)
    );

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/お名前/), { target: { value: '山田 花子' } });
    fireEvent.change(screen.getByLabelText(/フリガナ/), { target: { value: 'ヤマダ ハナコ' } });
    fireEvent.change(screen.getByLabelText(/メールアドレス/), { target: { value: 'mail@example.com' } });
    fireEvent.change(screen.getByLabelText(/お悩みの症状/), { target: { value: '肩こり' } });
    fireEvent.change(screen.getByLabelText(/ご希望のメニュー/), { target: { value: 'さくま式バランス整体（50分）' } });
    fireEvent.click(screen.getByLabelText(/プライバシーポリシーに同意する/));

    const submitButton = screen.getByRole('button', { name: '入力内容を確認する' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('送信が完了しました')).toBeInTheDocument();
    });

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://script.google.com/macros/s/test-id/exec',
      expect.objectContaining({
        method: 'POST',
      })
    );

    import.meta.env.VITE_GAS_URL = originalGasUrl;
    fetchSpy.mockRestore();
  });
});
