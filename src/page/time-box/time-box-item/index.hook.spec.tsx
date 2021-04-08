import { renderHook } from "@testing-library/react-hooks";
import * as useTimerModule from "hooks/use-timer";
import { useTimeBoxItemHook } from "./index.hook";

const mockUseTimer = () => jest.spyOn(useTimerModule, 'useTimer');
mockUseTimer().mockReturnValue({
  time: 100,
  isTimerStopped: false,
  stop: jest.fn(),
  go: jest.fn(),
});

describe("useTimeBoxItemHook", () => {
  it("should timeout when time exceed limit", () => {
    const hookRender = () => useTimeBoxItemHook({ limit: 80 });
    const { result } = renderHook(hookRender);
    expect(result.current.isTimeout).toBe(true);
  });
  it("should not timeout when time inferior limit", () => {
    const hookRender = () => useTimeBoxItemHook({ limit: 120 });
    const { result } = renderHook(hookRender);
    expect(result.current.isTimeout).toBe(true);
  });
});