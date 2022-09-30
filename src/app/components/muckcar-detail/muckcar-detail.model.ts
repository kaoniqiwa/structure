import { Transform } from 'class-transformer';
import { transformParams } from 'src/app/models/transform.model';

export class MuckcarDetailModel {
  @Transform(transformParams)
  plateNo?: string;

  @Transform(transformParams)
  vehicleColor?: string;

  @Transform(transformParams)
  plateColor?: string;

  imageUrl!: string;
  backgroundImageUrl!: string;
}
