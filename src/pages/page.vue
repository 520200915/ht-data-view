<template>
  <div class='view-box'>
    <div class='header'>
      <div class='logo'>
        <img src="~@a/ht-logo.png">
        <h1>贷后资产风险看板</h1>
      </div>
      <div class='time'>{{timeNow}}</div>
    </div>
    <div class='main'>
      <div class="left">
        <div class="data">
          <div class='box'>
            <div class="top">
              <Box
                title='监控车辆数'
                :val='Number(vehicleInfo.currTotal)'
                separator=','
                unit='台'
              ></Box>
            </div>
            <div class="bottom">
              <Box
                title='本年度新增'
                :val='Number(vehicleInfo.yearInc)'
                separator=','
                unit='台'
                :class='"small"'
              ></Box>
              <Box
                title='本月度新增'
                :val='Number(vehicleInfo.monthInc)'
                separator=','
                unit='台'
                :class='"small"'
              ></Box>
            </div>
          </div>
          <div class='box'>
            <div class="top">
              <Box
                title='监控设备数'
                :val='Number(deviceInfo.deviceCnt)'
                separator=','
                unit='台'
              ></Box>
            </div>
            <div class="bottom">
              <Box
                title='有线终端'
                :val='Number(deviceInfo.wiredCnt)'
                separator=','
                unit='台'
                :class='"small"'
              ></Box>
              <Box
                title='无线终端'
                :val='Number(deviceInfo.wirelessCnt)'
                separator=','
                unit='台'
                :class='"small"'
              ></Box>
            </div>
          </div>
        </div>
        <div class="map">
          <ht-map @click='mapclick'></ht-map>
        </div>
      </div>
      <div class="right">
        <div class="top">
          <div class="left box">
            <div class="top">
              <Box
                title='车辆在线数'
                :val='Number(vehicleInfo.currOnline)'
                separator=','
                unit='台'
              ></Box>
            </div>
            <div class="bottom">
              <Box
                title='在线率'
                :val='vehicleInfo.onlineRatio'
                separator=','
                decimals='2'
                unit='%'
                :class='"small"'
              ></Box>
            </div>
          </div>
          <div class="right box">
            <div class="top">
              <div>
                <Box
                  title='日均活跃车辆'
                  :val='driveInfo.activeCnt'
                  separator=','
                  unit='台'
                ></Box>
              </div>
              <div>
                <Box
                  title='日均行驶里程'
                  :val='driveInfo.mileage'
                  separator=','
                  decimals='2'
                  unit='公里'
                ></Box>
              </div>
              <div>
                <Box
                  title='日均行驶时长'
                  :val='driveInfo.duration'
                  decimals='1'
                  separator=','
                  unit='小时'
                ></Box>
              </div>
            </div>
            <div class="bottom">
              <div>
                <Box
                  title='单有线组合'
                  :val='Number(deviceGroup.wiredCnt)'
                  separator=','
                  unit='套'
                ></Box>
              </div>
              <div>
                <Box
                  title='单无线组合'
                  :val='Number(deviceGroup.wirelessCnt)'
                  separator=','
                  unit='套'
                ></Box>
              </div>
              <div>
                <Box
                  title='多设备组合'
                  :val='Number(deviceGroup.multiCnt)'
                  separator=','
                  unit='套'
                ></Box>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="canvas box">
            <div class="radar">
              <Radar :listData='distributionInfo'></Radar>
            </div>
            <div class="line">
              <ht-line
                :list='lineData'
                :days='days'
                :lineColor='["#008cf8", "#00e9c0"]'
                title='车辆在线率/警情总数'
              ></ht-line>
            </div>
          </div>
          <div class="table">
            <div>
              <scroll-view
                :list='vehiclerankList'
                title='近一年区域资产表现'
                speed='5'
              ></scroll-view>
            </div>
            <div>
              <scroll-view
                :list='highriskList'
                title='警情轮播'
              ></scroll-view>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import { setInterval } from 'timers'
