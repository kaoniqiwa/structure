import { Injectable } from '@angular/core';
import { DictionaryRequestSerivce } from 'src/app/network/request/dictionaries/dictionaries.service';

@Injectable()
export class StructuredDataFaceQueryBusiness {
  constructor(private service: DictionaryRequestSerivce) {}

  gender() {
    return this.service.people.Gender();
  }

  ageGroup() {
    return this.service.people.AgeGroup();
  }
  glass() {
    return this.service.people.Glass();
  }
}
