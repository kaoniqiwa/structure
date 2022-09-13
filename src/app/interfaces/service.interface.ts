import { PagedList } from '../models/page-list.model';
import { IParams } from '../network/IParams.interface';
import { ServiceCache } from '../network/request/cache/service.cache';
import { IData } from './data.interface';

export interface IService<T extends IData> {
  cache: ServiceCache<T>;
  get: (id: string) => Promise<T>;
  update?: (data: T) => Promise<T>;
  create?: (data: T) => Promise<T>;
  delete?: (id: string) => Promise<T>;
  list: (args?: IParams) => Promise<PagedList<T>>;
}
