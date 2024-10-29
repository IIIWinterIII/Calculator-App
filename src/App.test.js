import { render, screen } from '@testing-library/react';
import App from './App';

test('renders shift title', () => {
  render(<App />); // Убери act, так как это не нужно
  const titleElement = screen.getByText(/Смены/i); // Обнови на актуальный текст
  expect(titleElement).toBeInTheDocument();
});
