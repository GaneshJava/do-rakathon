import React from 'react';
import { render } from '@testing-library/react';
import AnomalyChart from '../molecules/AnomalyChart';
import { fieldHealthLegends } from '../reducers/chartReducer';
import { BrowserRouter } from 'react-router-dom';

describe('AnomalyChart', () => {
  test('Renders custom legend template with correct legend items', () => {
    // Render the component
    const { getAllByTestId } = render(
      <BrowserRouter><AnomalyChart /></BrowserRouter>
    );

    // Get the legend items
    const legendItems = getAllByTestId('legend-item');

    // Assert that the correct number of legend items is rendered
    expect(legendItems.length).toBe(fieldHealthLegends.length);

    // Assert that each legend item has the correct legend name and color
    fieldHealthLegends.forEach((legend, index) => {
      const legendItem = legendItems[index];
      const legendColorElement = legendItem.querySelector('.legend-color');
      const legendNameElement = legendItem.querySelector('.legend-name');

      // Assert the legend color
      expect(legendColorElement).toHaveStyle(`background-color: ${legend.fillColor}`);

      // Assert the legend name
      expect(legendNameElement.textContent).toBe(legend.name);
    });
  });

  test('Renders custom legend template with default legends if fieldHealthLegends is empty', () => {
    // Mock the fieldHealthLegends as empty
    jest.mock('../reducers/chartReducer', () => ({
      fieldHealthLegends: []
    }));

    // Render the component
    const { getAllByTestId } = render(<BrowserRouter><AnomalyChart /></BrowserRouter>);

    // Get the legend items
    const legendItems = getAllByTestId('legend-item');

    // Assert that the correct number of default legend items is rendered
    const defaultLegends = [
      { name: 'Currently Anomaly', fillColor: '#FF5C00' },
      { name: 'Unresolved', fillColor: '#D92D20' },
      { name: 'Resolved', fillColor: '#73EA95' }
    ];
    expect(legendItems.length).toBe(defaultLegends.length);

    // Assert that each legend item has the correct default legend name and color
    defaultLegends.forEach((legend, index) => {
      const legendItem = legendItems[index];
      const legendColorElement = legendItem.querySelector('.legend-color');
      const legendNameElement = legendItem.querySelector('.legend-name');

      // Assert the default legend color
      expect(legendColorElement).toHaveStyle(`background-color: ${legend.fillColor}`);

      // Assert the default legend name
      expect(legendNameElement.textContent).toBe(legend.name);
    });
  });

  test('Renders with entityType prop and displays custom legend template', () => {
    // Mock the getStatusText function to return a custom status text
    const mockGetStatusText = jest.fn().mockReturnValue('Custom Status Text');
    jest.mock('_DO-1.0/components/anomaliesList/molecules/ExpandAnomaly', () => ({
      getStatusText: mockGetStatusText
    }));

    // Render the component with entityType prop
    const { getByText, getAllByRole } = render(<BrowserRouter><AnomalyChart entityType="field_health" /></BrowserRouter>);

    // Assert that the custom status text is displayed
    expect(getByText('Custom Status Text')).toBeInTheDocument();

    // Get the legend items
    const legendItems = getAllByRole('listitem');

    // Assert that legend items are displayed
    expect(legendItems.length).toBeGreaterThan(0);
  });

  test('Renders with assetDetails prop and displays entity_level4', () => {
    // Define a sample assetDetails object
    const assetDetails = {
      entity_level4: 'Sample Entity Level 4'
    };

    // Render the component with assetDetails prop
    const { getByText } = render(<BrowserRouter><AnomalyChart assetDetails={assetDetails} /></BrowserRouter>);

    // Assert that the entity_level4 value is displayed
    expect(getByText('Sample Entity Level 4')).toBeInTheDocument();
  });


  test('Renders chart component when has chart data', () => {
    // Mock the getChartData function to return a sample chart data
    const mockGetChartData = jest
      .fn()
      .mockReturnValue({ labels: ['Label 1', 'Label 2'], datasets: [] });
    jest.mock('_DO-1.0/components/anomaliesList/molecules/ExpandAnomaly', () => ({
      getChartData: mockGetChartData
    }));

    // Render the component
    const { getByTestId } = render(<BrowserRouter><AnomalyChart /></BrowserRouter>);

    // Assert that the chart component is rendered
    expect(getByTestId('chart')).toBeInTheDocument();
  });

  test('Renders with correct background color when rendered from expander', () => {
    // Render the component with isExpander prop set to true
    const { getByTestId } = render(<BrowserRouter><AnomalyChart fromExpander={true} /></BrowserRouter>);

    // Assert that the component has the correct background color
    expect(getByTestId('anomaly-chart')).toHaveStyle('background-color: #F6F8FA');
  });

  test('Renders with correct background color when rendered without expander', () => {
    // Render the component without isExpander prop
    const { getByTestId } = render(<BrowserRouter><AnomalyChart /></BrowserRouter>);

    // Assert that the component has the correct background color
    expect(getByTestId('anomaly-chart')).toHaveStyle('background-color: #FFFFFF');
  });
});

