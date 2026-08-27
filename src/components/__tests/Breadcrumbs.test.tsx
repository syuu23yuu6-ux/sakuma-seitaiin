import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { Breadcrumbs } from '../Breadcrumbs';

describe('Breadcrumbs Component', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
  });

  it('should render home and item links correctly', () => {
    render(
      <Breadcrumbs
        items={[
          { name: '症状・用語辞典', url: '/dictionary' },
          { name: '肩こり', url: '/dictionary/肩こり' }
        ]}
      />
    );

    expect(screen.getByText('ホーム')).toBeInTheDocument();
    expect(screen.getByText('症状・用語辞典')).toBeInTheDocument();
    expect(screen.getByText('肩こり')).toBeInTheDocument();

    const jsonLd = document.getElementById('breadcrumb-jsonld');
    expect(jsonLd).not.toBeNull();
    expect(jsonLd?.innerHTML).toContain('BreadcrumbList');
    expect(jsonLd?.innerHTML).toContain('肩こり');
  });
});
