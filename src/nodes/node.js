/* @flow */
export type RawNode = any;

import _ from 'lodash';
import { stripDetailsFromTree, parseNameFromNode } from '../parse'

import printers from '../printers';

export default class Node {
  children: {
    [key: string]: Node
  };
  kind: string;
  name: string;
  raw: RawNode;
  namespace: ?string;

  constructor(node: ?RawNode) {
    this.children = {};

    if (node) {
      this.raw = stripDetailsFromTree(node);
      this.name = parseNameFromNode(node);
    }
  }

  addChild(name:string, node: Node) {
    this.children[name] = node;
  }

  getChildren() {
    return _.toArray(this.children);
  }

  print() {
    return printers.node.printType(this.raw);
  }
}
