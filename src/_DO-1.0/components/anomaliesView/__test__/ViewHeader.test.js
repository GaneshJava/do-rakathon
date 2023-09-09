import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ViewHeader, {  getClassName } from '../molecules/ViewHeader';


describe('ViewHeader', () => {
  const anomalyData = {
    event_type: 'Event Type',
    event_description: 'Event Description',
    conn_type: 'snowflake',
    entity_level1: 'Entity Level 1',
    entity_level2: 'Entity Level 2',
    entity_level3: 'Entity Level 3',
    entity_level4: 'Entity Level 4',
    current_status: 'open',
  };
  const timeLine = {
    open: { created_at: '2023-01-01', updated_at: '2023-01-02' },
    inprogress: { created_at: '2023-01-02', updated_at: '2023-01-03' },
    fixed: { created_at: '2023-01-03', updated_at: '2023-01-04' },
  };
  const entityType = 'field_health';


  test('calls handleOptionSelect when status menu option is selected', () => {
    const handleOptionSelect = jest.fn();
    render(<ViewHeader anomalyData={anomalyData} timeLine={timeLine} entityType={entityType} handleOptionSelect={handleOptionSelect} />);
    
    userEvent.click(screen.getByText('Change'));
    userEvent.click(screen.getByText('Option 1'));
    
    expect(handleOptionSelect).toHaveBeenCalledWith({ option: 'Option 1', e: expect.anything() });
  });

  test('renders custom className for different sections', () => {
    render(<ViewHeader anomalyData={anomalyData} timeLine={timeLine} entityType={entityType} />);
    
    expect(getClassName()).toBe('flex flex-col gap-2 text-sm font-PrimaryFont ');
    expect(getClassName('items-start')).toBe('flex flex-col gap-2 text-sm font-PrimaryFont items-start');
    expect(getClassName('w-[20rem]')).toBe('flex flex-col gap-2 text-sm font-PrimaryFont w-[20rem]');
  });

  test('renders timeline tracker correctly', () => {
    render(<ViewHeader anomalyData={anomalyData} timeLine={timeLine} entityType={entityType} />);
    
    const timelineTracker = screen.getByTestId('timeline-tracker');
    expect(timelineTracker).toBeInTheDocument();
    
    const timelineItems = timelineTracker.children;
    expect(timelineItems).toHaveLength(3);
    
    expect(timelineItems[0]).toHaveTextContent('open');
    expect(timelineItems[1]).toHaveTextContent('inprogress');
    expect(timelineItems[2]).toHaveTextContent('fixed');
  });

  test('renders timeline tracker correctly when timeLine object is empty', () => {
    const emptyTimeLine = {};
    render(<ViewHeader anomalyData={anomalyData} timeLine={emptyTimeLine} entityType={entityType} />);
    
    const timelineTracker = screen.getByTestId('timeline-tracker');
    expect(timelineTracker).toBeInTheDocument();
    
    const timelineItems = timelineTracker.children;
    expect(timelineItems).toHaveLength(3);
    
    expect(timelineItems[0]).toHaveTextContent('open');
    expect(timelineItems[1]).toHaveTextContent('inprogress');
    expect(timelineItems[2]).toHaveTextContent('fixed');
  });

  test('renders timeline tracker correctly when timeLine object is incomplete', () => {
    const incompleteTimeLine = {
      open: { created_at: '2023-01-01', updated_at: '2023-01-02' },
      fixed: { created_at: '2023-01-03', updated_at: '2023-01-04' },
    };
    render(<ViewHeader anomalyData={anomalyData} timeLine={incompleteTimeLine} entityType={entityType} />);
    
    const timelineTracker = screen.getByTestId('timeline-tracker');
    expect(timelineTracker).toBeInTheDocument();
    
    const timelineItems = timelineTracker.children;
    expect(timelineItems).toHaveLength(3);
    
    expect(timelineItems[0]).toHaveTextContent('open');
    expect(timelineItems[1]).toHaveTextContent('inprogress');
    expect(timelineItems[2]).toHaveTextContent('fixed');
  });

  test('renders timeline tracker correctly when entityType is not "field_health"', () => {
    const nonFieldHealthEntityType = 'some_entity_type';
    render(<ViewHeader anomalyData={anomalyData} timeLine={timeLine} entityType={nonFieldHealthEntityType} />);
    
    const timelineTracker = screen.getByTestId('timeline-tracker');
    expect(timelineTracker).toBeInTheDocument();
    
    const timelineItems = timelineTracker.children;
    expect(timelineItems).toHaveLength(3);
    
    expect(timelineItems[0]).toHaveTextContent('open');
    expect(timelineItems[1]).toHaveTextContent('inprogress');
    expect(timelineItems[2]).toHaveTextContent('fixed');
  });
});
