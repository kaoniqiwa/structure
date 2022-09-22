import { SmsProtocolType } from 'src/app/enums/sms-protocol-type.enum';
import { BasicUrl } from '../basic.url';

export class SmsUrl {
  static authcodes(phoneNo: string, protocolType?: SmsProtocolType) {
    let type = '';
    if (protocolType) {
      type = `&ProtocolType=${protocolType}`;
    }
    return `${BasicUrl.sms}/AuthCodes?PhoneNo=${phoneNo}${type}`;
  }
}
