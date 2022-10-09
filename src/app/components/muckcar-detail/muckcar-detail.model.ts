import { Transform } from 'class-transformer';
import { transformParams } from 'src/app/models/transform.model';

export class MuckCarDetailModel {
  plateNo!: string;
  vehicleColor!: string;
  plateColor!: string;
  imageUrl!: string;
  backgroundImageUrl!: string;
}
