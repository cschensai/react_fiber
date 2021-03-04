// import ReactDOM from 'react-dom';
import Component from './kreact/Component';
import ReactDOM from './kreact/react-dom';

import './index.css';


// 函数式组件
function FunctionComponent(props) {
  return (
    <div className="borderFunc">
      <h4>这是{props.name}组件</h4>
    </div>
  )
}

// 类组件
class ClassComponent extends Component {
  render() {
    return (
      <div className="borderClass">
        这是{this.props.name}组件
      </div>
    )
  }
}

// 原生标签
const jsx = (<div>
  <h1>这是h1</h1>
  <a href="https://baidu.com/">这是a标签</a>
  <span className="span"></span>
  <FunctionComponent name="函数式" />
  <ClassComponent name="类" />
</div>)
ReactDOM.render(jsx, document.getElementById('root'));
