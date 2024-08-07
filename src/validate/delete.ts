import Result from "./result";

export default async (id: number): Promise<Result> => {
  let result = new Result();

  if (id <= 0) {
    result.code = 1234;
    result.success = false;
    result.success = false;
    result.message = "id should not be greater than zero";
  }
  return result;
};
