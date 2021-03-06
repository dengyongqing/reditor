/*
 * @Author: dengyongqing@aliyun.com 
 * @Date: 2018-07-09 10:35:23
 * @Last Modified by: dengyongqing
 * @Last Modified time: 2019-03-06 15:25:51
 */

import BaseDom from './dom';

interface Options {
  container: string,
  itemClassName?: string;
}

interface Datasets {
  [propName: string]: boolean;
}

class ToolBar extends BaseDom {
  private event: any;
  private options: Options;
  public readonly moduleName: string = 'ToolBar';
  private containers: HTMLElement;
  private nodes: any;
  private datasets: Datasets;
  private selected: object;
  constructor(options: any) {
    super();
    this.event = null;
    this.options = options;
    this.datasets = {};
    this.selected = {};

    document.addEventListener('keydown', (ev) => {
      if (ev.target.nodeName === 'CANVAS' && ev.target.id.includes('canvas')) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode===8 || e.keyCode===46){//退格删除
          const { selected: { id } } = this;
          if (id) {
            this.event.emitEvent('@delete_node', [id]);
          }
        }
    
        if(e && e.keyCode==27){ // 按 Esc 
            //要做的事情
        }
        if(e && e.keyCode==113){ // 按 F2 
            //要做的事情
        }            
        if(e && e.keyCode==13){ // enter 键
            //要做的事情
        }
      }
    }, true);
  }

  private undo() {
    alert('undo暂不支持，稍后')
    // this.event.emitEvent('@updo', []);
  }

  private redo() {
    alert('redo，暂不支持，稍后')
  }

  private copy() {
    alert('copy暂不支持，稍后')
  }

  private dragmode() {
    this.event.emitEvent('@dragmode', [])
  }

  private paste() {
    alert('paste暂不支持，稍后')
  }

  private delete() {
    const { selected: { id } } = this;
    if (id) {
      this.event.emitEvent('@delete_node', [id]);
    }
  }

  private dagre() {
    this.event.emitEvent('@dagre_graph');
  }

  private zoomIn() {
    this.event.emitEvent('@zoomIn', [])
  }

  private zoomOut() {
    this.event.emitEvent('@zoomOut', [])
  }

  private autoZoom() {
    this.event.emitEvent('@zoomReset', [1])
  }

  private resetZoom() {
    this.event.emitEvent('@zoomReset', [1])
  }

  addEventListener() {
    const nodes = this.nodes;
    for (let i = 0; i < nodes.length; i++) {
      const type = nodes[i].dataset.command;
      nodes[i].addEventListener('click', this[type].bind(this), false);
    }
  }

  addEventTo(event: any) {
    this.event = event;
  }

  findDomById(container: string) : HTMLElement{
    return super.findDomById(container);
  }

  findDom() {
    const { container, itemClassName } = this.options;
    this.containers = this.findDomById(container);
    const className = itemClassName || 'command';
    this.nodes = this.findDomByClassName(className, this.containers);
  }

  genDatasets() {
    const { nodes } = this;
    for (let i = 0; i < nodes.length; i++) {
      const type = nodes[i].dataset.command;
      const { datasets } = this;
      this.datasets = (<any>Object).assign({}, datasets, { [ type ]: true });
    }
  }

  listeningNode() {
    this.event.addListener(`${this.moduleName}@@listen_node`, (ev: any) => {
      this.setfocus(ev);
    });
    this.event.addListener(`${this.moduleName}@@listen_edge`, (ev: any) => {
      this.setfocus(ev);
    });
  }

  parse() {
    this.findDom();
    this.genDatasets();
    this.addEventListener();
    this.listeningNode();
  }

  setfocus(node) {
    this.selected = node;
  }
}

export default ToolBar;
