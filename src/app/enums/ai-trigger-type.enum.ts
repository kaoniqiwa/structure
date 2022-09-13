/** AITriggerType	(AI触发条件类型) */
export enum AITriggerType {
  /**	区域目标异常状态检测	1 */
  region_target_error_checked = 1,
  /**	区域异常状态检测	2 */
  region_error_checked = 2,
  /**	跨线目标检测	3 */
  crossover_target_checked = 3,
  /**	跨线目标统计	4 */
  crossover_target_count = 4,
  /**	区域目标数统计	5 */
  region_target_count = 5,
}
