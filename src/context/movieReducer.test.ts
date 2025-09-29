import { reducer } from "./MovieContext";

describe("movie reducer", () => {
  it("toggles favorite on and off", () => {
    const initial = { favorites: [] } as any;
    const a = reducer(initial, { type: "TOGGLE_FAVORITE", payload: 1 });
    expect(a.favorites).toContain(1);
    const b = reducer(a, { type: "TOGGLE_FAVORITE", payload: 1 });
    expect(b.favorites).not.toContain(1);
  });
});
