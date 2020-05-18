import {
  expect
} from "chai";
import testUtils from "./utils";

describe("application launch", function () {
  beforeEach(testUtils.beforeEach);
  afterEach(testUtils.afterEach);

  it("shows title text on screen after launch", function () {
    return this.app.client.getText("#title").then(text => {
      expect(text).to.equal("TYREMARKS");
    });
  });
});
