import * as express from "express";

//error from ts/js or ours
export class ValidationError extends Error {}

export const handleError = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  console.error(err);
  res.status(err instanceof ValidationError ? 400 : 500).json({
    message:
      err instanceof ValidationError
        ? err.message
        : "Sorry, something went wrong, please try again later",
  });
};
