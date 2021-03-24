import { renderHook } from "@testing-library/react-hooks";
import * as useTimerModule from "hooks/use-timer";
import { useTimeBoxItemHook } from "./index.hook";

const mockUseTimer = () => jest.spyOn(useTimerModule, 'useTimer');

describe("useTimeBoxItemHook", () => {
  it("check timeout logic", () => {
    mockUseTimer().mockReturnValue({
      time: 100,
      isTimerStopped: false,
      stop: jest.fn(),
      go: jest.fn(),
    });
    const hookRender = () => useTimeBoxItemHook({ limit: 80 });
    const { result } = renderHook(hookRender);
    expect(result.current.isTimeout).toBe(true);
  });
});