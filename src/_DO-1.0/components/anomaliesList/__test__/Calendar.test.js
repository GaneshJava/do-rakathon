import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CalendarComponent from '../molecules/Calendar';
import '@testing-library/jest-dom';

describe('CalendarComponent', () => {
  it('renders without errors', () => {
    render(<CalendarComponent />);
    // Assert that the component renders without throwing any errors
  });

  // it('renders the date range picker', () => {
  //   render(<CalendarComponent />);
  //   const dateRangePicker = screen.getByTestId('region', { name: 'Date Range Picker' });
  //   expect(dateRangePicker).toBeInTheDocument();
  // });

  // it('updates the selected date range when a date range is selected', () => {
  //   render(<CalendarComponent />);
  //   const startDate = new Date('2023-06-01');
  //   const endDate = new Date('2023-06-07');
  //   const dateRangePicker = screen.getByTestId('region', { name: 'Date Range Picker' });
  //   fireEvent.change(dateRangePicker, { startDate, endDate });
  //   expect(startDate).toEqual(new Date('2023-06-01'));
  //   expect(endDate).toEqual(new Date('2023-06-07'));
  // });

  // it('renders the cancel button', () => {
  //   render(<CalendarComponent />);
  //   const cancelButton = screen.getByText('button', { name: 'Cancel' });
  //   expect(cancelButton).toBeInTheDocument();
  // });

  // it('renders the apply button', () => {
  //   render(<CalendarComponent />);
  //   const applyButton = screen.getByText('button', { name: 'Apply' });
  //   expect(applyButton).toBeInTheDocument();
  // });
  
});
