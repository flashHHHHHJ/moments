// TODO: 用户名称需修改为自己的名称
var userName = 'jjFlash';
// 朋友圈页面的数据
var data = [{
  user: {
    name: '阳和', 
    avatar: './img/avatar2.png'
  }, 
  content: {
    type: 0, // 多图片消息
    text: '华仔真棒，新的一年继续努力！',
    pics: ['./img/reward1.png', './img/reward2.png', './img/reward3.png', './img/reward4.png'],
    share: {},
    timeString: '3分钟前'
  }, 
  reply: {
    hasLiked: false,
    likes: ['Guo封面', '源小神'],
    comments: [{
      author: 'Guo封面',
      text: '你也喜欢华仔哈！！！'
    },{
      author: '喵仔zsy',
      text: '华仔实至名归哈'
    }]
  }
}, {
  user: {
    name: '伟科大人',
    avatar: './img/avatar3.png'
  },
  content: {
    type: 1, // 分享消息
    text: '全面读书日',
    pics: [],
    share: {
      pic: 'http://coding.imweb.io/img/p3/transition-hover.jpg',
      text: '飘洋过海来看你'
    },
    timeString: '50分钟前'
  },
  reply: {
    hasLiked: false,
    likes: ['阳和'],
    comments: []
  }
}, {
  user: {
    name: '深圳周润发',
    avatar: './img/avatar4.png'
  },
  content: {
    type: 2, // 单图片消息
    text: '很好的色彩',
    pics: ['http://coding.imweb.io/img/default/k-2.jpg'],
    share: {},
    timeString: '一小时前'
  },
  reply: {
    hasLiked: false,
    likes:[],
    comments: []
  }
}, {
  user: {
    name: '喵仔zsy',
    avatar: './img/avatar5.png'
  },
  content: {
    type: 3, // 无图片消息
    text: '以后咖啡豆不敢浪费了',
    pics: [],
    share: {},
    timeString: '2个小时前'
  }, 
  reply: {
    hasLiked: false,
    likes:[],
    comments: []
  }
}];

// 相关 DOM
var $page = $('.page-moments');
var $momentsList = $('.moments-list');

/**
 * 点赞内容 HTML 模板
 * @param {Array} likes 点赞人列表
 * @return {String} 返回html字符串
 */
function likesHtmlTpl(likes) {
  if (!likes.length) {
    return '';
  }
  var  htmlText = ['<div class="reply-like"><i class="icon-like-blue"></i>'];
  // 点赞人的html列表
  var likesHtmlArr = [];
  // 遍历生成
  for(var i = 0, len = likes.length; i < len; i++) {
    likesHtmlArr.push('<a class="reply-who" href="#">' + likes[i] + '</a>');
  }
  // 每个点赞人以逗号加一个空格来相隔
  var likesHtmlText = likesHtmlArr.join(', ');
  htmlText.push(likesHtmlText);
  htmlText.push('</div>');
  return htmlText.join('');
}
/**
 * 评论内容 HTML 模板
 * @param {Array} likes 点赞人列表
 * @return {String} 返回html字符串
 */
function commentsHtmlTpl(comments) {
  if (!comments.length) {
    return '';
  }
  var  htmlText = ['<div class="reply-comment">'];
  for(var i = 0, len = comments.length; i < len; i++) {
    var comment = comments[i];
    htmlText.push('<div class="comment-item"><a class="reply-who" href="#">' + comment.author + '</a>：' + comment.text + '</div>');
  }
  htmlText.push('</div>');
  return htmlText.join('');
}
/**
 * 评论点赞总体内容 HTML 模板
 * @param {Object} replyData 消息的评论点赞数据
 * @return {String} 返回html字符串
 */
function replyTpl(replyData) {
  var htmlText = [];
  if(replyData.likes.length !== 0 || replyData.comments.length !== 0){
  htmlText.push('<div class="reply-zone">');
  htmlText.push(likesHtmlTpl(replyData.likes));
  htmlText.push(commentsHtmlTpl(replyData.comments));
  htmlText.push('</div>');
  return htmlText.join('');
  }
}
/**
 * 多张图片消息模版 （可参考message.html）
 * @param {Object} pics 多图片消息的图片列表
 * @return {String} 返回html字符串
 */
