---
title: 仿Antd组件之DatePicker组件实现（简易）
link: implementation-of-datepicker
catalog: true
subtitle: DatePicker组件初试手
date: 2022-03-11 21:30:22
cover: img/header_img/milky-way-over-bow-lake-alberta-canada-wallpaper-for-1920x1080-63-873.jpg
tags:
- 前端
- 组件
categories:
- 项目集锦
---

- 对应组件为：[Ant Design DatePicker日期选择框](https://ant.design/components/date-picker-cn/)
- 仓库链接：[组件地址](https://github.com/cosineLearn/cosine-ui)
- 自己的CodePen在线预览链接：[DatePicker（by cos）](https://codepen.io/yusixian/pen/wvPLgWN)

## 心得

- ~契机是什么才不说呢~
- 也算是第一次用React写自己的小组件，可能封装性还不行，bug也还有不少，写的代码自己复盘的时候也很想吐槽2333
- 不过也真的是个很有意思的事！比如点击日期选择器外关闭日期选择器这个功能就纠结了我好长时间qwq，但是写完真的很快乐！
- 使用了React的来ref判断点击事件发生在组件内部还是外部~
- 实现自己的组件是很cool的事！~虽然有时候也会感觉有点重复造轮子~
- 在学习antd组件的实现同时也感受到了其实现的不少细节，望尘莫及ovo，以后有机会还会有优化哒，增加更多api和功能和自定义大小设置等。

## 组件介绍

### DatePicker组件

DatePicker 组件开发
代码及在线预览地址：[DatePicker（by cos）](https://codepen.io/yusixian/pen/wvPLgWN)

1. 日、月、年选择面板的实现
交互：
a.日面板实现：实现点击日期选择具体日期，点击头部面部左右箭头可前往上一年/下一年、上一月/下一月
b.月面板实现：点击日面板头部月份进入，点击月份则选择具体月份并返回日面板，点击头部面部左右箭头前往上一年/下一年
c.年面板实现：点击日面板头部月份进入，以十年为区间，点击年份则选择该年并返回日面板，点击头部面部左右箭头前往上个十年/下个十年
d.根据输入框输入实时变换日期
2. 对外API的实现
a. 支持默认日期的设置 `defaultDate` 通过设置defaultDate为moment对象实现默认日期的设置
b. 支持日期的获取 `onDateChange` 通过日期变化的回调函数获取当前日期，返回moment对象
示例：

```js
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nowDate: 'No Value!'
        }
    }
    handleDateChange(date) {
        this.setState({nowDate: date.format('YYYY-MM-DD')});
    }
    render() {
        return (
            <div className="App">
                <div>nowDate: {this.state.nowDate}</div>
                <DatePicker defaultDate={moment()} onDateChange={(date) => this.handleDateChange(date)} />
            </div>
        );
    }
}
```

3. 面板展示与切换动画
通过 `picker-panel` 中初始透明度 `opacity`为 0，变化原点`transform-origin`为左上角，初始大小为 `scale(0)` ，通过自定义属性 `data-active` 为true控制显示

```css
.picker-panel {
    z-index: 10;
    position: absolute;
    background-color: white;
    top: 30px;
    left: 0;
    width: 300px;
    height: 300px;
    border-radius: 3px;
    border: 1px solid $gray-4;
    box-shadow:2px 2px 10px rgba(0, 0, 0, 0.4);

    display: flex;
    flex-direction: column;

    opacity: 0;
    transform: scale(0);
    transform-origin: top left;
    transition: all 300ms ease-in-out;
    &[data-active=true] {
        transform: scale(1);
        opacity: 1;
    }
}
```

5. 界面展示

- 初始值

![初始值.png](https://backblaze.cosine.ren/juejin/7e080154069a41de9dadf3c3ace7af3e~tplv-k3u1fbpfcp-watermark.png)

- 选择其他日期
![选择其他日期.png](https://backblaze.cosine.ren/juejin/091cd5f2e98c4b6aaa1fc14fd7a5afef~Tplv-K3u1fbpfcp-Watermark.png)

- 下一年
![下一年.png](https://backblaze.cosine.ren/juejin/818dbc4607d948d3a1ef1cb5fed45890~Tplv-K3u1fbpfcp-Watermark.png)

- 上一个月
![上一个月.png](https://backblaze.cosine.ren/juejin/715976c98a404bd0ba1f7765bf4485fa~Tplv-K3u1fbpfcp-Watermark.png)

- 进入年面板
![进入年面板.png](https://backblaze.cosine.ren/juejin/b6ad473c7fe34cb4a34a0d83268a14db~tplv-k3u1fbpfcp-watermark.png)

- 切换年面板
![切换年面板.png](https://backblaze.cosine.ren/juejin/0045f8ac75bf47119b2c00368784461f~Tplv-K3u1fbpfcp-Watermark.png)

- 月面板

![月面板.png](https://backblaze.cosine.ren/juejin/E91c94487f0d4ff7822798f4d39f722c~Tplv-K3u1fbpfcp-Watermark.png)