import api from '@u/api.js'
export default {
  name: 'page',
  data () {
    return {
      vehicleInfo: {
        currTotal: 0,
        yearInc: 0,
        monthInc: 0,
        currOnline: 0,
        onlineRatio: 0
      },
      deviceInfo: {
        deviceCnt: 0,
        wiredCnt: 0,
        wirelessCnt: 0
      },
      driveInfo: {
        activeCnt: 0,
        mileage: 0,
        duration: 0
      },
      deviceGroup: {
        wiredCnt: 0,
        wirelessCnt: 0,
        multiCnt: 0
      },
      days: ['01', '02', '03', '04', '05', '06'],
      lineData: [],
      timeNow: null,
      distributionInfo: null,
      vehiclerankList: null,
      highriskList: null
    }
  },
  mounted () {
    this.setTimeFunction()
    this.mapclick()
    this.getVehiclerank()
  },
  methods: {
    getProvCode (obj) {
      return obj ? {
        provCode: obj
      } : {}
    },
    /**地图点击获取省份ID */
    mapclick (val) {
      this.getVehicleInfo(val)
      this.getDeviceInfo(val)
      this.getDriveInfo(val)
      this.getDeviceGroup(val)
      this.getDistribution(val)
      this.getTrend(val)
      this.getHighrisk(val)
    },
    setTimeFunction () {
      setInterval(() => {
        let timeNow = new Date().format('yyyy-MM-dd HH:mm:ss')
        this.timeNow = timeNow
      }, 1000)
    },
    /**监控车辆统计数据接口 */
    getVehicleInfo (provCode) {
      api.getVehicleInfo(this.getProvCode(provCode), res => {
        console.log('监控车辆统计数据接口', res)
        if (res.code == 200) {
          let { data } = res
          data.onlineRatio = data.onlineRatio * 100
          this.vehicleInfo = data
        }
      })
    },
    /**监控设备统计数据接口 */
    getDeviceInfo (provCode) {
      api.getDeviceInfo(this.getProvCode(provCode), res => {
        console.log('监控设备统计数据接口', res)
        if (res.code == 200) {
          this.deviceInfo = res.data
        }
      })
    },
    /**日均行驶统计数据接口 */
    getDriveInfo (provCode) {
      api.getDriveInfo(this.getProvCode(provCode), res => {
        console.log('日均行驶统计数据接口', res)
        if (res.code == 200) {
          this.driveInfo = res.data
        }
      })
    },
    /**设备组合统计数据接口 */
    getDeviceGroup (provCode) {
      api.getDeviceGroup(this.getProvCode(provCode), res => {
        console.log('设备组合统计数据接口', res)
        if (res.code == 200) {
          this.deviceGroup = res.data
        }
      })
    },
    /**警情分布月度统计数据接口 */
    getDistribution (provCode) {
      api.getDistribution(this.getProvCode(provCode), res => {
        console.log('警情分布月度统计数据接口', res)
        if (res.code == 200) {
          let value = res.data
          let names = ['断电报警', '双设备离线', '长期停驶', '围栏报警', '异常聚集', '光感报警']
          let indicator = []
          let valueArr = new Array(6).fill(0)
          value.map(e => {
            names.map((x, index) => {
              if (e.alarmName == x) valueArr[index] = e.alarmCnt || 0
            })
          })
          names.map(e => {
            indicator.push({
              name: e,
              max: valueArr.max() || 100
            })
          })
          let distributionInfo = {
            data: [
              {
                value: valueArr,
                name: '当月警情分布'
              }
            ],
            indicator: indicator
          }
          this.distributionInfo = distributionInfo
        }
      })
    },

    /**车辆在线率、警情总数月度趋势图数据接口 */
    getTrend (provCode) {
      api.getTrend(this.getProvCode(provCode), res => {
        console.log('车辆在线率、警情总数月度趋势图数据接口', res)
        if (res.code == 200) {
          let { series, xdata } = res.data
          let newSeries0 = []
          let newSeries1 = []
          series[0].data.map(e => {
            newSeries0.push(e || 0)
          })
          series[1].data.forEach(e => {
            newSeries1.push(e ? (Number(e) * 100).toFixed(2) : 0)
          })
          series[0].data = newSeries0
          series[1].data = newSeries1
          this.lineData = series
          this.days = xdata
        }
      })
    },
    /**车辆监控省份排名表数据接口 */
    getVehiclerank () {
      api.getVehiclerank(res => {
        console.log('车辆监控省份排名表数据接口', res)
        if (res.code == 200) {
          res.data.map((e, index) => {
            e.index = Number(index) + 1
            e.onlineRatio = e.onlineRatio ? `${(Number(e.onlineRatio) * 100).toFixed(2)}%` : '0%'
            e.vehicleRatio = e.vehicleRatio ? `${(Number(e.vehicleRatio) * 100).toFixed(2)}%` : '0%'
          })
          let vehiclerankList = {
            data: res.data,
            title: ['排名', '省份', '车辆数', '占比', '在线率'],
            keys: ['index', 'provName', 'currTotal', 'vehicleRatio', 'onlineRatio'],
            color: ['#999', '#ffb000', '#999', '#999', '#ffb000'],
            width: [1, 3, 2, 2, 2]
          }
          this.vehiclerankList = vehiclerankList
        }
      })
    },
    /**车辆高危警情数据接口*/
    getHighrisk (provCode) {
      api.getHighrisk(this.getProvCode(provCode), res => {
        console.log('车辆高危警情数据接口', res)
        if (res.code == 200) {
          let highriskList = {
            data: res.data.list,
            title: ['姓名', 'VIN码', '警情分级', '警情说明'],
            keys: ['name', 'vin', 'level', 'explains'],
            color: ['#999', '#ffb000', '#999', '#999'],
            width: [2, 3, 2, 3]
          }
          this.highriskList = highriskList
        }
      })
    },
  }
}
</script>

