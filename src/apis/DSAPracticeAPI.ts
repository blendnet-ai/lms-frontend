export enum RUNNING_STATE {
  PENDING = "pending",
  COMPLETED = "completed",
}

export type GetStatusResponse = {
  result: {
    testCase: string;
    output: string;
    expectedOutput: string;
  }[];
  state: RUNNING_STATE;
};

let count = 0;
const DSAPracticeAPI = {
  submitSolution: async function (solution: string) {
    console.log("Calling DSAPracticeAPI.submitSolution");
  },

  getStatus: async function (): Promise<GetStatusResponse> {
    console.log("Calling DSAPracticeAPI.getStatus");

    if (count >= 3) {
      const status: GetStatusResponse = {
        result: [
          {
            testCase: "nums = [2,7,11,15], target = 9",
            expectedOutput: "[0,1]",
            output: "[0,1]",
          },
          {
            testCase: "nums = [2,7,11,15], target = 9",
            expectedOutput: "[0,1]",
            output: "[1,0]",
          },
        ],
        state: RUNNING_STATE.COMPLETED,
      };
      count = 0;

      return status;
    } else {
      const status: GetStatusResponse = {
        result: [],
        state: RUNNING_STATE.PENDING,
      };
      count++;
      return status;
    }
  },
};

export default DSAPracticeAPI;
