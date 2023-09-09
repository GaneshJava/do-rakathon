import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { customPaginatorTemplate } from '../customPaginatorTemplate';
import '@testing-library/jest-om';

describe('customPaginatorTemplate', () => {
  it('should render the Previous page link correctly', () => {
    const options = {
      className: 'prev-page-link',
      onClick: jest.fn(),
      disabled: false,
    };

    const { getByText, getByAltText } = render(
      <customPaginatorTemplate.PrevPageLink {...options} />
    );

    const prevPageLink = getByText('Previous');
    const previousIcon = getByAltText('previous');

    expect(prevPageLink).toBeInTheDocument();
    expect(previousIcon).toBeInTheDocument();
    expect(prevPageLink).toHaveClass('text-secondaryBorderColor');
    expect(previousIcon).toHaveAttribute('src', '../assets/previous.svg');

    fireEvent.click(prevPageLink);
    expect(options.onClick).toHaveBeenCalled();
  });

  it('should render the Next page link correctly', () => {
    const options = {
      className: 'next-page-link',
      onClick: jest.fn(),
      disabled: true,
    };

    const { getByText, getByAltText } = render(
      <customPaginatorTemplate.NextPageLink {...options} />
    );

    const nextPageLink = getByText('Next');
    const nextIcon = getByAltText('next');

    expect(nextPageLink).toBeInTheDocument();
    expect(nextIcon).toBeInTheDocument();
    expect(nextPageLink).toHaveClass('text-secondaryBorderColor');
    expect(nextIcon).toHaveAttribute('src', '../assets/previous.svg');
    expect(nextIcon).toHaveClass('rotate-180');

    fireEvent.click(nextPageLink);
    expect(options.onClick).toHaveBeenCalled();
  });

  it('should render the page links correctly', () => {
    const options = {
      className: 'page-link',
      onClick: jest.fn(),
      view: {
        startPage: 0,
        endPage: 5,
      },
      page: 3,
      totalPages: 10,
    };

    const { getByText, queryByText } = render(
      <customPaginatorTemplate.PageLinks {...options} />
    );

    const currentPageLink = getByText('4');
    expect(currentPageLink).toBeInTheDocument();
    expect(currentPageLink).toHaveClass('page-link');

    const dots = queryByText('...');
    expect(dots).toBeNull();

    fireEvent.click(currentPageLink);
    expect(options.onClick).toHaveBeenCalled();
  });

  it('should invoke the onClick event when page links are clicked', () => {
    const options = {
      className: 'page-link',
      onClick: jest.fn(),
      view: {
        startPage: 0,
        endPage: 5,
      },
      page: 3,
      totalPages: 10,
    };

    const { getByText } = render(
      <customPaginatorTemplate.PageLinks {...options} />
    );

    const pageLink = getByText('4');

    fireEvent.click(pageLink);
    expect(options.onClick).toHaveBeenCalled();
  });
  

  it('should render the Previous page link as disabled when disabled is true', () => {
    const options = {
      className: 'prev-page-link',
      onClick: jest.fn(),
      disabled: true,
    };

    const { getByText } = render(
      <customPaginatorTemplate.PrevPageLink {...options} />
    );

    const prevPageLink = getByText('Previous');

    expect(prevPageLink).toBeInTheDocument();
    expect(prevPageLink).toHaveClass('text-secondaryBorderColor');
    expect(prevPageLink).toBeDisabled();

    fireEvent.click(prevPageLink);
    expect(options.onClick).not.toHaveBeenCalled();
  });

  it('should render the Next page link as disabled when disabled is true', () => {
    const options = {
      className: 'next-page-link',
      onClick: jest.fn(),
      disabled: true,
    };

    const { getByText } = render(
      <customPaginatorTemplate.NextPageLink {...options} />
    );

    const nextPageLink = getByText('Next');

    expect(nextPageLink).toBeInTheDocument();
    expect(nextPageLink).toHaveClass('text-secondaryBorderColor');
    expect(nextPageLink).toBeDisabled();

    fireEvent.click(nextPageLink);
    expect(options.onClick).not.toHaveBeenCalled();
  });

  it('should render the page links as active when the current page matches', () => {
    const options = {
      className: 'page-link',
      onClick: jest.fn(),
      view: {
        startPage: 0,
        endPage: 5,
      },
      page: 2,
      totalPages: 10,
    };

    const { getByText } = render(
      <customPaginatorTemplate.PageLinks {...options} />
    );

    const currentPageLink = getByText('3');
    expect(currentPageLink).toBeInTheDocument();
    expect(currentPageLink).toHaveClass('page-link active');
  });

  it('should render the dots correctly when at the start or end page', () => {
    const optionsStart = {
      className: 'page-link',
      onClick: jest.fn(),
      view: {
        startPage: 1,
        endPage: 5,
      },
      page: 0,
      totalPages: 10,
    };

    const optionsEnd = {
      className: 'page-link',
      onClick: jest.fn(),
      view: {
        startPage: 0,
        endPage: 4,
      },
      page: 5,
      totalPages: 10,
    };

    const { getByText } = render(
      <>
        <customPaginatorTemplate.PageLinks {...optionsStart} />
        <customPaginatorTemplate.PageLinks {...optionsEnd} />
      </>
    );

    const dotsStart = getByText('...');
    const dotsEnd = getByText('...');

    expect(dotsStart).toBeInTheDocument();
    expect(dotsEnd).toBeInTheDocument();
    expect(dotsStart).toHaveClass('p-disabled');
    expect(dotsEnd).toHaveClass('p-disabled');
  });
});
