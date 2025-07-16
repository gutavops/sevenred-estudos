export class ValidationError extends Error {
    status: number;

    constructor(message: string, status = 400) {
      super(message);
      this.status = status;
      this.name = 'ValidationError';
    }
}
    