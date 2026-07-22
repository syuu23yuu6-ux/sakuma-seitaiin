import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CampaignModal } from '../CampaignModal';
import { siteContent } from '../../config/siteContent';

describe('CampaignModal Component', () => {
  it('should not render modal when isOpen is false', () => {
    render(<CampaignModal isOpen={false} onClose={vi.fn()} />);
    const { campaignTitle } = siteContent.campaign;
    const modalTitle = screen.queryByText(campaignTitle);
    expect(modalTitle).not.toBeInTheDocument();
  });

  it('should render modal content when isOpen is true', () => {
    render(<CampaignModal isOpen={true} onClose={vi.fn()} />);
    
    const { campaignTitle, campaignDesc } = siteContent.campaign;
    // タイトルが表示されていること
    expect(screen.getByText(campaignTitle)).toBeInTheDocument();
    
    // 本文テキストが表示されていること
    expect(screen.getByText(campaignDesc)).toBeInTheDocument();
    
    // 予約ボタンが表示されていること
    const linkButton = screen.getByRole('link', { name: '今すぐ予約する' });
    expect(linkButton).toBeInTheDocument();
    expect(linkButton).toHaveAttribute('href', siteContent.contacts.ekitenRsvUrl);
    expect(linkButton).toHaveAttribute('target', '_blank');
    expect(linkButton).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should call onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<CampaignModal isOpen={true} onClose={handleClose} />);
    
    const closeButton = screen.getByRole('button', { name: 'Close modal' });
    fireEvent.click(closeButton);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when clicking "今すぐ予約する" button', () => {
    const handleClose = vi.fn();
    render(<CampaignModal isOpen={true} onClose={handleClose} />);
    
    const linkButton = screen.getByRole('link', { name: '今すぐ予約する' });
    fireEvent.click(linkButton);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
