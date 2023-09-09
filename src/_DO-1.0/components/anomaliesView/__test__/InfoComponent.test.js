import React from 'react';
import { render, screen } from '@testing-library/react';
import InfoComponent from '../molecules/InfoComponent';

describe('InfoComponent', () => {
  it('renders owner details correctly', () => {
    const ownerDetails = {
      name: 'Rinosan',
      email: 'rino@rakuten.com',
    };

    render(<InfoComponent ownerDetails={ownerDetails} />);

    const ownerNameElement = screen.getByText(ownerDetails.name);
    const ownerEmailElement = screen.getByText(ownerDetails.email);
    const descriptionElement = screen.getByText(
      'Eng for Marketing & Sales data across APAC. Love surfing.'
    );

    expect(ownerNameElement).toBeInTheDocument();
    expect(ownerEmailElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  it('renders notification icons', () => {
    render(<InfoComponent />);

    const emailIconElement = screen.getByAltText('email icon');
    const slackIconElement = screen.getByAltText('slack icon');

    expect(emailIconElement).toBeInTheDocument();
    expect(slackIconElement).toBeInTheDocument();
  });
});
