import { ClassConstructor, plainToClass } from 'class-transformer';
import { PagedList } from '../models/page-list.model';
import { HowellResponse } from '../models/response/howell-response.model';

export class ServiceHelper {
  static ResponseProcess<T>(
    response: HowellResponse<PagedList<T>>,
    t: ClassConstructor<T>
  ): Promise<PagedList<T>>;
  static ResponseProcess<T>(
    response: HowellResponse<T>,
    t: ClassConstructor<T>
  ): Promise<T>;
  static ResponseProcess<T>(
    response: HowellResponse<T[]>,
    t: ClassConstructor<T>
  ): Promise<T[]>;

  static async ResponseProcess<T>(
    response: HowellResponse<T | T[] | PagedList<T>>,
    t: ClassConstructor<T>
  ) {
    // 如果返回码不为0
    if (response.FaultCode != 0) {
      console.error(response.FaultReason, response.InnerException);
      throw new Error(response.FaultReason);
    }

    if ((response.Data as PagedList<T>).Page) {
      let result = response.Data as PagedList<T>;
      result.Data = plainToClass(
        t,
        (response.Data as PagedList<T>).Data
      ) as unknown as T[];
      return result;
    } else {
      return plainToClass(t, response.Data);
    }
  }
}
