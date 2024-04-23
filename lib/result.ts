class Result {
  status: number;
  success: boolean;
  error: any | null;
  message: string;
  data: any | null;

  constructor({
    status,
    success = false,
    error = null,
    message,
    data = null,
  }: {
    status: number;
    success?: boolean;
    error?: any | null;
    message: string;
    data?: any | null;
  }) {
    this.status = status;
    this.success = success;
    this.error = error;
    this.message = message;
    this.data = data;
  }
}

export { Result };
