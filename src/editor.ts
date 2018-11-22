/*
 * @Author: dengyongqing@aliyun.com 
 * @Date: 2018-06-27 06:08:18
 * @Last Modified by: dengyongqing@aliyun.com
 * @Last Modified time: 2018-11-22 20:59:05
 */

import Base from './base';
import Flow from './flow';
import Itempannel from './itempannel';
import ToolBar from './toolbar';

type Module = Flow | Itempannel | ToolBar;

interface Modules {
  [propName: string]: Module;
}


class Editor extends Base {
  private modules: Modules;
  constructor(cfg: any) {
    super(cfg);
    this.initContainer();
    this.modules = {};
  }
  initContainer() {
    let container = this.get('container');
    if (!container) {
      container = this.get('id');
    }
    if (container) {
      if (typeof container === 'string') {
        container = document.getElementById(container); //eslint-disable-line
      }
    } else {
      throw new Error('please set the container for the graph !');
    }
  }

  addListener(type: string, func: () => void) : void {
    super.addListener(type, func);
  };

  emitEvent(type: string, data: any) : void {
    super.emitEvent(type, data);
  };

  add(component: Module) {
    if (typeof component !== 'object') {
      return;
    }
    this.modules[component.moduleName] = component;
    this.addParseEvent(component);
    if (component.addEventTo) {
      component.addEventTo(this);
    }
  }

  addParseEvent(component: Module) {
    this.addListener(`${component.moduleName}@@parse`, component.parse.bind(component));
  }

  emit(type: string, params: any) {
    this.emitEvent(type, []);
  }

}

export default Editor;
