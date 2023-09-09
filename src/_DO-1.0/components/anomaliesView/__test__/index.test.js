
import { getEntityData } from '../reducers/index';

// describe("Details component", () => {
//   it("renders the ViewChart component", () => {
//     render(<ViewChart />);
//     expect(screen.getByText("ViewChart")).toBeInTheDocument();
//   });
// });
//   it("renders the ViewDataQuery component", () => {
//     render(<ViewDataQuery />);
//     expect(screen.getByText("DataQuery")).toBeInTheDocument();
//   });
// });


describe('getEntityData', () => {
  test('Returns entity data with provided values', () => {
    const inputData = {
      entity_level1: 'Level 1',
      entity_level2: 'Level 2',
      entity_level3: 'Level 3',
      entity_level4: 'Level 4',
      event_type: 'Event Type',
      current_status: 'Status',
      event_description: 'Event Description',
    };

    const result = getEntityData(inputData);

    expect(result).toEqual({
      entity_level1: 'Level 1',
      entity_level2: 'Level 2',
      entity_level3: 'Level 3',
      entity_level4: 'Level 4',
      event_type: 'Event Type',
      current_status: 'Status',
      event_description: 'Event Description',
      id: expect.any(Number),
      tenant_id: 'rakuten',
      conn_id: 'conn',
      event_sub_type: null,
      event_time: '2023-05-11T00:00:00',
      action_time: null,
      attributes: null,
      severity: 'low',
      asset_type: 'file',
      conn_type: 'snowflake',
    });
  });

  test('Generates a unique ID for each entity', () => {
    const inputData1 = {
      entity_level1: 'Level 1',
      entity_level2: 'Level 2',
      entity_level3: 'Level 3',
      entity_level4: 'Level 4',
      event_type: 'Event Type',
      current_status: 'Status',
      event_description: 'Event Description',
    };

    const inputData2 = {
      entity_level1: 'Another Level 1',
      entity_level2: 'Another Level 2',
      entity_level3: 'Another Level 3',
      entity_level4: 'Another Level 4',
      event_type: 'Another Event Type',
      current_status: 'Another Status',
      event_description: 'Another Event Description',
    };

    const result1 = getEntityData(inputData1);
    const result2 = getEntityData(inputData2);

    expect(result1.id).not.toBe(result2.id);
  });
});

