import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import AnomaliesIndex from '../index';

// Mock the toolbar function
jest.mock('components/charts/constants', () => ({
    toolbar: jest.fn().mockReturnValue(null),
}));

describe('AnomaliesIndex', () => {
    test('renders AnomaliesIndex component', () => {
        render(<AnomaliesIndex />);
        // Verify that the component renders without errors
        expect(screen.getByText('Anomalies')).toBeInTheDocument();
        expect(
            screen.getByText('Manage your recent anomalies across your data sources')
        ).toBeInTheDocument();
    });

    test('handles date button click', () => {
        render(<AnomaliesIndex />);
        fireEvent.click(screen.getByText('Last 30 days'));
        expect(screen.getAllByText('Last 24 Hrs')[0]).toBeInTheDocument();
    });
});
