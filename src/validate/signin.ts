import Result from "./result";

export default async (args: any): Promise<Result> => {
  let result = new Result();
  
  if (args.email.trim().length <= 0) {
    result.code = 1234;
    result.success = false;
    result.message = "email should not be empty";
  }

  if (args.password.trim().length <= 0) {
    result.code = 1234;
    result.success = false;
    result.message = "password should not be empty";
  }

  return result;
};
