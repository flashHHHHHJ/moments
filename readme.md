# 朋友圈

## 项目说明

- 目标：完成6个任务，实现一个基本微信朋友圈的界面


### 项目结构
- moments.html 页面 HTML 
- style.css 样式基本样式
- app.js 页面逻辑 （提供了基础的逻辑函数和页面数据变量 `data`）
- img 存放页面展示所需的图片
- demo 存放文档展示的效果图
- message.html 多图片消息的html结构的示例
- readme.md 项目说明文档


## 具体实现
### 1、实现四种消息类型
对于朋友圈页面，消息大致分成四种情况：
#### 1.1、多图片消息 (消息 type 为0)


![](http://coding.imweb.io/img/project/moments/type1.png)

#### 1.2、分享消息  (消息 type 为1)

![](http://coding.imweb.io/img/project/moments/type2.png)

#### 1.3、单图片消息 (消息 type 为2)

![](http://coding.imweb.io/img/project/moments/type3.png)

#### 1.4、无图片消息 (消息 type 为3)

![](http://coding.imweb.io/img/project/moments/type4.png)


### 2、将提供的页面数据 `data` 转换成页面
在app.js 中提供了以下页面数据 ：
- userName： 用户名称 （可修改为自己的名字）
- data: 页面消息数据对象数组，需要对这个数据进行解析，并生成页面

```javascript
// 用户名称 - 修改为自己的名称
var userName = '张学友';
// 需要渲染的页面的数据
var data = [...];
```

**整体结构**

一个消息对象由以下三个部分组成。

| 属性名      |  类型 |   备注  |
| :-------- | :--------| :------ |
|  user  |   Object |  发送消息的用户的信息  |
|  content  |   Object |  消息的内容  |
|  reply  |   Object |  消息的评论点赞信息  |

**user 对象组成说明**

| 属性名      |  类型 |   备注  |
| :-------- | :--------| :------ |
|  name  |   String |  发送消息的用户的名称  |
|  avatar  |   String |  发送消息的用户的头像地址  |

**content 对象组成说明**

| 属性名      |  类型 |   备注  |
| :-------- | :--------| :------ |
|  type  |   Number |  消息的类型，共有四种值（0代表多图片消息、1代表分享信息、2代表单图片消息、3代表无图片消息）  |
|  text  |   String |  消息的文本内容  |
|  pics  |   Array |  消息相关图片地址列表  |
|  share  |   Obejct |  分享消息内容对象  |
|  timeString  |  String |  消息的发送时间字符串  |

**content.share 分享数据对象组成说明**

分享消息数据对象其组成如下：

| 属性名      |  类型 |   备注  |
| :-------- | :--------| :------ |
|  pic  |   String | 分享消息的图片  |
|  text  |   String |  分享消息的文本  |

**reply 对象组成说明**

| 属性名      |  类型 |   备注  |
| :-------- | :--------| :------ |
|  hasLiked  |   Boolean | 自己是否有对这条消息进行点赞  |
|  likes  |   Array |  消息已点赞的用户列表  |
|  comments  |   Array |  消息相关的评论信息列表  |

**reply.comments 数组对象组成说明**

comments 数组中每一项对象都代表着评论的信息，其组成如下：

| 属性名      |  类型 |   备注  |
| :-------- | :--------| :------ |
|  author  |   String | 消息评论的用户名称  |
|  text  |   String |  消息评论的文本内容  |




### 3、实现回复按钮功能
- 点击信息的回复按钮，弹出回复操作面板
- 同时只能展现一个回复操作面板
- 点击非回复操作面板的区域，隐藏回复操作面板

具体效果如下：

![](http://coding.imweb.io/img/project/moments/replypanel.gif)


### 4、实现点赞功能
- 对于未点赞的信息，点击回复按钮，展现点赞的按钮

![](http://coding.imweb.io/img/project/moments/icon-like.png)

- 对于已点赞的信息，点击回复按钮，展现取消点赞的按钮

![](http://coding.imweb.io/img/project/moments/icon-unlike.png)

- 点击点赞按钮，完成点赞
- 点击取消按钮，取消点赞

具体效果如下：


![](http://coding.imweb.io/img/project/moments/like.gif)


### 5、实现增加评论功能
- 点击回复按钮，底部展现输入框和发送按钮
- 当文本框为空，发送按钮为灰色不可点击状态
- 当文本框不为空，发送按钮为绿色且点击发送，在信息栏中增加信息


具体效果如下：

![](http://coding.imweb.io/img/project/moments/comment.gif)


### 6、点击图片放大功能
- 点击信息的图片，展示放大图片
- 点击放大展示的图片区域，隐藏放大图片区域

具体效果如下：

![](http://coding.imweb.io/img/project/moments/pic.gif)


