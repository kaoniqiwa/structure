import { SmsProtocolType } from 'src/app/enums/sms-protocol-type.enum';
import { basic_sms_url } from '../basic.url';

export class SmsUrl {
  static authcodes(phoneNo: string, protocolType?: SmsProtocolType) {
    let type = '';
    if (protocolType) {
      type = `&ProtocolType=${protocolType}`;
    }
    return `${basic_sms_url}/AuthCodes?PhoneNo=${phoneNo}${type}`;
  }
}
