import {
  getGPSdata,
  getAllhistory
} from "./datahandler";

describe("datahandler", () => {
  it("shold return a nested float array", () => {
    const record = "";
    const array = [];
    expect(getGPSdata(record)).to.equal(array);
  });

  it("should return a nested float array", () => {
    const activities = [[[0,0.1],[1,1.1]],[[2.1,2],[3,3],[4.1,4.1]]];
    const array = [{lat:0,lng:0.1},{lat:1,lng:1.1},{lat:2.1,lng:2},{lat:3,lng:3},{lat:4.1,lng:4.1}];
    expect(getAllhistory(activities)).to.equal(array);
  });
});
