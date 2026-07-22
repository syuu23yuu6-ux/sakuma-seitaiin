import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RelatedLinks } from '../RelatedLinks';
import { siteContent } from '../../config/siteContent';

describe('RelatedLinks Component', () => {
  it('should render correct title and all external links', () => {
    render(<RelatedLinks />);

    expect(screen.getByText('関連リンク・外部サービス')).toBeInTheDocument();

    const { mailMagazineUrl, tsuku2Url, ekitenUrl, suisoIryouUrl } = siteContent.contacts;

    const links = [
      { text: '無料メルマガ登録', href: mailMagazineUrl },
      { text: 'ツクツク公式ショップ', href: tsuku2Url },
      { text: 'エキテン掲載ページ', href: ekitenUrl },
      { text: '一般社団法人 水素医療研究所', href: suisoIryouUrl },
    ];

    links.forEach((link) => {
      const linkEl = screen.getByText(link.text).closest('a');
      expect(linkEl).toBeInTheDocument();
      expect(linkEl).toHaveAttribute('href', link.href);
      expect(linkEl).toHaveAttribute('target', '_blank');
      expect(linkEl).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
