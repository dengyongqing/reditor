/*
 * @Author: dengyongqing@aliyun.com 
 * @Date: 2018-06-29 02:43:23
 * @Last Modified by: dengyongqing@aliyun.com
 * @Last Modified time: 2018-11-22 22:19:39
 */

import Flow from './flow';
import getTpl from './tpls';
// import Manage from './store/stateManage'

class GenNode {
  private _cfg: any;
  private _tpls: any;
  private nodes: any;
  // private manage: Manage;
  constructor(cfg: any) {
    this._cfg = cfg;
    this._tpls = [];
    this.nodes = [];
    // this.manage = new Manage();
  }

  getData() {
    return {
      nodes: this.nodes
    }
  }

  createData(id: string, attrs: any, shape: string) {
    const {
      dragOrigin:  { clientX: oX, clientY: oY },
      dragTarget: { clientX, clientY },
      width,
      height,
      // windowOffset: { left, top },
      windowOffset,
      offsetTop
    } = attrs;
    const x = clientX - oX - width - 16;
    const y = clientY - oY + parseInt(offsetTop);
    // const y = clientY - (clientY - oY) - top;
    return { id, shape, x, y};
  }

  //  暂时只支持node节点模版
  extendModelCard(shape: string,attrs: any, extendId: string, node) {
    // const tpl = getTpl(shape);
    // const nextAttrs = tpl({ name: node.nodeName, color: attrs.theme });
    const id = `node-${new Date().getTime().toString()}`;
    // Flow.registerNode(shape, nextAttrs, extendId);
    return this.createData(id, (<any>Object).assign({}, attrs, {
      width: 168,
      height: 48
    }), shape);
  }
}

export default GenNode;
