<template>
  <div id="city-list-container" ref="cityListContainer">
    <div
      class="anchor-list"
      @click="handleClickAnchor"
      @touchmove="handleTouchMove"
      @touchend="isTouch = false"
      ref="anchorList"
    >
      <div class="anchor-item" name="定位城市">定位</div>
      <div class="anchor-item" name="最近访问城市" v-if="accessCityList.length">
        最近
      </div>
      <div class="anchor-item" name="热门城市">热门</div>
      <div
        class="anchor-item"
        v-for="item in AlphArray"
        :key="item"
        :name="item"
        v-text="item"
      ></div>
    </div>
    <div class="location-city">
      <div class="title">定位城市</div>
      <div class="city-list">
        <div
          class="city-item location"
          @click="handleLocation"
          v-text="tipsMessage"
        ></div>
      </div>
    </div>
    <div class="access-city-list" v-if="accessCityList.length">
      <div class="title">最近访问城市</div>
      <div class="city-list">
        <div
          class="city-item item-btn"
          v-for="item in accessCityList"
          :key="item.id"
          v-text="item.nm"
          @click="handleClickCity(item)"
        ></div>
      </div>
    </div>
    <div class="hot-city-list">
      <div class="title">热门城市</div>
      <div class="city-list">
        <div
          class="city-item item-btn"
          v-for="item in hotCityList"
          :key="item.id"
          @click="handleClickCity(item)"
          v-text="item.nm"
        ></div>
      </div>
    </div>
    <div
      class="city-list-v2"
      v-for="(cityList, key) in regulCityListObject"
      :key="key"
    >
      <div class="title title-letter" v-text="key"></div>
      <div class="city-list2">
        <div
          class="city-item2"
          v-for="item in cityList"
          :key="item.id"
          @click="handleClickCity(item)"
          v-text="item.nm"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCityList, getLocationCity } from "@/apis/api";
