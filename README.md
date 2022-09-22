# Omit共读

## 前言

本文参加了由[公众号@若川视野](https://link.juejin.cn/?target=https%3A%2F%2Flxchuan12.gitee.io) 发起的每周源码共读活动，[点击了解详情一起参与。](https://juejin.cn/post/7079706017579139102)

【若川视野 x 源码共读】第36期 | 可能是历史上最简单的一期 omit.js 剔除对象中的属性[点击了解本期详情一起参与](https://juejin.cn/post/7118782469360320542)。

## 介绍

### `Omit`是什么

> `omit`用来用来返回一个没有`key`属性的对象，在`lodash`里面有使用

> omit(Object,[props])

```javascript
let object = {"a":1,"b":'2',"c":3}
_.omit(object,["a","c"])
```

意思就是：**从object里面删除a，c这两个键值对**

## 源码

### 准备源码

```bash
git clone git@github.com:aehyok/omit.js.git
```

```bash
//安装依赖
npm i
```

```bash
//测试用例
npm run test
```

### 查看依赖

打开`package.json`，会发现一些配置

#### father

father也是一种库打包工具

我自我感觉就是可以为我们自动化生成文档的一个东西

#### np

其实就是用于发包，也就是将这个发布到`npmjs`上

#### assert

也是写单元测试的一个包，但是基本我们写单元测试都是使用`facebook`家的`jest`

### 源码分析

```javascript
function omit(obj, fields) {
  // eslint-disable-next-line prefer-object-spread
  const shallowCopy = Object.assign({}, obj);
  for (let i = 0; i < fields.length; i += 1) {
    const key = fields[i];
    delete shallowCopy[key];
  }
  return shallowCopy;
}
```

从源码中我们可以看出

+ 实现删除其实是使用了一个浅拷贝
+ 遍历了所有需要删除的`props`
+ 然后将他们删除
+ 因为是浅拷贝的缘故，其实他们本身也是会直接进行改变的
+ 就算是删除，他其实也只会删除一层

`Object.assign(source,target)`,就是一种浅拷贝，他将他将`source`里面可枚举的属性全部都复制到`target`里面

```javascript
const benjy = { name: 'Benjy' ,friends:[{name:'summer',age:'15'},{name:'alex',age:12}]};
// const copy = omit(benjy, []);
const copy1 = omit(benjy, ['age'])
// console.log("copy", copy);
console.log("copy1", copy1);//copy1 {name: 'Benjy', friends: Array(2)}
console.log("benjy",benjy);//benjy {name: 'Benjy', friends: Array(2)}
```

### 补充了解

#### 什么是单元测试

> 单元测试应该是自动执行的，并且非交互式

意思就是，不是你手动的去进行`console.log`,而是使用`assert`来验证

#### 使用

> ```bash
> npm i assert
> ```

#### API

`assert.deepEqual(actual,expected)`

>  判断`actual`和`expected`两个值是不是深度相同

他不会只比较一层，它会将每一层都进行判断，它的值比较其实时使用`==`来进行比较，也就是其实它存在类型转换的说法在里面

`assert.equal(actual.expected)`

> 使用`==`进行判断是不是两个参数是不是相等

`aeeset.notEqual(actual,expected)`

> 使用`!=`测试 `actual` 参数与 `expected` 参数是否不相等。

对于单元测试，只要报错了，那么就会立即停止下来，不会继续进行

#### 测试代码

```javascript
import assert from 'assert';
import omit from '../src';

describe('omit', () => {
  it('should create a shallow copy', () => {
    const benjy = { name: 'Benjy' };
    const copy = omit(benjy, []);
    assert.deepEqual(copy, benjy);
    assert.notEqual(copy, benjy);
  });

  it('should drop fields which are passed in', () => {
    const benjy = { name: 'Benjy', age: 18 };
    assert.deepEqual(omit(benjy, ['name']), { name: 'Benjy' });//这边就会直接报错
    assert.deepEqual(omit(benjy, ['name', 'age']), {});
  });
});

```

```bash
      12 |   it('should drop fields which are passed in', () => {
      13 |     const benjy = { name: 'Benjy', age: 18 };
    > 14 |     assert.deepEqual(omit(benjy, ['name']), { name: 'Benjy' });
         |            ^
      15 |     assert.deepEqual(omit(benjy, ['name', 'age']), {});
      16 |   });
      17 | });

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 passed, 2 total
Snapshots:   0 total
Time:        3.275s
Ran all test suites.
×  error     Error: Jest failed
```

## 总结与收获

1. 对浅拷贝进行一些复习
2. 接触到了之前一直没有了解过的单元测试，后续会继续了解，希望在项目中也学会使用,了解了`assert`
3. 第一次了解到`father`和`npm`发布包的流程

参考链接：

[lodash.omit | Lodash 中文文档 | Lodash 中文网 (lodashjs.com)](https://www.lodashjs.com/docs/lodash.omit)

[断言（Assert） | Node.js 中文文档 | Node.js 中文网 (nodeapp.cn)](https://www.nodeapp.cn/assert.html)