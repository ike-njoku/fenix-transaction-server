type ResponseType = 'success' | 'fail'
export interface ResponseDto {
  status: ResponseType;
  message: string;
  data: any;
}
