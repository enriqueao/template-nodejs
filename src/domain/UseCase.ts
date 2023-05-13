type CustomRequestId = { requestId: string };
export interface UseCase<RequestType extends CustomRequestId, ResponseType> {
  execute(request: RequestType): Promise<ResponseType> | ResponseType;
}
