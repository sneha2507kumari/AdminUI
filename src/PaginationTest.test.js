import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import PaginationPage from "./PaginationPage";


test("Delete button is working or not", () => {
  const handlePageChange = jest.fn();
  const handleDeleteSelected = jest.fn();

  render(
    <PaginationPage
      totalPages={5}
      currentPage={3}
      handlePageChange={handlePageChange}
      handleDeleteSelected={handleDeleteSelected}
    />
  );

  fireEvent.click(screen.getByLabelText("Delete Selected"));
  expect(handleDeleteSelected).toHaveBeenCalled();
});
test("clicking on pagination buttons to view the changing are working or not", () => {
  const handlePageChange = jest.fn();
  const handleDeleteSelected = jest.fn();

  render(
    <PaginationPage
      totalPages={5}
      currentPage={3}
      handlePageChange={handlePageChange}
      handleDeleteSelected={handleDeleteSelected}
    />
  );
  fireEvent.click(screen.getByLabelText("Previous Page"));
  expect(handlePageChange).toHaveBeenCalledWith(2);

  fireEvent.click(screen.getByLabelText("Next Page"));
  expect(handlePageChange).toHaveBeenCalledWith(4);
});



