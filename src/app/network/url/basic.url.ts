// export const basic_api_url = '/api/howell/ver10';
// export const api_aiop_service_url = basic_api_url + '/aiop_service';
// export const basic_url = '/howell/ver10';
// export const basic_data_service_url = basic_url + '/data_service';
// export const basic_user_url = basic_data_service_url + '/user_system';
// export const basic_sms_url = basic_data_service_url + '/short_message/sms';
// export const basic_struct_url = api_aiop_service_url + '';

export class BasicUrl {
  static get api() {
    return `/api/${this.basic}`;
  }
  static get aiop() {
    return `${this.api}/aiop_service`;
  }
  static get basic() {
    return '/howell/ver10';
  }
  static get data() {
    return `${this.basic}/data_service`;
  }
  static get user() {
    return `${this.data}/user_system`;
  }
  static get sms() {
    return `${this.data}/short_message/sms`;
  }
  static get struct() {
    return `${this.aiop}/struct_service`;
  }
}
