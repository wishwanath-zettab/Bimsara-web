import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TeamMembersTab from './TeamMembersTab';
import axios from 'axios';

// Mock axios
jest.mock('axios');

// Mock react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock ConfirmDialog component
jest.mock('../../../components/ConfirmDialog', () => {
  return function ConfirmDialog() {
    return <div data-testid="confirm-dialog">Confirm Dialog</div>;
  };
});

describe('TeamMembersTab - Form Reset Logic (Task 4.2)', () => {
  const mockGetAuthHeaders = jest.fn(() => ({
    headers: { Authorization: 'Bearer test-token' },
  }));

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock GET request for fetching members
    axios.get.mockResolvedValue({ data: [] });
  });

  describe('Form reset when cancelled', () => {
    it('should reset all form fields when form is cancelled', async () => {
      render(<TeamMembersTab getAuthHeaders={mockGetAuthHeaders} />);

      // Wait for initial fetch
      await waitFor(() => {
        expect(axios.get).toHaveBeenCalled();
      });

      // Click "Add New Team Member" button
      const addButton = screen.getByText('+ Add New Team Member');
      fireEvent.click(addButton);

      // Fill in the form
      const nameInput = screen.getByPlaceholderText('Enter name');
      const positionInput = screen.getByPlaceholderText('Enter position');

      fireEvent.change(nameInput, { target: { value: 'Test Member' } });
      fireEvent.change(positionInput, { target: { value: 'Test Position' } });

      // Verify fields have values
      expect(nameInput.value).toBe('Test Member');
      expect(positionInput.value).toBe('Test Position');

      // Click cancel button
      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);

      // Verify the form was closed
      expect(screen.queryByText('Add New Team Member')).not.toBeInTheDocument();

      // Open the form again to verify state was reset
      const addButtonAgain = screen.getByText('+ Add New Team Member');
      fireEvent.click(addButtonAgain);

      // Verify all fields are empty (reset to initial state)
      const nameInputAfterReset = screen.getByPlaceholderText('Enter name');
      const positionInputAfterReset = screen.getByPlaceholderText('Enter position');

      expect(nameInputAfterReset.value).toBe('');
      expect(positionInputAfterReset.value).toBe('');
      // Note: description fields are not yet in the UI (Task 5.1), but the state reset logic is in place
      // The formData state includes description1: '' and description2: '' in the reset
    });
  });

  describe('Form state initialization', () => {
    it('should initialize formData with empty strings for all fields', async () => {
      render(<TeamMembersTab getAuthHeaders={mockGetAuthHeaders} />);

      // Wait for initial fetch
      await waitFor(() => {
        expect(axios.get).toHaveBeenCalled();
      });

      // Click "Add New Team Member" button
      const addButton = screen.getByText('+ Add New Team Member');
      fireEvent.click(addButton);

      // Verify form is displayed with empty fields
      const nameInput = screen.getByPlaceholderText('Enter name');
      const positionInput = screen.getByPlaceholderText('Enter position');

      expect(nameInput.value).toBe('');
      expect(positionInput.value).toBe('');
      // Note: description fields are not yet in the UI (Task 5.1), but the state is initialized correctly
      // The formData state includes description1: '' and description2: '' in the initial state
    });
  });
});

