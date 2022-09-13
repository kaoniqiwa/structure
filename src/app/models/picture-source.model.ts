import { PictureSourceAuthMethod } from '../enums/picture-source-auth-method.enum';
import { IModel } from './model.interface';

/** PictureSource (图片来源信息)	*/
export class PictureSource implements IModel {
  /**	String	URL地址	M	*/
  Url!: string;
  /**	String	用户名	O	*/
  Username?: string;
  /**	String	密码	O	*/
  Password?: string;
  /**	String	认证方式， None、Digest	M	*/
  AuthMethod!: PictureSourceAuthMethod;
}
