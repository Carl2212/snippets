import { Injectable, EventEmitter } from "@angular/core";
import { Storage } from "@ionic/storage";
import { deepCopy, deepEqual } from "ionic-angular/es2015/util/util";
/**
 * Created by Ellen on 30/1/2018.
 */
const CACHENAME: string = 'cache';

export interface Node {
  key? : any;
  value? : any;
  next? : Node;
}

export abstract class CacheBasic {

  private cacheNode: Array<any> = [];

  private cacheNum: number = 100;

  abstract latestCache: Node;

  constructor(private storage: Storage) {
  }

  private setCache() {
    this.storage.set(CACHENAME, this.cacheNode);
  }

  public loadCache() {
    if (this.cacheNode.length <= 0) {
      this.latestCache = null;
    }else{
      this.latestCache = deepCopy(this.cacheNode[0]);
    }
  }

  private nodeSearch(node : Node , target : Node) : boolean {
    if(node.key == target.key && deepEqual(node.value,target.value)) {
      if(!node.next) {
        return true;
      }
      if(!target.next) {
        return false;
      }
      return this.nodeSearch(node.next , target.next);
    }
    return false;
  }

  public getTargetCache() {
    let res;
    if (this.cacheNode.length <= 0) {
      res = -1;
    } else {
      res = this.cacheNode.findIndex((v) => {
        return this.nodeSearch(this.latestCache , v);
      });
    }
    let latest = {};
    if (res > -1) {
      latest = this.cacheNode[res];
      this.cacheNode.splice(res, 1);
    } else {
      latest= this.latestCache;
      if (this.cacheNode.length > this.cacheNum) {
        this.cacheNode.splice(this.cacheNum - 1);
      }
    }
    this.cacheNode.unshift(latest);
    this.setCache();
    this.loadCache();
  }

  public reload(): Promise<any> {
    return this.storage.get(CACHENAME)
      .then((data) => {
        if (data) {
          this.cacheNode = data;
          if(!this.cacheNode[0].value) {
            this.cacheNode = [];
          }
          this.loadCache();
        }
      });
  }
}

@Injectable()
export class CacheService extends CacheBasic {

  //latest cache
  public latestCache : Node;
  //related node
  private node : Array<string> = ['actionA', 'actionB', 'actionC', 'actionD'];

  public cacheEvent = new EventEmitter<any>();

  constructor(
    storage: Storage
  ) {
    super(storage);
    //node init
    this.node.forEach((v)=>{
      this.new(v);
    });
  }

  public loadCache() {
    super.loadCache();
    this.initNode();
  }

  private initNode() {
    let node = this.latestCache;
    this.node.forEach(v=>{
      if(node && node.key == v) {
        this[`_${v}`] = node.value;
      }else{
        this[`_${v}`] = null;
      }
      node = node ? node.next : null;
    })
  }

  private new(property : string) {
    this[`_${property}`] = null;
    Object.defineProperty(this,property,{
      get : ()=>{
        return this[`_${property}`];
      },
      set: (value : any)=>{
        console.log(value);
        this[`_${property}`] = value;
        let end = this.node.indexOf(property);
        let i = 0;
        let node: Node= this.latestCache= {};
        while(node){
          node.key = this.node[i];
          node.value = this[`_${this.node[i]}`];
          if(i < end) {
            node.next = {};
          }else{
            node.next = null;
          }
          node= node.next;
          i++;
        }
        this.getTargetCache();
        this.cacheEvent.emit(property);
      },
      enumerable: true,
      configurable: true
    })
  }
}
