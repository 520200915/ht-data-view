import { request } from './request.js'
const checkObject = data => {
  return Object.keys(data).length > 0 ? data : {}
}
const api = {
  /**监控车辆统计数据接口*/
  getVehicleInfo(data, success) {
    return request.get(`/monitor/vehicle`, checkObject(data), success)
  },
  /**监控设备统计数据接口*/
  getDeviceInfo(data, success) {
    return request.get(`/monitor/device`, checkObject(data), success)
  },
  /**日均行驶统计数据接口*/
  getDriveInfo(data, success) {
    return request.get(`/daily/drive`, checkObject(data), success)
  },
  /**设备组合统计数据接口*/
  getDeviceGroup(data, success) {
    return request.get(`/device/group`, checkObject(data), success)
  },
  /**警情分布月度统计数据接口*/
  getDistribution(data, success) {
    return request.get(`/alarm/distribution`, checkObject(data), success)
  },
  /**车辆监控省份排名表数据接口 */
  getVehiclerank(success) {
    return request.get(`/monitor/vehiclerank`, success)
  },
  /**车辆在线率、警情总数月度趋势图数据接口 */
  getTrend(data, success) {
    return request.get(`/alarm/trend`, checkObject(data), success)
  },
  /**车辆高危警情数据接口*/
  getHighrisk(data, success) {
    return request.get(`/alarm/highrisk`, checkObject(data), success)
  },
}
export default api