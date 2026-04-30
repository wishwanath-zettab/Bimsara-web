# Implementation Plan: Team Member Descriptions

## Overview

This implementation plan adds two optional description fields (`description1` and `description2`) to the team member management feature. The implementation follows a layered approach: database schema migration, backend API enhancement, and frontend UI updates. The feature maintains backward compatibility with existing team member records.

## Tasks

- [x] 1. Database schema migration
  - Add `description1` and `description2` columns to the `team_members` table
  - Implement safe migration logic that checks if columns already exist before adding them
  - Verify existing records have NULL values for new columns after migration
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 2. Backend API endpoint enhancements
  - [x] 2.1 Update POST /api/admin/team-members endpoint
    - Modify the endpoint to accept `description1` and `description2` from request body
    - Update the INSERT query to include description fields
    - Handle NULL values when descriptions are not provided
    - Update response to include description fields
    - _Requirements: 2.1, 2.2, 2.3, 2.4_
  
  - [x] 2.2 Update PUT /api/admin/team-members/:id endpoint
    - Modify the endpoint to accept `description1` and `description2` from request body
    - Update the UPDATE query to include description fields
    - Handle NULL values when descriptions are not provided
    - _Requirements: 3.1, 3.2, 3.3, 3.4_
  
  - [x] 2.3 Verify GET /api/admin/team-members endpoint returns description fields
    - Confirm the SELECT query returns all columns including description1 and description2
    - Test that NULL values are properly serialized in JSON responses
    - _Requirements: 4.1, 4.2, 4.3_

- [ ]* 2.4 Write unit tests for backend API endpoints
    - Test POST endpoint with descriptions provided
    - Test POST endpoint without descriptions (NULL handling)
    - Test PUT endpoint with description updates
    - Test GET endpoint returns description fields
    - _Requirements: 2.1, 2.2, 2.3, 3.1, 3.2, 4.1, 4.2_

- [x] 3. Checkpoint - Verify backend changes
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Frontend form state management
  - [x] 4.1 Update formData state in TeamMembersTab component
    - Add `description1` and `description2` fields to initial state
    - Initialize both fields as empty strings
    - _Requirements: 8.1, 5.5_
  
  - [x] 4.2 Update form reset logic
    - Ensure description fields are reset to empty strings when form is cancelled
    - Ensure description fields are cleared after successful submission
    - _Requirements: 8.2_
  
  - [x] 4.3 Update members state handling for edit mode
    - Ensure description fields are included when updating member state
    - Handle NULL values by converting to empty strings for input fields
    - Implement revert logic for cancelled edits
    - _Requirements: 8.3, 8.4_

- [ ] 5. Frontend UI - Add New Team Member form
  - [x] 5.1 Add description input fields to add form
    - Add "Description 1" text input field after position field
    - Add "Description 2" text input field after description1 field
    - Position both fields before the photo field
    - Make both fields optional (no required attribute)
    - Add placeholder text for user guidance
    - _Requirements: 5.1, 5.2, 5.3, 9.1, 9.2, 9.3_
  
  - [x] 5.2 Update handleAddMember to include descriptions
    - Append `description1` to FormData
    - Append `description2` to FormData
    - Send empty strings when descriptions are not entered
    - _Requirements: 5.4, 5.5_

- [x] 6. Frontend UI - Edit Team Member form
  - [x] 6.1 Add description input fields to edit mode
    - Add "Description 1" text input field in edit mode
    - Add "Description 2" text input field in edit mode
    - Populate fields with existing values when editing
    - Handle NULL values by displaying empty input fields
    - _Requirements: 6.1, 6.2, 6.3_
  
  - [x] 6.2 Update handleUpdateMember to include descriptions
    - Append `description1` to FormData (use empty string if NULL)
    - Append `description2` to FormData (use empty string if NULL)
    - _Requirements: 6.4_

- [x] 7. Frontend UI - Display team member descriptions
  - [x] 7.1 Add description display in view mode
    - Display `description1` below position field when not editing
    - Display `description2` below description1 field when not editing
    - Handle NULL or empty values gracefully (don't render empty divs)
    - Apply consistent styling with existing fields
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ]* 7.2 Add CSS styling for description fields
    - Add `.member-description` class with appropriate styling
    - Ensure consistent spacing and typography
    - Test responsive behavior
    - _Requirements: 7.4_

- [ ]* 8. Frontend component tests
    - Test form state initialization includes description fields
    - Test form reset clears description fields
    - Test description fields render in add form
    - Test description fields render in edit mode
    - Test description fields display in view mode
    - Test NULL values handled correctly in display
    - _Requirements: 5.1, 5.2, 6.1, 6.2, 7.1, 7.2, 8.1, 8.2_

- [ ] 9. Integration testing and validation
  - [ ] 9.1 Test end-to-end create flow
    - Create team member with both descriptions through UI
    - Verify record saved in database with correct values
    - Verify descriptions display in list view
    - _Requirements: 2.1, 2.2, 5.4, 7.1, 7.2_
  
  - [ ] 9.2 Test end-to-end update flow
    - Edit existing team member and add descriptions
    - Verify database updated with new values
    - Verify updated descriptions display correctly
    - _Requirements: 3.1, 3.2, 6.4, 7.1, 7.2_
  
  - [ ] 9.3 Test backward compatibility
    - Verify existing team members (created before migration) display correctly
    - Verify NULL descriptions don't break UI layout
    - Verify editing existing members without descriptions works
    - _Requirements: 10.1, 10.2, 10.3, 10.4_
  
  - [ ] 9.4 Test edge cases
    - Test with very long description text (1000+ characters)
    - Test with special characters and Unicode
    - Test with empty strings vs NULL values
    - Test form cancel reverts description changes
    - _Requirements: 9.3, 9.4, 8.4_

- [ ] 10. Final checkpoint - Complete validation
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- The implementation maintains backward compatibility with existing team member records
- Description fields are optional and do not require validation beyond accepting any text input
- NULL values in the database are handled by converting to empty strings in the UI
