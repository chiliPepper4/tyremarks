import {
  calculateCenter
} from "./calculator";



describe("calculator", () => {
  it("should return the geographical center-point between Munich and Hong Kong", () => {
    const history = [
      [48.1351, 11.5820],
      [22.3193, 114.1694]
    ];
    expect(calculateCenter(history)).to.equal([47.903933, 74.293004]);
  });
});