describe('TeamMembersTab - Description Display in View Mode (Task 7.1)', () => {
  const mockGetAuthHeaders = jest.fn(() => ({
    headers: { Authorization: 'Bearer test-token' },
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display description1 and description2 in view mode when both are present', async () => {
    // Mock GET request with team members that have descriptions
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          name: 'John Doe',
          position: 'Senior Agent',
          photo_path: '/uploads/test.jpg',
          display_order: 1,
          description1: 'Specializes in residential properties',
          description2: '10 years of experience',
        },
      ],
    });

    render(<TeamMembersTab getAuthHeaders={mockGetAuthHeaders} />);

    // Wait for members to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Verify name and position are displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Senior Agent')).toBeInTheDocument();

    // Verify description1 and description2 are displayed
    expect(screen.getByText('Specializes in residential properties')).toBeInTheDocument();
    expect(screen.getByText('10 years of experience')).toBeInTheDocument();
  });

  it('should display only description1 when description2 is null', async () => {
    // Mock GET request with team member that has only description1
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          name: 'Jane Smith',
          position: 'Property Manager',
          photo_path: '/uploads/test.jpg',
          display_order: 1,
          description1: 'Manages commercial properties',
          description2: null,
        },
      ],
    });

    render(<TeamMembersTab getAuthHeaders={mockGetAuthHeaders} />);

    // Wait for members to load
    await waitFor(() => {
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    // Verify description1 is displayed
    expect(screen.getByText('Manages commercial properties')).toBeInTheDocument();

    // Verify description2 is not displayed (no empty div)
    expect(screen.queryByText('10 years of experience')).not.toBeInTheDocument();
  });

  it('should display only description2 when description1 is null', async () => {
    // Mock GET request with team member that has only description2
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          name: 'Bob Johnson',
          position: 'Sales Associate',
          photo_path: '/uploads/test.jpg',
          display_order: 1,
          description1: null,
          description2: 'Fluent in English and Spanish',
        },
      ],
    });

    render(<TeamMembersTab getAuthHeaders={mockGetAuthHeaders} />);

    // Wait for members to load
    await waitFor(() => {
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    });

    // Verify description2 is displayed
    expect(screen.getByText('Fluent in English and Spanish')).toBeInTheDocument();
  });

  it('should not display description divs when both descriptions are null', async () => {
    // Mock GET request with team member without descriptions
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          name: 'Alice Brown',
          position: 'Agent',
          photo_path: '/uploads/test.jpg',
          display_order: 1,
          description1: null,
          description2: null,
        },
      ],
    });

    render(<TeamMembersTab getAuthHeaders={mockGetAuthHeaders} />);

    // Wait for members to load
    await waitFor(() => {
      expect(screen.getByText('Alice Brown')).toBeInTheDocument();
    });

    // Verify name and position are displayed
    expect(screen.getByText('Alice Brown')).toBeInTheDocument();
    expect(screen.getByText('Agent')).toBeInTheDocument();

    // Verify no description elements are rendered
    const memberInfo = screen.getByText('Alice Brown').parentElement;
    const descriptionElements = memberInfo.querySelectorAll('.member-description');
    expect(descriptionElements.length).toBe(0);
  });

  it('should not display description divs when both descriptions are empty strings', async () => {
    // Mock GET request with team member with empty string descriptions
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          name: 'Charlie Davis',
          position: 'Consultant',
          photo_path: '/uploads/test.jpg',
          display_order: 1,
          description1: '',
          description2: '',
        },
      ],
    });

    render(<TeamMembersTab getAuthHeaders={mockGetAuthHeaders} />);

    // Wait for members to load
    await waitFor(() => {
      expect(screen.getByText('Charlie Davis')).toBeInTheDocument();
    });

    // Verify name and position are displayed
    expect(screen.getByText('Charlie Davis')).toBeInTheDocument();
    expect(screen.getByText('Consultant')).toBeInTheDocument();

    // Verify no description elements are rendered (empty strings are falsy)
    const memberInfo = screen.getByText('Charlie Davis').parentElement;
    const descriptionElements = memberInfo.querySelectorAll('.member-description');
    expect(descriptionElements.length).toBe(0);
  });

  it('should hide descriptions when entering edit mode', async () => {
    // Mock GET request with team member that has descriptions
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          name: 'John Doe',
          position: 'Senior Agent',
          photo_path: '/uploads/test.jpg',
          display_order: 1,
          description1: 'Specializes in residential properties',
          description2: '10 years of experience',
        },
      ],
    });

    render(<TeamMembersTab getAuthHeaders={mockGetAuthHeaders} />);

    // Wait for members to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Verify descriptions are displayed in view mode
    expect(screen.getByText('Specializes in residential properties')).toBeInTheDocument();
    expect(screen.getByText('10 years of experience')).toBeInTheDocument();

    // Click edit button
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    // Verify descriptions are no longer displayed as text (now in input fields)
    // The text should not be in the document as plain text divs with class member-description
    const memberRows = document.querySelectorAll('.member-row');
    const descriptionDivs = memberRows[0].querySelectorAll('.member-description');
    expect(descriptionDivs.length).toBe(0);

    // Verify description input fields are present
    expect(screen.getByPlaceholderText('Description 1')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description 2')).toBeInTheDocument();
  });
});
