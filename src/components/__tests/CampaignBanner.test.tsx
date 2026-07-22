import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CampaignBanner } from '../CampaignBanner';
import { siteContent } from '../../config/siteContent';

describe('CampaignBanner Component', () => {
  it('renders campaign badge and title correctly', () => {
    render(<CampaignBanner />);
    
    const { campaignBadge } = siteContent.campaign;
    expect(screen.getByText(campaignBadge)).toBeInTheDocument();
    
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading.textContent).toContain('全身バランス整体コース');
  });

  it('renders correct link to middle campaign section', () => {
    render(<CampaignBanner />);
    
    const bannerLink = screen.getByRole('link');
    expect(bannerLink).toHaveAttribute('href', '#middle-cta');
  });
});
