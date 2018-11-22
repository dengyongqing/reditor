/*
 * @Author: dengyongqing@aliyun.com 
 * @Date: 2018-06-27 06:07:54 
 * @Last Modified by: dengyongqing@aliyun.com
 * @Last Modified time: 2018-11-22 20:58:33
 */

export default class BaseDom {
  findDomById(container: string, node?: Document) {
    if (node) {
      return node.getElementById(container);
    }
    return document.getElementById(container);
  }
  findDomByClassName(container: string, node?: HTMLElement) {
    if (node) {
      return node.getElementsByClassName(container);
    }
    return document.getElementsByClassName(container);
  }
}
