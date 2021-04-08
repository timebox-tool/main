import { createEvent, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { TimeBoxPage } from ".";

describe("input", () => {
  it('should not trigger timing if there is nothing in input', async () => {
    render(<TimeBoxPage />);
    fireEvent.click(await findStartTimingButton());
    expect(queryTimerItems().length).toBe(0);
  });
  it('should trigger timing if there is nothing in input', async () => {
    render(<TimeBoxPage />);
    fireEvent.input(await findInputArea(), { target: { value: 1 } });
    fireEvent.click(await findStartTimingButton());
    expect(queryTimerItems().length).toBe(1);
  });
});

describe("slider", () => {
  it.only("should the time-limit set by slider works on time box item", async () => {
    render(<TimeBoxPage />);
    fireEvent.change(await findTimeLimitSlider(), { target: { value: 20 } });
    fireEvent.input(await findInputArea(), { target: { value: 1 } });
    fireEvent.click(await findStartTimingButton());
    expect(await findFirstTimerItem()).toHaveTextContent('LIMIT: 20MIN');
  });
});

const findTimeLimitSlider = async () => await screen.findByTestId('timer-limit-slider');
const findInputArea = async () => await screen.findByPlaceholderText('Activity or People');
const findStartTimingButton = async () => await screen.findByTitle('start timing');
const findFirstTimerItem = async () => await screen.findByTestId('timer-list-item');
const queryTimerItems = () => screen.queryAllByTestId('timer-list-item');