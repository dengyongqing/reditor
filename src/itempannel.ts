/*
 * @Author: dengyongqing@aliyun.com 
 * @Date: 2018-06-27 06:08:04
 * @Last Modified by: dengyongqing@aliyun.com
 * @Last Modified time: 2018-11-22 21:02:40
 */

import BaseDom from './dom';

interface Options {
  container: string;
  templates: any;
  itemKey?: string;
  interactiveType?: string;
}

class Itempannel extends BaseDom {
  private event: any;
  private options: Options;
  public readonly moduleName: string = 'Itempannel';
  private datasets: Array<number>;
  private containers: any;
  private nodes: any;
  private templates: any;
  constructor(options: Options) {
    super();
    this.event = null;
    this.options = options;
    this.datasets = [];
    this.containers = null;
    this.nodes = [];
    this.templates = options.templates;
  }

  addEventListener() {
    const nodes = this.nodes;
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].setAttribute('draggable', true);
      nodes[i].addEventListener('dragstart', this.ondragstart.bind(this), false);
    }
  }

  findDom() {
    const { container, itemKey } = this.options;
    this.containers = this.findDomById(container);
    const className = itemKey || 'getItem';
    this.nodes = this.findDomByClassName(className, this.containers);
  }

  genDatasets() {
    const { nodes } = this;
    for (let i = 0; i < nodes.length; i++) {
      const dataset = (<any>Object).assign({}, nodes[i].dataset);
      // const dataset = Object.assign({}, nodes[i.dataset]);
      this.datasets.push(dataset);
    }
  }

  parse() {
    this.findDom();
    this.genDatasets();
    this.addEventListener();
  }

  addEventTo(event: any) {
    this.event = event;
  }

  ondragstart(ev: any) {
    ev.dataTransfer.setData('shape', ev.target.dataset.shape);
    ev.dataTransfer.setData('extendId', ev.target.dataset.extendid);
    ev.dataTransfer.setData('name', ev.target.dataset.name);
    ev.dataTransfer.setData('theme', ev.target.dataset.theme);
    ev.dataTransfer.setData('stringify', ev.target.dataset.stringify);
    const offsetTop = ev.target.offsetTop - document.getElementById(this.options.container).scrollTop;
    ev.dataTransfer.setData('offsetTop', offsetTop)
    this.event.emitEvent('Itempannel@@dragitem', [ev]);
  }
}

export default Itempannel;
