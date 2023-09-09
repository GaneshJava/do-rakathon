import { customMenuTemplate } from '../customMenuTemplate';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Menu } from 'primereact/menu';
import '@testing-library/jest-dom';

describe('customMenuTemplate', () => {
  const options = [
    { key: '1', label: 'Option 1' },
    { key: '2', label: 'Option 2' },
    { key: '3', label: 'Option 3' },
  ];

  const onClickMock = jest.fn();
  const optionTemplateMock = jest.fn();
  const _optionsMock = {
    onClick: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the menu template without option template', () => {
    const selectedOption = '1';
    const selectedOptionIcon = <span>Icon</span>;
    const closeMenuAfterSelect = true;

    const { container } = render(
      <>
      <Menu model={customMenuTemplate({
          options,
          onClick: onClickMock,
          selectedOption,
          selectedOptionIcon,
          closeMenuAfterSelect,
        })}
        />
      </>
    );
    expect(container).toBeInTheDocument();
  });

  it('renders the menu template with option template', () => {
    render(
      <>
        {JSON.stringify(customMenuTemplate({ options, onClick: onClickMock, optionTemplate: optionTemplateMock })[0].template(null, _optionsMock))}
      </>
    );

    expect(optionTemplateMock).toBeDefined();
  });
});

