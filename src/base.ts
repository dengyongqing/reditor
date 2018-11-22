/*
 * @Author: dengyongqing@aliyun.com 
 * @Date: 2018-07-10 06:32:15 
 * @Last Modified by: dengyongqing@aliyun.com
 * @Last Modified time: 2018-11-22 20:57:52
 */
const EventEmitter = require('wolfy87-eventemitter');

export default class Base extends EventEmitter {
  protected _cfg: any;
  protected destroyed: boolean;
  constructor(cfg: object) {
    super();
    const defaultCfg = this.getDefaultCfg();
    this._cfg = (<any>Object).assign({}, defaultCfg, cfg);
  }
  getDefaultCfg() {
    return {};
  }

  get(name: string) {
    return this._cfg[name];
  }

  set(name: string, value: any) {
    this._cfg[name] = value;
  }

  addListener(type: string, func: () => void) : void {
    super.addListener(type, func);
  };

  emitEvent(type: string, data: any) : void {
    super.emitEvent(type, data);
  };

  removeAllListeners() : void {
    super.removeAllListeners();
  }

  destroy() {
    this._cfg = {};
    this.removeAllListeners();
    this.destroyed = true;
  }
}
