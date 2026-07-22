import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Courses } from '../Courses';
import { siteContent } from '../../config/siteContent';

describe('Courses Component', () => {
  it('renders all courses with correct titles', () => {
    render(<Courses />);
    
    siteContent.menus.forEach(menu => {
      expect(screen.getByRole('heading', { name: menu.title })).toBeInTheDocument();
    });
  });

  it('renders campaign trial banner with correct text and action button', () => {
    render(<Courses />);
    
    expect(screen.getByText('ご新規様向けの割引プランを開催中')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'ご予約・お問い合わせはこちら' })).toBeInTheDocument();
  });
});
