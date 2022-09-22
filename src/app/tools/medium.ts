import { MediumUrl } from '../network/url/medium/medium.url';

export class Medium {
  constructor() {}

  static default = '/assets/img/timg-pic.jpg';

  static binary() {
    return MediumUrl.picture().binary();
  }

  static jpg(id?: string) {
    if (!id) return this.default;
    return MediumUrl.picture().jpg(id);
  }
  static data(id?: string) {
    if (!id) return this.default;
    return MediumUrl.picture().data(id);
  }

  static img(url?: string): Promise<string> {
    return new Promise((resolve) => {
      let img = url ? Medium.jpg(url) : '';
      var image = new Image();
      image.src = img;
      image.onerror = () => {
        resolve('/assets/img/timg-pic.jpg');
      };
      image.onload = () => {
        resolve(img);
      };
    });
  }
}
