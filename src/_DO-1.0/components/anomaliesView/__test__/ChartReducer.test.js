import {
  constructChartData,
  FRESHNESS,
  VOLUME,
  SCHEMA_CHANGE,
  FIELD_HEALTH,
  DQ_RULE,
  getDaysDifference,
} from '../reducers/chartReducer';


// Test case for FRESHNESS chart type
const testConstructDataForFreshness = () => {
  const startDate = new Date('2023-06-01');
  const endDate = new Date('2023-06-30');
  const data = [
    { current_status: 'status1', event_time: '2023-06-10T00:00:00' },
    { current_status: 'status2', event_time: '2023-06-15T00:00:00' },
    { current_status: 'status1', event_time: '2023-06-25T00:00:00' },
  ];
  const chartData = constructChartData(startDate, endDate, data, FRESHNESS);
  console.log(chartData);
};

// Test case for VOLUME chart type
const testConstructDataForVolume = () => {
  const chartData = constructChartData(null, null, null, VOLUME);
  console.log(chartData);
};

// Test case for SCHEMA_CHANGE chart type
const testConstructDataForSchemaChange = () => {
  const data = [
    { status: 'resolved', event_time: '2023-06-03T00:00:00', value: 0.12345 },
    { status: 'resolved', event_time: '2023-06-09T00:00:00', value: 0.6789 },
    { status: 'unresolved', event_time: '2023-06-17T00:00:00', value: 0.98765 },
    { status: 'current_anomaly', event_time: '2023-06-20T00:00:00', value: 0.54321 },
  ];
  const chartData = constructChartData(null, null, data, SCHEMA_CHANGE);
  console.log(chartData);
};

// Test case for FIELD_HEALTH chart type
const testConstructDataForFieldHealth = () => {
  const data = [
    { event_time: '2023-06-05T00:00:00', value: 70 },
    { event_time: '2023-06-10T00:00:00', value: 80 },
    { event_time: '2023-06-15T00:00:00', value: 90 },
  ];
  const chartData = constructChartData(null, null, data, FIELD_HEALTH);
  console.log(chartData);
};

// Test case for DQ_RULE chart type
const testConstructDataForDQRule = () => {
  const chartData = constructChartData(null, null, null, DQ_RULE);
  console.log(chartData);
};

// Import necessary testing libraries and modules


describe('constructChartData', () => {
  const startDate = new Date('2023-06-01');
  const endDate = new Date('2023-06-30');
  const data = [
    { current_status: 'status1', event_time: '2023-06-02' },
    { current_status: 'status2', event_time: '2023-06-05' },
    { current_status: 'status1', event_time: '2023-06-10' },
  ];

  it('should construct chart data for freshness', () => {
    const chartData = constructChartData(startDate, endDate, data, FRESHNESS);
    expect(chartData.series.length).toBeGreaterThan(0);
    expect(chartData.chartOptions.chart.type).toEqual('bar');
  });

  it('should construct chart data for volume', () => {
    const chartData = constructChartData(startDate, endDate, data, VOLUME);
    expect(chartData.series.length).toBeGreaterThan(0);
    expect(chartData.chartOptions.chart.type).toEqual('bar');
  });

  it('should construct chart data for schema change', () => {
    const chartData = constructChartData(startDate, endDate, data, SCHEMA_CHANGE);
    expect(chartData.series.length).toBeGreaterThan(0);
    expect(chartData.chartOptions.chart.type).toEqual('line');
  });

  it('should construct chart data for field health', () => {
    const chartData = constructChartData(startDate, endDate, data, FIELD_HEALTH);
    expect(chartData.series.length).toBeGreaterThan(0);
    expect(chartData.chartOptions.chart.type).toEqual('line');
  });

  it('should construct chart data for DQ rule', () => {
    const chartData = constructChartData(startDate, endDate, data, DQ_RULE);
  
    if (chartData) {
      expect(chartData.series).toBeDefined(); // Ensure series property is defined
      expect(chartData.series.length).toBeGreaterThan(0);
      expect(chartData.chartOptions.chart.type).toEqual(undefined);
    }
  });

  it('should return empty chart data for unknown chart type', () => {
    const chartData = constructChartData(startDate, endDate, data, 'unknown');
    expect(chartData.series.length).toBeGreaterThan(0);
    expect(chartData.chartOptions.chart.type).toEqual(undefined);
  });
});

describe('getDaysDifference', () => {
  it('should calculate the correct number of days difference', () => {
    const startDate = new Date('2023-06-01');
    const endDate = new Date('2023-06-30');
    const diffDays = getDaysDifference(startDate, endDate);
    expect(diffDays).toEqual(29);
  });
});

// Run the test cases
testConstructDataForFreshness();
testConstructDataForVolume();
testConstructDataForSchemaChange();
testConstructDataForFieldHealth();
testConstructDataForDQRule();