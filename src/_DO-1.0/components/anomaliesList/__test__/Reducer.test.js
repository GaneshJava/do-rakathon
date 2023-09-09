import {
    anomalyTableColumns,
    dateDropDownOption,
    filterButtons,
    issueTypeOptions,
    statusOptions,
    convertTimeToString,
    getRelativeTime,
  } from "../reducers";
  
  describe("tableData", () => {
    test("anomalyTableColumns should have length > 0", () => {
      expect(anomalyTableColumns.length).toBeGreaterThan(0);
    });
  
    test("dateDropDownOption should have a length of 4", () => {
      expect(dateDropDownOption.length).toBe(4);
    });
  
    test("filterButtons should have a length of 3", () => {
      expect(filterButtons.length).toBe(3);
    });
  
    test("issueTypeOptions should have a length > 0", () => {
      expect(issueTypeOptions.length).toBeGreaterThan(0);
    });
  
    test("statusOptions should have a length > 0", () => {
      expect(statusOptions.length).toBeGreaterThan(0);
    });
  
    test("anomalyTableColumns should contain objects with required properties", () => {
      anomalyTableColumns.forEach((data) => {
        expect(data).toHaveProperty("key");
        expect(data).toHaveProperty("name");
        expect(data).toHaveProperty("field");
      });
    });
  
    test("dateDropDownOption should contain objects with required properties", () => {
      dateDropDownOption.forEach((data) => {
        expect(data).toHaveProperty("key");
        expect(data).toHaveProperty("label");
      });
    });
  
    test("filterButtons should contain objects with required properties", () => {
      filterButtons.forEach((data) => {
        expect(data).toHaveProperty("key");
        expect(data).toHaveProperty("label");
      });
    });
  
    test("statusOptions should contain objects with required properties", () => {
      statusOptions.forEach((data) => {
        expect(data).toHaveProperty("key");
        expect(data).toHaveProperty("label");
      });
    });
  
    it("should return 'Today' and formatted time when input date is today", () => {
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
      const timeString = new Date().toISOString().slice(0, 10) + "T" + currentTime;
      const result = convertTimeToString(timeString);
      expect(result.date).toBe("Today");
      expect(result.time).toBe(currentTime);
    });
  
    it("should return the relative time in hours when diffInHours is less than 24", () => {
      const currentDate = new Date();
      const inputDate = new Date(currentDate.getTime() - 85000000); // Set inputDate 23 hours and 36 minutes in the past
      const result = getRelativeTime(inputDate.toISOString());
      expect(result).toMatch(/^23 hr/);
    });
  
    it("should return an empty string when diffInMilliseconds is less than 0", () => {
      const currentDate = new Date();
      const inputDate = new Date(currentDate.getTime() + 1000); // Set inputDate 1 second in the future
      const result = getRelativeTime(inputDate.toISOString());
      expect(result).toBe("");
    });
  
    it("should return the relative time in months when diffInDays is greater than or equal to 30", () => {
      const currentDate = new Date();
      const inputDate = new Date(currentDate.getTime() - 31 * 24 * 60 * 60 * 1000); // Set inputDate 31 days in the past
      const result = getRelativeTime(inputDate.toISOString());
      expect(result).toMatch(/month ago/);
    });
  
    it("should return the relative time in seconds when diffInSeconds is less than 60", () => {
      const currentDate = new Date();
      const inputDate = new Date(currentDate.getTime() - 5000); // Set inputDate 5 seconds in the past
      const result = getRelativeTime(inputDate.toISOString());
      expect(result).toMatch(/^[0-5]\s*seconds ago$/);
    });
  
    it("should return the relative time in minutes when diffInMinutes is less than 60", () => {
      const currentDate = new Date();
      const inputDate = new Date(currentDate.getTime() - 3500000); // Set inputDate 58 minutes and 20 seconds in the past
      const result = getRelativeTime(inputDate.toISOString());
      expect(result).toBe("58 min ago");
    });
  
    it("should return the relative time in hours when diffInHours is less than 24", () => {
      const currentDate = new Date();
      const inputDate = new Date(currentDate.getTime() - 85000000); // Set inputDate 23 hours and 36 minutes in the past
      const result = getRelativeTime(inputDate.toISOString());
      expect(result).toBe("23 hr ago");
    });
  
    it("should return the relative time in days when diffInDays is less than 30", () => {
      const currentDate = new Date();
      const inputDate = new Date(currentDate.getTime() - 1296000000); // Set inputDate 15 days in the past
      const result = getRelativeTime(inputDate.toISOString());
      expect(result).toContain("15");
    });
  
    it("should return the relative time in months when diffInDays is exactly 30", () => {
      const currentDate = new Date();
      const inputDate = new Date(currentDate.getTime() - 2592000000); // Set inputDate 30 days in the past
      const result = getRelativeTime(inputDate.toISOString());
      expect(result).toMatch(/^\d+\s*month ago$/);
    });
  });
  