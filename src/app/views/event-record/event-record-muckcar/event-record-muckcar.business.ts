import { Injectable } from '@angular/core';
import { DictionaryRequestSerivce } from 'src/app/network/request/dictionaries/dictionaries.service';

@Injectable()
export class EventRecordMuckcarBusiness {
  constructor(public dictionary: DictionaryRequestSerivce) {}
}
