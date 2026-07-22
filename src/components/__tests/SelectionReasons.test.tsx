import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SelectionReasons } from '../SelectionReasons';
import { siteContent } from '../../config/siteContent';

describe('SelectionReasons Component', () => {
  it('should render the main section title and subtitle', () => {
    render(<SelectionReasons />);
    
    const { logoText } = siteContent.contacts;
    expect(screen.getByText(`${logoText}が選ばれる3つの理由`)).toBeInTheDocument();
    expect(screen.getByText('WHY US')).toBeInTheDocument();
  });

  it('should render all selection reasons with correct titles and descriptions', () => {
    render(<SelectionReasons />);

    const { reasons } = siteContent.selectionReasons;

    // タイトルと本文の確認
    reasons.forEach((reason) => {
      expect(screen.getByText(reason.title)).toBeInTheDocument();
      expect(screen.getByText(reason.desc)).toBeInTheDocument();
    });
  });
});
