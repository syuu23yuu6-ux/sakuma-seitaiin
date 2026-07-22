import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrandFeatures } from '../BrandFeatures';
import { siteContent } from '../../config/siteContent';

describe('BrandFeatures Component', () => {
  it('should render the main section title and subtitle', () => {
    render(<BrandFeatures />);
    
    const { logoText } = siteContent.contacts;
    expect(screen.getByText(`${logoText}ならではの${siteContent.brandFeatures.features.length}つの特徴`)).toBeInTheDocument();
    expect(screen.getByText('FEATURES')).toBeInTheDocument();
  });

  it('should render all brand features with correct headings and numbers', () => {
    render(<BrandFeatures />);

    const features = siteContent.brandFeatures.features;

    // 特徴番号の確認
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();

    features.forEach((feature) => {
      // 改行が含まれる場合に備えて RegExp で柔軟にマッチング
      const titlePattern = new RegExp(feature.title.replace(/\n/g, '.*'));
      expect(screen.getByText(titlePattern)).toBeInTheDocument();
      feature.desc.forEach((paragraph) => {
        expect(screen.getByText(paragraph)).toBeInTheDocument();
      });
    });
  });
});
