# 树 & 遍历
```javascript
const Node = function (key) {
    this.key = key;
    this.left = null;
    this.right = null;
};
const Tree = function (treeList) {
    this.root = treeList ? this.insetList(treeList) : null;
};
// desc 插入节点
Tree.prototype.insertNode = function (node, newNode) {
    if (newNode.key < node.key) {
        if (node.left === null) {
            node.left = newNode;
        }
        else {
            this.insertNode(node.left, newNode);
        }
    }
    else {
        if (node.right === null) {
            node.right = newNode;
        }
        else {
            this.insertNode(node.right, newNode);
        }
    }
};
// desc 查找最小节点
Tree.prototype.findMinNode = function (node) {
    while (node && node.left !== null) {
        node = node.left;
    }
    return node;
};
// desc 查找最大节点
Tree.prototype.findMaxNode = function (node) {
    while (node && node.right !== null) {
        node = node.right;
    }
    return node;
};
// desc 查找节点
Tree.prototype.findNode = function (node, key) {
    if (node) {
        if (key === node.key) {
            return node;
        }
        else {
            if ((key < node.key) && node.left !== null) {
                return this.findNode(node.left, key);
            }
            else if ((key > node.key) && node.right !== null) {
                return this.findNode(node.right, key);
            }
            else {
                return -1;
            }
        }
    }
    else {
        return -1;
    }
};
// desc 移除节点
Tree.prototype.removeNode = function (node, key) {
    if (!node) {
        return null;
    }
    let delNode = node;
    if (delNode.key === key) {
        if (delNode.left && delNode.right) {
            const rightNodeMin = this.findMinNode(delNode.right);
            delNode.key = rightNodeMin.key;
            delNode.right = this.removeNode(delNode.right,rightNodeMin.key);
        }
        else if (delNode.left) {
            delNode = delNode.left;
        }
        else if (delNode.right) {
            delNode = delNode.right;
        }
        else {
            delNode = null;
        }
    }
    else if (key < delNode.key) {
        delNode.left = this.removeNode(delNode.left, key);
    }
    else{
        delNode.right = this.removeNode(delNode.right, key);
    }
    return delNode;
};
// desc 中序遍历节点
Tree.prototype.inQueryNode = function (node, callback) {
    node.left && this.inQueryNode(node.left, callback);
    callback(node);
    node.right && this.inQueryNode(node.right, callback);
};
// desc 先序遍历节点
Tree.prototype.preQueryNode = function (node, callback) {
    callback(node);
    node.left && this.preQueryNode(node.left, callback);
    node.right && this.preQueryNode(node.right, callback);
};
// desc 后序遍历节点
Tree.prototype.lastQueryNode = function (node, callback) {
    node.left && this.lastQueryNode(node.left, callback);
    node.right && this.lastQueryNode(node.right, callback);
    callback(node);
};

// desc 对外使用API - 插入节点
Tree.prototype.insert = function (key) {
    const node = new Node(key);
    if (this.root) {
        this.insertNode(this.root, node);
    }
    else {
        this.root = node;
    }
};
// desc 对外使用API - 移除节点
Tree.prototype.remove = function (key) {
    let delNode = this.findNode(this.root, key);
    if (delNode === -1) {
        console.error('删除失败，节点不存在');
        return;
    }
    this.root = this.removeNode(this.root, key);
    console.log(this.inQuery());
};
// desc 对外使用API - 中序遍历
Tree.prototype.inQuery = function (callback) {
    const list = [];
    this.inQueryNode(this.root, callback ? callback : (node) => {
        list.push(node.key);
    });
    return list;
};
// desc 对外使用API - 先序遍历
Tree.prototype.preQuery = function (callback) {
    const list = [];
    this.preQueryNode(this.root, callback ? callback : (node) => {
        list.push(node.key);
    })
    return list;
};
// desc 对外使用API - 后序遍历
Tree.prototype.lastQuery = function (callback) {
    const list = [];
    this.lastQueryNode(this.root, callback ? callback : (node) => {
        list.push(node.key);
    })
    return list;
};
// desc 对外使用API - 数组插入
Tree.prototype.insetList = function (list) {
    list.forEach((key) => {
        this.insert(key);
    })
};
// desc 对外使用API - 查找节点
Tree.prototype.find = function (key) {
    return this.findNode(this.root, key);
};
// desc 对外使用API - 查找最小节点
Tree.prototype.min = function () {
    return this.findMinNode(this.root);
};
// desc 对外使用API - 查找最大节点
Tree.prototype.max = function () {
    return this.findMaxNode(this.root);
};


const tree = new Tree();
// tree.insetList([10, 5, 1, 9, 7, 16, 12, 20, 15, 18, 22]);
tree.insetList([10, 5, 1, 9, 7, 16, 12, 20, 15, 18, 17,19,22,21,24])
```
