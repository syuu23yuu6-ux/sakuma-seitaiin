import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AccessTabs } from '../AccessTabs';
import { siteContent } from '../../config/siteContent';

describe('AccessTabs Component', () => {
  it('should render main heading', () => {
    render(<AccessTabs />);
    expect(screen.getByRole('heading', { name: '当院へのアクセス' })).toBeInTheDocument();
  });

  it('should show Sakuma Seitaiin clinic information', () => {
    render(<AccessTabs />);

    const { address, telNumber, logoText } = siteContent.contacts;
    expect(screen.getByText(logoText, { selector: 'h3' })).toBeInTheDocument();
    expect(screen.getByText(new RegExp(address.substring(0, 10)))).toBeInTheDocument();
    expect(screen.getByText(telNumber)).toBeInTheDocument();
  });

  it('should contain maps links pointing to correct coordinates/queries', () => {
    render(<AccessTabs />);

    const mapLink = screen.getByRole('link', { name: 'Google Mapで開く' });
    expect(mapLink).toHaveAttribute('href', 'https://maps.app.goo.gl/Fcr4mYza3wd5tcUZA');
  });
});
