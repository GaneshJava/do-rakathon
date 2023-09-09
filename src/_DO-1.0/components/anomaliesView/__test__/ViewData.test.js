import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ViewData from "../molecules/ViewData";
describe("View Data component", () => {
    // it("renders the ViewChart component", () => {
    //     render(<ViewData entityType="schema_changes" assetDetails={{}} />);
    //     expect(screen.getByText("ViewChart")).toBeInTheDocument();
    // });



    // describe('ViewChart', () => {
    //     it('renders without errors', () => {
    //         render(<ViewData entityType="schema_changes" assetDetails={{}} />);
    //     });

    //     it('renders the schema changes table when entityType is "schema_changes"', () => {
    //         const { getByText } = render(<ViewData entityType="schema_changes" assetDetails={{}} />);
    //         const tableHeader = getByText('Changes');
    //         expect(tableHeader).toBeInTheDocument();
    //     });

    //     it('renders the date selection button', () => {
    //         const { getByRole } = render(<ViewData entityType="schema_changes" assetDetails={{}} />);
    //         const dateButton = getByRole('button', { name: /date selection/i });
    //         expect(dateButton).toBeInTheDocument();
    //     });

    //     it('opens the date menu when the date selection button is clicked', () => {
    //         const { getByRole, getByText } = render(<ViewData entityType="schema_changes" assetDetails={{}} />);
    //         const dateButton = getByRole('button', { name: /date selection/i });
    //         fireEvent.click(dateButton);
    //         const dateOption = getByText(/last 7 days/i);
    //         expect(dateOption).toBeInTheDocument();
    //     });


    // });


});