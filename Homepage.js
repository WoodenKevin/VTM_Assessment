/*** 二维码弹窗 ***/

// 显示弹窗
function showpopup()
{
    var popup = document.getElementsByClassName('popup')[0];
    popup.style.display = 'block';
}

// 隐藏弹窗
function hidepopup()
{
    var popup = document.getElementsByClassName('popup')[0];
    popup.style.display = 'none';
}

// 定义onmouseover和onmouseout事件
function preparepopup()
{
    var button1 = document.getElementById('qrbutton');
    button1.onmouseover = showpopup;
    button1.onmouseout = hidepopup;
}


/*** 回到顶部 ***/

// 利用一个变量判断定时器是否清除，避免因按钮重复点击而重复定义定时器
var clicked = false;

// 利用定时器实现缓冲动画
function backtotopwithanimation()
{
    // 返回与顶部的距离
    var top = document.body.scrollTop || document.documentElement.scrollTop; 
    // 使与顶部距离的递减值逐渐减小，达到缓冲动画效果
    // 除数越大，返回顶部的整体速度越慢
    var speed = top / 5;

    if (document.body.scrollTop != 0) 
    {
        // 与顶部的距离逐渐减小
        document.body.scrollTop -= speed;
    }
    else
    {
        document.documentElement.scrollTop -= speed;
    }

    if (top == 0)
    {
        // 返回顶部后，清除定时器
        clearInterval(timer);
        // 定时器已清除
        clicked = false;
        // 解除禁止鼠标滚动
        window.onwheel = function(){
            return true;
        }
    }
}

function backtotop()
{   
    // 判断是否已达顶部
    if (document.body.scrollTop == 0 && document.documentElement.scrollTop == 0)
    {
        return false; // 已达顶部，不执行函数
    }
    // 定时器未定义或已清除才执行
    if (!clicked)
    {
        // 定义一个定时器
        timer = setInterval("backtotopwithanimation()", 20); 
        // 定时器已定义
        clicked = true;
        // 定时器生效期间，禁止鼠标滚动
        window.onwheel = function(){
            return false;
        }
    }
}

// 定义onclick事件
function preparebacktotop()
{
    var button3 = document.getElementById('backtotopbutton');
    button3.onclick = backtotop;
}


/* 简讯标签页切换 */

function changetab(index)
{
    var categories = document.getElementsByClassName('category');
    var tabs = categories[0].getElementsByTagName('div');
    var briefs = document.getElementsByClassName('briefs')
    var contents = briefs[0].getElementsByClassName('brief');
    
    for (var i = 0; i < tabs.length; i++)
    {
        if (i == index)
        {
            tabs[i].id = 'activetab';
            contents[i].className = 'showbrief brief';
        }
        else
        {
            tabs[i].id = 'commontab';
            contents[i].className = 'hiddenbrief brief';
        }
    }
}

// 定义onmouseover事件
function preparechangetab()
{
    var categories = document.getElementsByClassName('category');
    var tabs = categories[0].getElementsByTagName('div');
    
    tabs[0].onmouseover = function(){
        changetab(0);
    }
    tabs[1].onmouseover = function(){
        changetab(1);
    }
    tabs[2].onmouseover = function(){
        changetab(2);
    }
    tabs[3].onmouseover = function(){
        changetab(3);
    }
}


/* 页面全部加载完成后再加载 */

window.onload = function(){
    preparepopup();
    preparebacktotop();
    preparechangetab();
}