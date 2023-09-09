export const getPaginationRange = (pageIndex, pageCount) => {
    let start = pageIndex - 2;
    if (start < 0) {
      start = 0;
    }

    let end = start + 5;
    if (end > pageCount) {
      end = pageCount;
      start = end - 5;
      if (start < 0) {
        start = 0;
      }
    }

    return Array.from({ length: end - start }, (_, i) => i + start);
  };

  export const pageRangeOptions = [
    { value: 5, label: '5/Page' },
    { value: 10, label: '10/Page' },
    { value: 15, label: '15/Page' },
  ];