import { _queueSort } from "@/common/common";
import { mapState } from "vuex";
export default {
  name: "City",
  data() {
    return {
      cityList: [], // 城市列表
      hotCityList: [
        { id: 10, nm: "上海", py: "shanghai" },
        { id: 1, nm: "北京", py: "beijing" },
        { id: 20, nm: "广州", py: "guangzhou" },
        { id: 30, nm: "深圳", py: "shenzhen" },
        { id: 57, nm: "武汉", py: "wuhan" },
        { id: 40, nm: "天津", py: "tianjin" },
        { id: 42, nm: "西安", py: "xian" },
        { id: 55, nm: "南京", py: "nanjing" },
        { id: 50, nm: "杭州", py: "hangzhou" },
        { id: 59, nm: "成都", py: "chengdu" },
        { id: 45, nm: "重庆", py: "chongqing" }
      ], // 热门城市列表
      isTouch: false, // 用于判断是否属于滑动
      tipsMessage: "", // 用于展示定位结果
      islocation: true // 用于控制定位重复发送请求
    };
  },
  computed: {
    ...mapState(["accessCityList"]), // 最近访问城市列表
    AlphArray() {
      let AlphArray = [];
      this.cityList.forEach(item => {
        // 提取py的第一个首字母
        AlphArray.push(item.py.charAt(0).toUpperCase());
      });
      // stringObject.localeCompare(target) 返回值：说明比较结果的数字。
      // 如果 stringObject 小于 target，则 localeCompare() 返回小于 0 的数。
      // 如果 stringObject 大于 target，则该方法返回大于 0 的数。
      // 如果两个字符串相等，或根据本地排序规则没有区别，该方法返回 0。
      // return [...new Set(AlphArray)].sort((a, b) => a.localeCompare(b)); // 进行去重
      // 如果调用该方法时没有使用参数，将按字母顺序对数组中的元素进行排序，说得更精确点，是按照字符编码的顺序进行排序。
      // 要实现这一点，首先应把数组的元素都转换成字符串（如有必要），以便进行比较。
      return [...new Set(AlphArray)].sort(); // 进行去重
    },
    regulCityListObject() {
      let regulCityListObj = {};
      this.AlphArray.forEach(key => {
        regulCityListObj[key] = [];
        this.cityList.forEach(item => {
          if (key === item.py.charAt(0).toUpperCase()) {
            regulCityListObj[key].push(item);
          }
        });
      });
      return regulCityListObj;
    }
  },
  methods: {
    /**
     *  处理点击锚点
     */
    handleClickAnchor(e) {
      const titleDivs = document.getElementsByClassName("title");
      [].forEach.call(titleDivs, item => {
        if (item.innerHTML === e.target.getAttribute("name")) {
          this.$refs.cityListContainer.scrollTop = item.offsetTop;
        }
      });
    },
    /**
     *  处理touch滑动 - 与旧版相比新增功能
     */
    handleTouchMove(e) {
      this.isTouch = true;
      if (this.isTouch) {
        let pageY = e.targetTouches[0].pageY; // 当前鼠标所在位置
        let offsetTop = this.$refs.anchorList.offsetTop; // 元素距离视图顶部的距离
        let index = Math.floor(
          (pageY - offsetTop) / this.$refs.anchorList.firstChild.offsetHeight
        ); // 计算当前鼠标指向的元素索引
        const titleDivs = document.getElementsByClassName("title");
        if (index < 0 || index > titleDivs.length - 1) return;
        this.$refs.cityListContainer.scrollTop = titleDivs[index].offsetTop;
      }
    },
    /**
     *  处理城市切换跳转
     */
    handleClickCity(city) {
      // 由于地址信息在很多组件上需要使用到，所以考虑放到vuex中进行管理
      this._handleCityQueue(city);

      this.$router.go(-1); // 返回来源页
    },
    /**
     *  处理最近访问城市列表队列
     */
    _handleCityQueue(city) {
      _queueSort(this.accessCityList, city);

      this.$store.commit("SET_ACCESSCITYLIST", this.accessCityList); // 提交commit

      // 进行localStorage存储
      try {
        // 防止用户本地禁用了localStorage 本地存储功能
        localStorage.Maoyan_historyCity = JSON.stringify(this.accessCityList);
      } catch (err) {
        console.log(err);
      }
    },
    /**
     *  调用百度api处理地理定位
     */
    handleLocation() {
      if (this.islocation) {
        this.tipsMessage = "正在定位...";
        const p = {
          ak: "crFhK0WI1SQN6RNFGxRjvQpNr6wHy4LF",
          coor: "bd09ll"
        };
        getLocationCity(p)
          .then(res => {
            res = res.data;
            if (res.status === 0) {
              // 获取定位成功
              this.islocation = false;
              this.tipsMessage = res.address.split("|")[2];
            } else {
              this.tipsMessage = "定位失败, 请点击重试";
            }
          })
          .catch(err => console.log(err));
      } else {
        // 已经定位成功过... 作页面跳转操作
        // 1. 如果需要实现跳转，那么需要把当前定位到的城市名字与获取到列表进行一个比较
        // 2. 匹配后需要重新构造一个city对象
        // 3. 传入到 handleClickCity 函数中进行处理即可 -- 暂时先不实现
        console.log(this.tipsMessage);
      }
    }
  },
  created() {
    const p = {};

    getCityList(p)
      .then(res => {
        res = res.data;
        this.cityList = res.cts;
      })
      .catch(err => console.log(err));

    // 获取定位
    this.handleLocation();
  }
};
</script>

<style lang="scss" scoped>
#city-list-container {
  position: relative;
  height: 100%;
  font-size: $font-middle;
  background-color: #ebebeb;
  color: #333;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }
  .title {
    padding-left: px2rem(30);
    line-height: px2rem(60);
    &.title-letter {
      padding-left: px2rem(50);
    }
  }
  .city-list {
    padding: 0 px2rem(60) px2rem(16) 4%;
    background-color: #f5f5f5;
    .city-item {
      display: inline-block;
      height: px2rem(66);
      line-height: px2rem(66);
      box-sizing: border-box;
      padding: 0 px2rem(8);
      margin-top: px2rem(30);
      margin-right: 4%;
      border: px2rem(2) solid rgb(230, 230, 230);
      border-radius: px2rem(8);
      text-align: center;
      background-color: #fff;
      &.location {
        padding: 0 px2rem(40);
      }
      &.item-btn {
        width: 29%;
      }
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
  .city-list-v2 {
    .city-list2 {
      background-color: #f5f5f5;
      padding: 0 px2rem(90) 0 px2rem(30);
      .city-item2 {
        height: px2rem(88);
        line-height: px2rem(88);
        border-bottom: px2rem(1) solid rgb(200, 199, 204);
        &:last-child {
          border-bottom: 0 none;
        }
      }
    }
  }
  .anchor-list {
    position: fixed;
    right: 0;
    top: px2rem(180);
    width: px2rem(70);
    font-size: px2rem(24);
    .anchor-item {
      text-align: center;
      font-weight: 400;
    }
  }
}
</style>
