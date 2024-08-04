import Result from "./result";

export default async (args: any): Promise<Result> => {
  let result = new Result();
  if (args.first_name.trim().length <= 0) {
    result.code = 1234;
    result.success = false;
    result.message = "firstname should not be empty";
    return result;
  }

  if (args.last_name.trim().length <= 0) {
    result.code = 1234;
    result.success = false;
    result.message = "lastname should not be empty";
  }

  if (args.email.trim().length <= 0) {
    result.code = 1234;
    result.success = false;
    result.message = "email should not be empty";
  }

  if (args.calling_code.trim().length <= 0) {
    result.code = 1234;
    result.success = false;
    result.message = "callingcode should not be empty";
  }

  if (args.mobile.trim().length <= 0) {
    result.code = 1234;
    result.success = false;
    result.message = "mobile number should not be empty";
  }

  if (args.password !== undefined && args.password.trim().length <= 0) {
    result.code = 1234;
    result.success = false;
    result.message = "password should not be empty";
  }

  return result;

};
