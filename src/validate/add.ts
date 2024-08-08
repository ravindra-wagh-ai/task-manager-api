import Result from "./result";

export default async (args: any): Promise<Result> => {
  let result = new Result();
  
  if (args.title.trim().length <= 0) {
    result.code = 1234;
    result.success = false;
    result.message = "title should not be empty";
  }

  return result;
};
