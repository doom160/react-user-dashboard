import { render, screen } from '@testing-library/react';
import { mainListItems,secondaryListItems  } from './ListItems';

test('List Item Main Dashboard', () => {
  render(mainListItems);
  var linkElement = screen.getByText('Dashboard').innerHTML
  expect(linkElement).toBe("Dashboard")
});

test('List Item Main Employee', () => {
  render(mainListItems);
  var linkElement = screen.getByText('Employee').innerHTML
  expect(linkElement).toBe("Employee")
});

test('List Item Main Reports', () => {
  render(mainListItems);
  var linkElement = screen.getByText('Reports').innerHTML
  expect(linkElement).toBe("Reports")
});

test('List Item Main Integrations', () => {
  render(mainListItems);
  var linkElement = screen.getByText('Integrations').innerHTML
  expect(linkElement).toBe("Integrations")
});

test('List Item Secondary Current', () => {
  render(secondaryListItems);
  var linkElement = screen.getByText('Current month').innerHTML
  expect(linkElement).toBe("Current month")
});

test('List Item Secondary Last', () => {
  render(secondaryListItems);
  var linkElement = screen.getByText('Last quarter').innerHTML
  expect(linkElement).toBe("Last quarter")
});

test('List Item Secondary Year', () => {
  render(secondaryListItems);
  var linkElement = screen.getByText('Year-end sale').innerHTML
  expect(linkElement).toBe("Year-end sale")
});
