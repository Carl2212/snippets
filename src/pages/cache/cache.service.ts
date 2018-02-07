import {Injectable, EventEmitter} from "@angular/core";
import {Storage} from "@ionic/storage";
import {deepEqual} from "ionic-angular/util/util";
/**
 * CACHE SERVICE
 * cache the tree-node data of the user's action
 * Created by Ellen on 30/1/2018.
 */
const CACHENAME: string = 'cache';

export class Node {

  private _nd: any;
  public emitEvent = new EventEmitter<any>();

  constructor(
    private callback,
    private relateNode: Array<string>
  ) {}

  get nd() {
    return this._nd;
  }

  set nd(val: any) {
    this._nd = val;
    this.callback && this.callback(this.relateNode);
    this.emitEvent.emit(val);
  }

  setNd(val: any) {
    this._nd = val;
  }

}

export abstract class CacheBasic {

  private cacheNode: Array<any> = [];

  private cacheNum: number = 40;

  constructor(private storage: Storage,
              private nodeName: Array<string>) {
  }

  setCache(cacheName?: Array<string>) {
    if (this.cacheNode.length <= 0) {
      return;
    }
    if (cacheName) {
      let latest = this.cacheNode[0];
      latest[cacheName[0]] = this[cacheName[0]].nd;
    }
    this.storage.set(CACHENAME, this.cacheNode);
    this.loadCache();
  }

  loadCache() {
    if (this.cacheNode.length <= 0) {
      return;
    }
    let latest = this.cacheNode[0];
    this.nodeName.forEach((v) => {
      if (latest[v]) {
        this[v].setNd(latest[v]);
      } else {
        this[v].setNd(null);
      }
    });
  }

  getTargetCache(relateNode) {
    let res;
    if (this.cacheNode.length <= 0) {
      res = -1;
    } else {
      res = this.cacheNode.findIndex((v) => {
        let isTrue = true;
        relateNode.forEach((nodeName) => {
          if (!v[nodeName] || !deepEqual(v[nodeName], this[nodeName].nd)) {
            isTrue = false;
          }
        });
        return isTrue;
      });
    }
    let latest = {};
    if (res > -1) {
      latest = this.cacheNode[res];
      this.cacheNode.splice(res, 1);
    } else {
      relateNode.forEach((nodeName) => {
        latest[nodeName] = this[nodeName].nd;
      });
      if (this.cacheNode.length > this.cacheNum) {
        this.cacheNode.splice(this.cacheNum - 1);
      }
    }
    this.cacheNode.unshift(latest);
    this.setCache();
    //通知事件

  }

  reload(): Promise<any> {
    return this.storage.get(CACHENAME)
      .then((data) => {
        if (data) {
          this.cacheNode = data;
          this.loadCache();
        }
      });
  }
}

@Injectable()
export class CacheService extends CacheBasic {

  public D1: Node;
  public D2: Node;
  public D3: Node;
  public D4: Node;

  constructor(storage: Storage) {
    super(storage, ['D1', 'D2', 'D3', 'D4']);
    //对需要缓存的数据 做节点初始化 绑定缓存数据函数 以及相关函数参数(关联的节点名)
    this.D1 = new Node(this.getTargetCache.bind(this), ['D1']);
    this.D2 = new Node(this.getTargetCache.bind(this), ['D1', 'D2']);
    this.D3 = new Node(this.getTargetCache.bind(this), ['D1', 'D2', 'D3']);
    this.D4 = new Node(this.setCache.bind(this), ['D4']);
  }

  setCache(cacheName?: Array<string>) {
    super.setCache(cacheName);
  }
}
