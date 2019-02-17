/**
 * 通过Array.some方法实现
 * @param {Array} list
 * @param {Obejct} compare
 */
export function _queueSort(list, compare) {
  if (!compare) return;
  let sIndex;
  let result = list.some((item, index) => {
    if (item.id) {
      if (compare.id === item.id) {
        // 说明列表中已存在
        sIndex = index;
        return true;
      }
    } else {
      // 存在浏览器的兼容问题：
      // 浏览器版本限制：JavaScript Version 1.8
      compare = compare.trim();
      if (compare === item) {
        sIndex = index;
        return true;
      }
    }
  });
  if (result) {
    // 属于重复的点击
    list.splice(sIndex, 1); // 删除掉
  } else {
    if (list.length >= 3) {
      list.pop(); // 删除最后一个
    }
  }
  list.unshift(compare); // 添加到头部
}

/**
 * 通过findIndex实现
 * @param {Array} list
 * @param {Object} compare
 */
export function _queueSort2(list, compare) {
  if (!compare) return;
  let sIndex = list.findIndex(item => {
    if (item.id) {
      if (item.id === compare.id) {
        return true;
      }
    } else {
      compare = compare.trim();
      if (item === compare) {
        return true;
      }
    }
  });
  if (sIndex !== -1) {
    // 属于重复的点击
    list.splice(sIndex, 1); // 删除掉
  } else {
    if (list.length >= 3) {
      list.pop(); // 删除最后一个
    }
  }
  list.unshift(compare); // 添加到头部
}
