import { fireEvent, render, screen } from "@testing-library/react";
import { Key } from "ts-key-enum";
import { KeyCatcher } from ".";


it('should run onEnter when I press enter key ', async () => {
  const onEnter = jest.fn();
  const content = 'any-content';
  render(<KeyCatcher onEnter={onEnter}><div>{content}</div></KeyCatcher>);
  const keyCatcherArea = await screen.findByText(content);
  fireEvent.keyDown(keyCatcherArea, { key: Key.Enter });
  
  expect(onEnter).toHaveBeenCalledTimes(1);
});