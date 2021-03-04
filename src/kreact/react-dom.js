/**
 * 
 * vnode 虚拟dom对象
 * container 真实dom节点
 */

function render(vnode, container) {
  console.log('vnode', vnode);

  // vnode->node
  const node = createNode(vnode);
  // node ->挂在到container
  container.appendChild(node);
}


// vnode->node
function createNode(vnode) {
  const { type } = vnode;
  let node;
  if (typeof type === 'string') {
    // 原生标签
    node = updateHostComponent(vnode);
  } else if (typeof type === 'function') {
    if (type.prototype.isReactComponent) {
      // 类组件
      node = updateClassComponent(vnode);
    } else {
      // 函数式组件
      node = updateFunctionComponent(vnode);
    }
  } else {
    // 处理纯文本类型的 chidlren: 这是h1标签
    node = updateTextComponent(vnode);
  }
  return node;
}

// 创建原生标签节点
function updateHostComponent(vnode) {
  const { type, props } = vnode;
  const node = document.createElement(type);
  // 处理props属性，chidlren属性不用添加
  updateNode(node, props);
  // 处理children的情况
  reconcileChildren(node, props);
  return node;
}

// 类组件处理
function updateClassComponent(vnode) {
  const { type, props } = vnode;
  const instance = new type(props);
  const vvnode = instance.render();
  // vnode->node
  const node = createNode(vvnode);
  return node;
}

// 函数式组件处理
function updateFunctionComponent(vnode) {
  const { type, props } = vnode;
  const vvnode = type(props);
  // vnode->node
  const node = createNode(vvnode);
  return node;
}

// 创建文本标签节点
function updateTextComponent(vnode) {
  const node = document.createTextNode(vnode);
  return node;
}

// 更新属性到node节点
function updateNode(node, props) {
  Object.keys(props).filter(key => key !== 'children').forEach(key => {
    node[key] = props[key];
  });
}
// 将chidlren插入到父级节点中
function reconcileChildren(parentNode, props) {
  const { children } = props;
  let newChildren;
  if (!children) {
    // 处理<span></span>空标签时
    newChildren = [];
  } else if (Array.isArray(children)) {
    // 有值存在时
    newChildren = children;
  } else {
    // 处理<span>span</span>
    newChildren = [children];
  }
  newChildren.forEach(vnode => {
    render(vnode, parentNode);
  })
}
export default { render };