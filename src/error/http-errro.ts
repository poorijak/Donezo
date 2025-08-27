export class HttpError<T = unknown> extends Error {
  status: number;
  data?: T;
  constructor(message: string, opts: { status: number; data?: T }) {
    super(message);
    this.name = "HttpError";
    this.status = opts.status;
    this.data = opts.data;
  }
}