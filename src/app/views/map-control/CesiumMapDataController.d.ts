declare namespace CesiumDataController {
  class Controller {
    constructor(host: string, port: number, onloaded: () => void);

    Village: VillageController;
    Building: any;
    Floor: any;
    Point: PointController;
    Polyline: any;
    Ellipsoid: any;
  }

  export type Dictionary<T> = { [key: string]: T };

  class VillageController {
    GetIds: () => void;
    List: () => Dictionary<Village>;
    Get: (villageId: string) => Village;
    Create: (villageId: string, village: Village) => boolean;
    Update: (villageId: string, village: Village) => boolean;
    Remove: (villageId: string) => boolean;
    GetByBuildingId: (buildingId: string) => Building;
    Asyn: AsynVillageController;
    Point: PointController;
    Polyline: any;
    Ellipsoid: any;
  }
  class PointController {
    GetIds: (villageId?: string) => {
      current: string[];
    };
    List: (villageId?: string) => Dictionary<Point>;
    Get: (villageId: string, pointId: string) => Point;
    Create: (villageId: string, pointId: string, point: Point) => boolean;
    Update: (villageId: string, pointId: string, point: Point) => boolean;
    Remove: (villageId: string, pointId: string) => boolean;

    Asyn: AsynPointController;
  }
  class AsynPointController {
    GetIds: (villageId: string, callback: (current: string[]) => void) => void;
    List: (
      villageId: string,
      callback: (points: Dictionary<Point>) => void
    ) => void;
    Get: (
      villageId: string,
      pointId: string,
      callback: (point: Point) => void
    ) => void;
    Create: (villageId: string, pointId: string, point: Point) => boolean;
    Update: (villageId: string, pointId: string, point: Point) => boolean;
    Remove: (villageId: string, pointId: string) => boolean;
  }

  namespace CallbackType {
    type Array<T> = (values: Array<T>) => void;
    type Dictionary<T> = (values: Dictionary<T>) => void;
    type Item<T> = (value: T) => void;
  }

  class AsynVillageController {
    GetIds: (callback: CallbackType.Array<string>) => void;
    List: (callback: CallbackType.Dictionary<Village>) => void;
    Get: (callback: CallbackType.Item<Village>) => void;
    GetByBuildingId: (
      buildingId: string,
      callback: CallbackType.Item<Village>
    ) => void;
  }

  enum ElementType {
    Village = 'village', //??????
    Building = 'building', //?????????
    Floor = 'floor', //??????
    Entrance = 'entrance', //?????????
    Camera = 'camera', //?????????
    Annunciator = 'annunciator', //?????????
    Sensor = 'sensor', //?????????
    ElevatorShaft = 'elevatorShaft', //?????????
    Elevator = 'elevator', //??????
    ParkingLot = 'parkingLot', //?????????
    MissionPoint = 'missionPoint', //?????????
    Person = 'person', //???
    Vehicle = 'vehicle', //???
    Shape = 'shape', //?????????,
    Polyline = 'polyline', //?????????
    Ellipse = 'ellipse', //??????
    WaterQuality = 'waterQuality', //??????
    DumpingCamera = 'dumpingCamera', //??????????????????
    GarbageClassificationCamera = 'garbageClassificationCamera', //????????????
    NucleicAcid = 'acid', //??????
    LargeWaste = 'largewaste', //????????????
    Face = 'face',
  }

  enum ShapeType {
    Building = 'building', //?????????
    Entrance = 'entrance', //?????????
    Stairway = 'stairway', //??????
    Elevator = 'elevator', //??????
    Escalator = 'escalator', //????????????
    ParkingLot = 'parkingLot', //?????????
    ParkingSpace = 'parkingSpace', //?????????
    Shop = 'shop', //??????
    Restaurant = 'restaurant', //???????????????
    Recreation = 'recreation', //??????
    Room = 'room', //????????????
    SpecialRoom = 'specialRoom', //?????????????????????????????????????????????
    Toilet = 'toilet', //??????
    ServiceCenter = 'serviceCenter', //????????????
    Office = 'office', //?????????
    Wall = 'wall', //???
    Road = 'road', //??????
    Water = 'water', //?????????
    Grass = 'grass', //??????
    Floor = 'floor',
    Other = 'other', //??????
  }

  //????????????
  enum ModelType {
    Json = 'json',
    Glb = 'glb',
    Image = 'img',
  }
  //????????????
  enum AlarmColor {
    red = 'red',
    orange = 'orange',
  }

  enum ViewMode {
    auto = 0,
    three = 1,
    birld = 2,
  }
  enum InnerElementType {
    Point = 'Point',
    Polyline = 'Polyline',
    Ellipsoid = 'Ellipsoid',
  }

  /**
   *  ??????
   **/
  class Range {
    min: number;
    max: number;

    constructor(min?: number, max?: number);
  }

  class HeadingPitch {
    heading: number;
    pitch: number;

    /**
     *  ????????????/????????????
     */
    constructor(heading?: number, pitch?: number);
  }

  class HeadingPitchRange extends HeadingPitch {
    range: number;

    /**
     *  ????????????/????????????/??????
     */
    constructor(heading?: number, pitch?: number, range?: number);
  }

  class HeadingPitchRoll extends HeadingPitch {
    roll: number;
    /**
     *  ????????????/????????????/??????????????????
     */
    constructor(heading?: number, pitch?: number, roll?: number);
  }

  /**
   *  ????????????
   **/
  class DrawOptions {
    id: string;
    name: string;
    color: string;
    alpha: number;
  }
  /**
   *  ??????????????????
   **/
  class DrawLineOptions extends DrawOptions {
    extrudedHeight: number;
    width: number;
    img: string;
  }

  /**
   *  ??????????????????
   **/
  class DrawPlaneOptions extends DrawOptions {
    extrudedHeight: number;
    img: string;
  }

  //?????????????????????
  class Outline {
    //??????
    width: number;
    color: string;
    alpha: number;
    enabled: boolean;
  }

  /**
   *  ??????????????????
   **/
  class DrawEllipsoidOptions extends DrawOptions {
    hpr: HeadingPitchRoll;
    clock: Range;
    cone: Range;
    outline: Outline;
  }

  class XY {
    x: number;
    y: number;
    /**
     *  ????????????
     */
    constructor(x?: number, y?: number);
  }
  class XYZ extends XY {
    z: number;

    /**
     *  ????????????
     */
    constructor(x?: number, y?: number, z?: number);
  }

  class CesiumObject {
    public clone(): any;
  }

  enum LightColor {
    white,
    yellow,
    gold,
  }

  class GuideboardStyleItem {
    border: string;
    background: string;
    innerShadow: string;
    line: string;
  }

  export class GuideboardStyle {
    static Blue: GuideboardStyleItem;
    static Green: GuideboardStyleItem;
    static Red: GuideboardStyleItem;
    static Orange: GuideboardStyleItem;
  }

  //?????????????????????
  enum CameraLens {
    //????????????
    wideAngle,
    //????????????
    normel,
    //????????????
    telephoto,
  }

  interface Instantiate<T> {
    Instantiate(t: T): T;
  }

  class Light {
    Get(color: LightColor, level: number): number[];
    static Get(color: LightColor, level: number): number[];
  }

  /**
   *  ??????
   **/
  class Position extends CesiumObject {
    lon: number;
    lat: number;
    height: number;

    constructor(lon?: number, lat?: number, height?: number);
  }
  /**
   *  ???????????????
   **/
  class BuildingInformation {
    height: number;
    maxFloorNumber: number;
    constructor(height?: number, maxFloorNumber?: number);
  }
  /**
   *  ????????????
   **/
  class ModelStyle {
    alpha: number;
    fill: string;
    silhouetteColor: string;
    silhouetteSize: number;

    constructor(
      alpha?: number,
      fill?: string,
      silhouetteColor?: string,
      silhouetteSize?: number
    );
  }

  class BaseElement {
    id: string;
    parentId: string;
    name: string;
    position: CesiumDataController.Position;
    Instantiate<T extends BaseElement>(obj: T): T;
    constructor(id?: string);
  }

  class Element extends BaseElement {
    modelStyle: ModelStyle;
    model: ModelType;
    url: string;
    type: ElementType;
    radian: number;
    scale: number;
    light: Array<number>;
    defaultView: string;

    constructor(id?: string, type?: ElementType);
  }

  class Point extends Element {
    villageId: string;

    buildingId: string;

    floorId: string;
    /**
     *  ????????????
     */
    constructor(id?: string, type?: ElementType);
  }

  class Polyline extends Element {
    villageId: string;
    buildingId: string;
    floorId: string;
    positions: Position[];
    color: string;
    alpha: number;
    extrudedHeight: number;
    width: number;
    outline: Outline;
    img: string;
    /**
     *
     */
    constructor(id?: string);

    static FromOptions(opts: DrawLineOptions): Polyline;
  }

  class Polygon extends Element {
    villageId: string;
    buildingId: string;
    floorId: string;
    positions: Position[];
    color: string;
    alpha: number;
    extrudedHeight: number;
    img: string;
    outline: Outline;
    /**
     *
     */
    constructor(id?: string);

    static FromOptions(opts: DrawPlaneOptions): Polygon;
  }

  class Floor extends Element {
    villageId: string;
    number: number;
    buildingId: string;
    showBackground: boolean;
    parent: Building;
    points: Dictionary<Point>;
    polylines: Dictionary<Polyline>;
    ellipsoids: Dictionary<Ellipsoid>;
    /**
     *  ??????
     */
    constructor(id: string);
  }

  class Building extends Element {
    villageId: string;
    information: BuildingInformation;
    showBackground: boolean;
    children: Array<Element>;
    floors: Dictionary<Floor>;
    /**
     *  ?????????
     */
    constructor(id?: string);
  }

  class Village extends Element {
    showBackground: boolean;
    areas: Array<number>[];
    center: Position;
    level: number;
    buildings: Global.Dictionary<Building>;
    points: Global.Dictionary<Point>;
    polylines: Global.Dictionary<Polyline>;
    ellipsoids: Global.Dictionary<Ellipsoid>;
    /**
     *
     */
    constructor(id?: string);
  }

  class Shape extends Element {
    center?: Position;
    areas?: Array<number>;
    shapeType: ShapeType;
    passable?: boolean;
    floorHeight?: number;
    parentType: CesiumDataController.ElementType;
    villageId: string;
    /**
     *
     */
    constructor(id?: string);
  }

  class Size {
    width: number;
    height: number;
  }

  //????????????
  class Ellipsoid extends BaseElement {
    villageId: string;
    buildingId: string;
    floorId: string;
    //??????
    radii: XYZ;
    //????????????
    inner_radii: XYZ;
    //????????????
    hpr: HeadingPitchRoll;
    //?????????????????? min:-360~360 max:-360~360
    clock: Range;
    //????????????????????????, ??????????????????????????? min:0-180 max:0-180
    cone: Range;
    //??????
    color: string;
    //?????????
    alpha: number;
    //????????????
    outline: Outline;

    /**
     *
     */
    constructor(id: string);

    static FromOptions(opts: DrawEllipsoidOptions): Ellipsoid;
  }

  class HeatmapData {
    //??????
    id: string;
    //??????
    position: Position;
    //???
    value: number;
  }

  class Area extends Element {
    showBackground: boolean;
    areas: Array<number>[];
    center: Position;
    points: Global.Dictionary<Point>;
    /**
     *
     */
    constructor(id?: string);
  }

  class RGB {
    r?: number;
    g?: number;
    b?: number;
  }
  class HSL {
    h?: number;
    s?: number;
    l?: number;
  }

  class Color {
    rgb?: RGB | string;
    hsl?: HSL;
  }

  class PointOptions {
    id: string;
    color?: Color;
  }

  class LabelOptions {
    id: string;
    position: Position;
    text?: string;
    color?: Color | string;
    backgroundColor?: Color | string;
    value: number;
    image?: ImageOptions;
  }
  class ImageOptions {
    color?: Color | string;
    value?: number;
    resource: ImageResource;
  }

  enum ImageResource {
    arcProgress = 'arc-progress',
  }

  // ??????????????????
  enum RoutingType {
    // ??????
    Driving = 'driving',
    // ??????
    Walking = 'walking',
    // ??????
    Riding = 'riding',
  }
}
