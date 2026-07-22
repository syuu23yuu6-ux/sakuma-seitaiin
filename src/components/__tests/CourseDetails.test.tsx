import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CourseDetails } from '../CourseDetails';

describe('CourseDetails Component', () => {
  it('should render the main title and subtitle', () => {
    render(<CourseDetails />);
    expect(screen.getByText('施術コース詳細・料金案内')).toBeInTheDocument();
    expect(screen.getByText('MENU DETAILS & PRICE')).toBeInTheDocument();
  });

  it('should render only the active menu (default: balance-general)', () => {
    render(<CourseDetails />);

    // 初期状態では「さくま式バランス整体（50分）」が表示されている
    expect(screen.getByRole('heading', { name: 'さくま式バランス整体（50分）' })).toBeInTheDocument();
    expect(screen.getAllByText('¥5,000').length).toBeGreaterThanOrEqual(1);

    // 他のメニュー（例: マタニティ）は表示されていない
    expect(screen.queryByRole('heading', { name: 'マタニティ整体（50分）' })).not.toBeInTheDocument();
  });

  it('should switch the active menu when clicking on a tab button', () => {
    render(<CourseDetails />);

    // 「マタニティ」のタブをクリック
    const maternityTab = screen.getByRole('button', { name: /マタニティ/ });
    fireEvent.click(maternityTab);

    // マタニティ整体（50分）が表示される
    expect(screen.getByRole('heading', { name: 'マタニティ整体（50分）' })).toBeInTheDocument();
    expect(screen.getAllByText('¥5,000').length).toBeGreaterThanOrEqual(1);

    // 一般は非表示になる
    expect(screen.queryByRole('heading', { name: 'さくま式バランス整体（50分）' })).not.toBeInTheDocument();
  });

  it('should support dynamic external active tab control via props', () => {
    // 外部からPropsで初期アクティブタブ（courseId）を制御できること（Courses.tsxカードからの遷移連携のため）
    render(<CourseDetails initialCourseId="balance-maternity" />);

    expect(screen.getByRole('heading', { name: 'マタニティ整体（50分）' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'さくま式バランス整体（50分）' })).not.toBeInTheDocument();
  });
});
