import { Injectable } from '@angular/core';
import { SmsProtocolType } from 'src/app/enums/sms-protocol-type.enum';
import { AuthCode } from 'src/app/models/auth-code.model';
import { HowellResponse } from 'src/app/models/response/howell-response.model';
import { HowellAuthHttpService } from '../../howell-auth-http.service';
import { ServiceHelper } from '../../service-helper';
import { SmsUrl } from '../../url/sms/sms.url';

@Injectable({
  providedIn: 'root',
})
export class SmsRequestService {
  constructor(private requestService: HowellAuthHttpService) {}

  async getAuthCodes(PhoneNo: string) {
    let response = await this.requestService
      .get<AuthCode>(SmsUrl.authcodes(PhoneNo))
      .toPromise();
    return ServiceHelper.ResponseProcess(response, AuthCode);
  }
  async postAuthCodes(
    phoneNo: string,
    protocolType: SmsProtocolType = SmsProtocolType.aliyun
  ) {
    let response = await this.requestService
      .post<any, HowellResponse<AuthCode>>(
        SmsUrl.authcodes(phoneNo, protocolType)
      )
      .toPromise();
    return ServiceHelper.ResponseProcess(response, AuthCode);
  }
}