jest.mock('../reducers/chartReducer', () => ({
  getChartOptions: jest.fn()
}));

jest.mock('components/charts', () => ({
  Chart: jest.fn()
}));

jest.mock('core-modules/Loader', () => ({
  Spinner: jest.fn()
}));

jest.mock('_DO-1.0/components/anomaliesList/molecules/ExpandAnomaly', () => ({
  getStatusText: jest.fn()
}));

jest.mock('primereact/divider', () => ({
  Divider: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn()
}));

describe('AnomalyChart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Renders with entityType prop and displays custom legend template', () => {
    const mockGetStatusText = jest.fn().mockReturnValue('Status Text');
    jest.mock('_DO-1.0/components/anomaliesList/molecules/ExpandAnomaly', () => ({
      getStatusText: mockGetStatusText
    }));

    jest.spyOn(React, 'useState').mockReturnValueOnce([
      {
        loading: false,
        chartData: [],
        chartOptions: {},
        chartType: 'bar',
        entityType: 'field_health'
      },
      jest.fn()
    ]);

    const { getByText, getAllByRole } = render(<BrowserRouter><AnomalyChart /></BrowserRouter>);

    expect(getByText('Status Text')).toBeInTheDocument();

    const legendItems = getAllByRole('listitem');
    expect(legendItems.length).toBeGreaterThan(0);
  });

  test('Renders with assetDetails prop and displays entity_level4', () => {
    const mockGetStatusText = jest.fn().mockReturnValue('Status Text');
    jest.mock('_DO-1.0/components/anomaliesList/molecules/ExpandAnomaly', () => ({
      getStatusText: mockGetStatusText
    }));

    jest
      .spyOn(React, 'useState')
      .mockReturnValueOnce([
        {
          loading: false,
          chartData: [],
          chartOptions: {},
          chartType: 'bar',
          entityType: 'field_health'
        },
        jest.fn()
      ]);

    const assetDetails = { entity_level4: 'Asset Details' };
    const { getByText } = render(<BrowserRouter><AnomalyChart assetDetails={assetDetails} /></BrowserRouter>);

    expect(getByText('Asset Details')).toBeInTheDocument();
  });

  test('Renders with loading state and shows loading spinner', () => {
    jest
      .spyOn(React, 'useState')
      .mockReturnValueOnce([
        { loading: true, chartData: [], chartOptions: {}, chartType: 'bar', entityType: '' },
        jest.fn()
      ]);

    const { getByTestId } = render(<BrowserRouter><AnomalyChart /></BrowserRouter>);

    expect(getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('Renders with chart data and displays the chart component', () => {
    jest
      .spyOn(React, 'useState')
      .mockReturnValueOnce([
        {
          loading: false,
          chartData: [1, 2, 3],
          chartOptions: {},
          chartType: 'bar',
          entityType: ''
        },
        jest.fn()
      ]);

    const { getByTestId } = render(<BrowserRouter><AnomalyChart /></BrowserRouter>);

    expect(getByTestId('chart-component')).toBeInTheDocument();
  });

  test('Renders from expander with correct background color', () => {
    jest
      .spyOn(React, 'useState')
      .mockReturnValueOnce([
        { loading: false, chartData: [], chartOptions: {}, chartType: 'bar', entityType: '' },
        jest.fn()
      ]);

    const { getByTestId } = render(<BrowserRouter><AnomalyChart fromExpander={true} /></BrowserRouter>);

    expect(getByTestId('component-container')).toHaveStyle(
      'background-color: var(--secondary-bg-color)'
    );
  });

  test('Renders without expander with correct background color', () => {
    jest
      .spyOn(React, 'useState')
      .mockReturnValueOnce([
        { loading: false, chartData: [], chartOptions: {}, chartType: 'bar', entityType: '' },
        jest.fn()
      ]);

    const { getByTestId } = render(<BrowserRouter><AnomalyChart /></BrowserRouter>);

    expect(getByTestId('component-container')).toHaveStyle(
      'background-color: var(--primary-bg-color)'
    );
  });
});
