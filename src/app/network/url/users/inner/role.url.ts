import { PagedParams } from 'src/app/network/IParams.interface';
import { AbstractUrl } from '../../abstract.url';
import { UrlHelper } from '../../url-helper';

export class RoleInnerUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Passwords`);
  }
  override basic(params?: PagedParams) {
    let query = UrlHelper.toQueryString(params);
    return `${this.base}/Roles${query}`;
  }
}
