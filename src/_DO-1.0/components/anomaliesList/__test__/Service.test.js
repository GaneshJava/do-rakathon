import { tableData } from "../molecules/Service";

describe('tableData', () => {
    test('should have a length of 0', () => {
      expect(tableData.length).toBeGreaterThan(0);
    });
  
    test('should contain objects with required properties', () => {
      tableData.forEach((data) => {
        expect(data).toHaveProperty('id');
        expect(data).toHaveProperty('tenant_id');
        expect(data).toHaveProperty('entity_level1');
      });
    });
  });
  
