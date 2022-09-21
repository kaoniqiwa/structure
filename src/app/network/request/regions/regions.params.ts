import { RegionNodeType } from 'src/app/enums/region-node-type.enum';
import { RegionType } from 'src/app/enums/region-type.enum';
import { ResourceType } from 'src/app/enums/resource-type.enum';
import { PagedParams } from '../../IParams.interface';

export class GetRegionsParams extends PagedParams {
  /**	String[]	区域ID	O */
  Ids?: string[];
  /**	String	区域名称，支持LIKE	O */
  Name?: string;
  /**	Int32	区域类型	O */
  RegionType?: RegionType;
  /**	String	父ID	O */
  ParentId?: string;
  /**	String	完整路径，含本节点，@进行分割，上级节点在前，支持LIKE	O */
  Path?: string;
  /**	String	祖辈ID，返回该ID下的所有子孙区域信息	O */
  AncestorId?: string;
}

export class GetRegionNodesParams extends PagedParams {
  /**	String[]	节点ID	O */
  Ids?: string[];
  /**	String	节点名称，支持LIKE	O */
  Name?: string;
  /**	Int32	节点类型	O */
  NodeType?: RegionNodeType;
  /**	String[]	所属区域ID	O */
  RegionIds?: string[];
  /**	String	完整路径，含本节点，@进行分割，上级节点在前，支持LIKE	O */
  Path?: string;
  /**	String[]	资源ID	O */
  ResourceIds?: string[];
  /**	String	资源类型：Camera，ResourceCollection	O */
  ResourceType?: ResourceType;
}
