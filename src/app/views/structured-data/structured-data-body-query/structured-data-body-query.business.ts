import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/interfaces/converter.interface';
import { BodyModelingResult } from 'src/app/models/body-modeling-result.model';
import { BodyImageModelingParams } from 'src/app/network/request/commands/commands.params';
import { CommandRequestSerivce } from 'src/app/network/request/commands/commands.service';
import { DictionaryRequestSerivce } from 'src/app/network/request/dictionaries/dictionaries.service';
import { StructuredDataBodyQueryConverter } from './structured-data-body-query.converter';
import { StructuredDataBodyQueryModel } from './structured-data-body-query.model';

@Injectable()
export class StructuredDataBodyQueryBusiness
  implements IBusiness<BodyModelingResult[], StructuredDataBodyQueryModel[]>
{
  constructor(
    private command: CommandRequestSerivce,
    private dictionary: DictionaryRequestSerivce
  ) {}
  Converter: IConverter<BodyModelingResult[], StructuredDataBodyQueryModel[]> =
    new StructuredDataBodyQueryConverter();
  async load(img: string): Promise<StructuredDataBodyQueryModel[]> {
    let data = await this.getData(img);
    let model = this.Converter.Convert(data);
    return model;
  }
  getData(img: string): Promise<BodyModelingResult[]> {
    let params = new BodyImageModelingParams();
    params.ImageData = img;
    return this.command.ai.body.modeling(params);
  }

  gender() {
    return this.dictionary.people.Gender();
  }
  ageGroup() {
    return this.dictionary.people.AgeGroup();
  }
  glass() {
    return this.dictionary.people.Glass();
  }
  bag() {
    return this.dictionary.people.Bag();
  }
  hat() {
    return this.dictionary.people.Hat();
  }
  mask() {
    return this.dictionary.people.Mask();
  }
  things() {
    return this.dictionary.people.Things();
  }
  hairStyle() {
    return this.dictionary.people.HairStyle();
  }
  trousersType() {
    return this.dictionary.people.TrousersType();
  }
  trousersColor() {
    return this.dictionary.people.TrousersColor();
  }
  ride() {
    return this.dictionary.people.Ride();
  }
  jacketType() {
    return this.dictionary.people.JacketType();
  }
  jacketColor() {
    return this.dictionary.people.JacketColor();
  }
  cyclingType() {
    return this.dictionary.people.CyclingType();
  }
}