function multiplePicTpl(pics) {
  var htmlText = [];
  htmlText.push('<ul class="item-pic">');
  for (var i = 0, len = pics.length; i < len; i++) {
    htmlText.push('<img class="pic-item" src="' + pics[i] + '">')
  }
  htmlText.push('</ul>');
  return htmlText.join('');
}
/**
 * 分享消息模板
 * @param {Object} pic 分享消息中的图片
 * @param {*} text 分享消息中的文字内容
 */
function shareMessage(pic, text) {
  var htmlText = [];
  htmlText.push('<div class="item-share">');
  htmlText.push('<a href="#"><img class="share-img" src="' + pic + '">');
  htmlText.push('<span class="share-tt">' + text + '</span></a>');
  htmlText.push('</div>');
  return htmlText.join('');
}
/**
 * 单张图片消息模板
 * @param {Object} pics 单张图片消息中的图片 
 */
function onePic(pics){
  var htmlText = [];
  htmlText.push('<img class="item-only-img" src=' + pics +'>');
  return htmlText;
}
/**
 * 循环：消息体 
 * @param {Object} messageData 对象
 */ 
function messageTpl(messageData,index) {
  var user = messageData.user;
  var content = messageData.content;
  var htmlText = [];
  htmlText.push('<div class="moments-item" data-index='+ index +'>');
  // 消息用户头像
  htmlText.push('<a class="item-left" href="#">');
  htmlText.push('<img src="' + user.avatar + '" width="42" height="42" alt=""/>');
  htmlText.push('</a>');
  // 消息右边内容
  htmlText.push('<div class="item-right">');
  // 消息内容-用户名称
  htmlText.push('<a href="#" class="item-name">' + user.name + '</a>');
  // 消息内容-文本信息
  htmlText.push('<p class="item-msg">' + content.text + '</p>');
  // 消息内容-图片列表 
  var contentHtml = '';
  // 目前只支持多图片消息，需要补充完成其余三种消息展示
  switch(content.type) {
      // 多图片消息
    case 0:
      contentHtml = multiplePicTpl(content.pics);
      break;
    case 1:
      // TODO: 实现分享消息
      contentHtml = shareMessage(content.share.pic , content.share.text);
      break;
    case 2:
      // TODO: 实现单张图片消息
      contentHtml = onePic(content.pics);
      break;
    case 3:
      // TODO: 实现无图片消息
      break;
  }
  htmlText.push(contentHtml);
  // 消息时间和回复按钮
  htmlText.push('<div class="item-ft">');
  htmlText.push('<span class="item-time">' + content.timeString + '</span>');
  htmlText.push('<div class="item-reply-btn">');
  htmlText.push('<span class="item-reply"></span>');
  htmlText.push('</div></div>');
  // 消息回复模块（点赞和评论）
  htmlText.push(replyTpl(messageData.reply));
  htmlText.push('</div></div>');
  return htmlText.join('');
}


/**
 * 页面渲染函数：render
 */
function render() {
  // TODO: 目前只渲染了一个消息（多图片信息）,需要展示data数组中的所有消息数据。
  var messageHtml = [];
  $('.user-name').text(userName);
  for(var i=0 , len=data.length ; i<len ; i++){
    messageHtml.push(messageTpl(data[i],i));
  }
  $momentsList.html(messageHtml);
}
/**
 * 得到点击对象对应的data_index
 * @param {*} _this 传入点击对象参数
 */
function searchID(_this){
  return id = _this.parents('.moments-item').data('index');
}
/**
 * 显示点赞/评论框
 * @param {*} _this 点击对象传入 
 */
function showBtn(_this){
  if($('.item-comment')){
    $('.item-comment').remove();
  }
  var htmlText = [];
  htmlText.push('<div class="item-comment"><p class="item-comment-list item-comment-good"><img src="./img/like.png" width="17px" height="17px">');
  var id = searchID(_this);
  var strLiked = data[id].reply.hasLiked? " 取消":" 点赞";
  htmlText.push(strLiked);
  htmlText.push('</p><p class="item-comment-list item-comment-detail"><img src="./img/comment.png" width="17px" height="17px"> 评论</p></div>');
  $('.item-reply-btn').eq(id).append(htmlText.join(''));
  //如果没有设置时延的话，状态会直接叠加上新的play状态，而初始设置的0状态会被忽略。
  setTimeout(function(){
    $(".item-comment").addClass("item-comment-play");
  }, 0);
}
/**
 * 隐藏点赞/评论框
 */
function hideBtn(){
  if($('.item-comment')){
    $('.item-comment').removeClass("item-comment-play");
  }
}
/**
 * 点赞数据更新
 * @param {*} id 
 */
