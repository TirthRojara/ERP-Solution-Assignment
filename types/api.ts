export type ApiResponse<T> = {
    message: T;
}

export type ApiError = {
    message?: string;
    exception?: string;
    exc_type?: string;
    exc?: string;
    _server_messages?: string;
    // session_expired?: number;
}