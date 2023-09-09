import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExpandAnomaly from '../molecules/ExpandAnomaly';
import { getStatusText } from '../molecules/ExpandAnomaly';
import '@testing-library/jest-dom';

describe('ExpandAnomaly', () => {
  const rowData = {
    event_type: 'freshness',
    event_description: 'Some event description',
  };

  test('renders ExpandAnomaly component', () => {
    render(<ExpandAnomaly rowData={rowData} />);
    // Verify that the component renders without errors
    expect(screen.getByText(rowData.event_description)).toBeInTheDocument();
    expect(screen.getByText('Change Status')).toBeInTheDocument();
    expect(screen.getByText('Diagnostics')).toBeInTheDocument();
  });

  test('handles button click', () => {
    render(<ExpandAnomaly rowData={rowData} />);
    fireEvent.click(screen.getByText('Change Status'));
    // Write your assertions for the expected behavior after the button click
  });

  // test('displays correct status text', () => {
  //   const rowData = {
  //     event_type: 'volume',
  //     event_description: 'Some event description',
  //   };
  //   render(<ExpandAnomaly rowData={rowData} />);
  //   const statusText = screen.getByText('Volume in the last 20 days');
  //   expect(statusText).toBeInTheDocument();
  // });

  test('displays last update time and delay', () => {
    const rowData = {
      event_type: 'schema_changes',
      event_description: 'Some event description',
    };
    render(<ExpandAnomaly rowData={rowData} />);
    const lastUpdateText = screen.getByText('last update 12.23pm');
    const delayText = screen.getByText('2.08 delay');
    expect(lastUpdateText).toBeInTheDocument();
    expect(delayText).toBeInTheDocument();
  });

  test('returns correct status text for freshness', () => {
    const statusText = getStatusText('freshness');
    expect(statusText).toBe('Freshness');
  });

  test('returns correct status text for DQ rules', () => {
    const statusText = getStatusText('dq_rules');
    expect(statusText).toBe('DQ Rules');
  });
  
  test('returns correct status text for volume', () => {
    const statusText = getStatusText('volume');
    expect(statusText).toBe('Volume');
  });

  test('returns correct status text for schema changes', () => {
    const statusText = getStatusText('schema_changes');
    expect(statusText).toBe('Schema Change');
  });
});