function likeorNo(id){
  if(data[id].reply.hasLiked){
    data[id].reply.likes.pop(userName);
    }else if(!data[id].reply.hasLiked){
    data[id].reply.likes.push(userName);
  }
  data[id].reply.hasLiked = !data[id].reply.hasLiked; 
}
/**
 * 页面数据重新渲染
 * @param {*} _this  
 * @param {*} id 
 */
function renderingPage(id){
  var replyData = [];
  replyData.push(replyTpl(data[id].reply));
  $('.moments-item').eq(id).find('.reply-zone').remove();
  $('.item-right').eq(id).append(replyData);
}
/**
 * 评论框生成
 */
function commentMake(){
  var input = "<div class='comment-input'><input type='text' placeholder='评论' class='comment-input-text'></input><span class='comment-input-send' onchange='turnGreen'>发送</span></div>";
  $('.page-moments').append(input);
  $('.comment-input-text').focus();
}
/**
 * 评论添加
 * @param {*} id 获得添加的位置
 * @param {*} content 评论内容
 */
function addComment(id , content){
  if(content.length !== 0){
  data[id].reply.comments.push({'author':userName,'text':content});
  renderingPage(id);
  }
}
/**
 * 
 * @param {*} outerdiv 幕布背景
 * @param {*} bigimg 放大图片
 * @param {*} point 目标图片
 */
function imgShow(outerdiv, bigimg, point){
  var src = point.attr('src');
  $(bigimg).attr('src',src);  //获得当前点击图片的src
  $(outerdiv).fadeIn('fast');
}
/**
 * 页面绑定事件函数：bindEvent
 */
var currentID = null;
var usedID = null;
var count = 0;
var commentID = null;
function bindEvent() {
  // TODO: 完成页面交互功能事件绑定
  // 点击弹出点赞/评论框
  $('.item-reply').on('click',function(){
    usedID = currentID;
    currentID = searchID($(this)); 
    if(usedID === null || currentID !== usedID || count === 1){
        hideBtn();
        showBtn($(this));
        count = 0
      }else if(currentID === usedID){
      if(count === 0){
        hideBtn();
        count = 1;
      }
    }
  });
  // 点击其他位置隐藏点赞/评论框
  $(window).on('click',function(ev){
    if(ev.target.className.toLowerCase() !== 'item-reply'){
      $('.item-comment').removeClass('item-comment-play');
      count = 1;
    }
    if(ev.target.className.toLowerCase() !== 'comment-input-text' && !ev.target.classList.contains('item-comment-detail')){
      $('.comment-input').remove();
    }
  });
  // 点赞功能实现
  $(document).on('click','.item-comment-good',function(){
    id = searchID($(this));
    likeorNo(id);
    renderingPage(id);
  });
  // 评论功能实现
  $(document).on('click','.item-comment-detail',function(){
    commentID = searchID($(this));
    commentMake();
    var input = document.querySelector('.comment-input-text');
    //实时监听input内输入,实现按键变色
    $(document).bind('input','.comment-input-text',function(){
      if($('.comment-input-text').val().length !== 0){
          $('.comment-input-send').css("background-color","rgb(69, 176, 14)");
        }else{
          $('.comment-input-send').css("background-color","rgb(250, 248, 250)");
        }
    })
  })
  // input的内容通过click和回车事件触发，并渲染到页面中
  $(document).on('click','.comment-input-send',function(){
    if($('.comment-input-text').val() !== ''){
    addComment(commentID,$('.comment-input-text').val());
    }
  });
  $(document).keyup(function(event){
    if(event.keyCode === 13 && $('.comment-input-text').val() !== ''){
      if($('.comment-input')){
        addComment(commentID,$('.comment-input-text').val());
        $('.comment-input').remove();
      }
    }
  })
  //点击放大图片事件添加
  $('.outerdiv').hide();
  $('.pic-item').on('click',function(){
    imgShow('.outerdiv','.bigimg', $(this));
  });
  $('.item-only-img').on('click',function(){
    imgShow('.outerdiv','.bigimg',$(this));
  });
  $('.outerdiv').on('click',function(){
    $(this).fadeOut('fast');
  })
}

/**
 * 页面入口函数：init
 * 1、根据数据页面内容
 * 2、绑定事件
 */
function init() {
  // 渲染页面
  render();
  bindEvent();
}

init();