<style  lang='scss'>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 0.88rem;
  box-sizing: border-box;
  padding: 0 0.2rem;
  margin: 0 0.4rem;
  color: #fff;
  border-bottom: 0.01rem solid rgb(47, 52, 72);
  font-size: 0.18rem;
  .logo {
    display: flex;
    align-items: center;
    img {
      width: 1.67rem;
      height: 0.88rem;
      margin-right: 0.2rem;
    }
    h1 {
      font-size: 0.36rem;
    }
  }
}
.main {
  width: 100%;
  height: calc(100% - 0.88rem);
  box-sizing: border-box;
  padding: 0.2rem 0.4rem 0.2rem;
  display: flex;
  .box {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(0.05rem);
    border-radius: 0.1rem;
    .top,
    .bottom {
      width: 100%;
      height: 50% !important;
      padding: 0.15rem !important;
      box-sizing: border-box;
    }
    .bottom {
      justify-content: space-between;
      .small {
        flex: 1;
        .title {
          font-size: 0.14rem;
          color: rgba(255, 255, 255, 0.5);
        }
        .count {
          span {
            color: #fff;
            font-size: 0.2rem;
          }
          .unit {
            font-size: 0.14rem;
          }
        }
      }
    }
  }
  .left,
  .right {
    box-sizing: border-box;
  }
  .left {
    flex: 3.5;
    margin-right: 0.2rem;
    .data,
    .map {
      width: 100%;
    }
    .data {
      display: flex;
      height: 30%;
      .box {
        flex: 1;
        margin-right: 0.1rem;
        .top,
        .bottom {
          display: flex;
          align-items: center;
        }
      }
    }
    .map {
      height: 70%;
      margin-right: 0.1rem;
    }
  }
  .right {
    flex: 6.5;
    .top {
      height: 30%;
      display: flex;

      .left {
        flex: 3;
        .top,
        .bottom {
          display: flex;
          align-items: center;
        }
      }
      .right {
        flex: 7;
        display: flex;
        flex-direction: column;
        .top,
        .bottom {
          display: flex;
          flex: 1;
          flex-direction: row !important;
          > div {
            flex: 1;
            display: flex;
            align-items: center;
          }
        }
      }
    }
    > .bottom {
      height: 70%;
      display: flex;
      flex-direction: column;
      padding-top: 0.2rem;
      box-sizing: border-box;

      .canvas {
        display: flex;
        height: 40%;
        .radar {
          flex: 3;
        }
        .line {
          flex: 7;
        }
      }
      .table {
        display: flex;
        height: 60%;
        > div {
          height: 100%;
          flex: 1;
        }
        > div:first-of-type {
          margin-right: 0.1rem;
        }
        > div:last-of-type {
          margin-left: 0.1rem;
        }
      }
    }
  }
}
</style>