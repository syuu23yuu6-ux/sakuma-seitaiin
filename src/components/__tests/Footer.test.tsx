import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from '../Footer';
import { siteContent } from '../../config/siteContent';

describe('Footer Component', () => {
  it('renders brand details and address correctly', () => {
    render(<Footer />);
    
    const { address, telNumber, footerIntro } = siteContent.contacts;
    expect(screen.getByText(new RegExp(footerIntro.split('\n')[0]))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(address.substring(0, 10)))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(telNumber))).toBeInTheDocument();
  });

  it('renders correct navigation groups and list items', () => {
    render(<Footer />);
    
    // ナビグループタイトルの検証
    expect(screen.getByRole('heading', { name: '院のご案内' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'インフォメーション' })).toBeInTheDocument();

    // リンクの検証
    expect(screen.getByRole('link', { name: '当院の特徴' })).toHaveAttribute('href', '/#features');
    expect(screen.getByRole('link', { name: '施術メニュー・料金' })).toHaveAttribute('href', '/menu');
    expect(screen.getByRole('link', { name: '新着ブログ' })).toHaveAttribute('href', '/new_page');
    expect(screen.getByRole('link', { name: 'スタッフ紹介' })).toHaveAttribute('href', '/staff');
    expect(screen.getByRole('link', { name: 'アクセス' })).toHaveAttribute('href', '/access');
  });

  it('should render privacy policy link pointing to /privacy_policy', () => {
    render(<Footer />);
    
    const privacyLink = screen.getByRole('link', { name: 'プライバシーポリシー' });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute('href', '/privacy_policy');
  });
});

