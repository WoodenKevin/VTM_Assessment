#学习日志

---

##20190322

- 进度
    - 顶部悬浮条（后面统称.top）已基本做好，正在考虑.top中间的“欢迎来到热泉港!”是否要做成滚动样式。
- 遇到的问题
    1. 垂直居中
        由于.top的position属性为fixed，以前掌握的垂直居中方法无法使用
        ```css
        parent
            {
            position: relative;
            }
        child
        {
            height: 100px;
            margin: -50px;
            top: 50%
            position: absolute;
        }
        ```
        - 解决方法：.top内子元素的**display属性设为flex**，**align-items属性设为center**
        ```CSS
        .top div
        {
            ...
            display: flex;
            align-items: center;
        }
        ```
    2. body和.top的宽度设为100%、.top设置padding后会有元素超出宽度的情况
        - 解决方法：
            - .top宽度设为100%，**box-sizing属性设为border-box**
            - box-sizing属性设为border-box后，**元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制**。
        ```css
        .top
        {
            width: 100%;
            ...
            box-sizing: border-box; 
        }
        ```
    3. .top元素会被后面的元素遮挡       
        - 解决方法
            - **z-index 属性设置元素的堆叠顺序**。**拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面**。
            - 元素的 z-index 属性值默认为0。
            - 元素可拥有负的 z-index 属性值。
            - z-index 仅能在定位元素上奏效（例如 position:absolute;）。
        ```CSS
        .topbg
        {
            ...
            /* 考虑到设计稿中侧边也有悬浮板块 */
            /* 故网页整体的堆叠优先级应有3级（2、1、0）。 */
            z-index: 2;
        }
        ```
- 接下来的计划
    - 明日实现
        - 设计稿中的大部分元素
    - 争取实现
        - 弹窗、标签页、回到顶部等需JavaScript的效果

---

##20190323

- 进度
    - 实现了网页中的大部分元素
- 遇到的问题
    1. 顶端悬浮条设为fixed后，其它元素仍重顶端开始排列，造成顶部被遮挡。解决方法：把其余元素丢进一个div，设置transform: translateY()向下偏移悬浮条高度。
    2. 制作banner背景图时，原本的思路是使用伪元素实现div元素自适应图片大小，但效果并不理想，在添加上搜索框后布局就乱了。后来改为div中直接添加img元素以及包含全部搜索框的一个div元素，最外层的div的高度改为auto适应img元素高度，搜索框div则将其position属性设为relative，并设置z-index及top属性固定其位置。（对伪类/伪元素的运用还不大熟练可能是原因，重新复习中）
- 接下来的计划
    - 明日实现
        - 弹窗、标签页、回到顶部等需JavaScript的效果
    - 争取实现
        - 适配移动端/响应式布局

---

##20190324

- 进度
    - 实现了“更多资讯”板块中标签页切换效果。
    - 实现了侧边悬浮条中二维码弹窗的效果。
    - 更新了部分链接的样式
    - 搜索框的提示文本由采用value属性实现改为采用placeholder实现，实现了在搜索框输入文本时提示文本自动消失的效果。
    - 优化了网页布局
- 学习进度
    - 继续学习了解 HTML DOM
- 遇到的问题
    1. 制作标签页切换的效果时，所涉及到的HTML代码中有着众多不同的class、id，而所用的JavaScript代码又高度依赖Id/ClassName/TagName。实际操作中，我感到正确地给元素赋予Id/ClassName/TagName，避免冲突，是非常重要的。特别是标签栏，在经过了数次实验后，从原先的使用无序列表实现转为使用div实现也是考虑到了这一点。
    2. 把document.get**Element**ById()写成document.get**Elements**ById()。
       ```JavaScript
       // HTML DOM Document 对象属性
       // get"Elements"
       document.getElementsByClassName()
       document.getElementsByTagName()
       document.getElementsByName()
       // get"Element"
       document.getElementById()
       ```
    3. 制作二维码弹窗效果时，原先所用的JavaScript代码如下：
       ```JavaScript
       function showpopup()
       {
            document.getElementsByClassName('popup').style.display = 'block';
       }
       function hidepopup()
       {
            document.getElementsByClassName('popup').style.display = 'none';
       }
       ```
       结果Chrome浏览器报错，显示：
       `Uncaught TypeError: Cannot set property 'display' of undefined`
       - 原因： getElementsByClassName() 方法返回文档中所有指定类名的**元素集合**，而不是元素。
       - 解决方法： 以该Demo为例，类名为“popup”的元素只有一个，故在getElementsByClassName('popup')后加上[0]即可。
       - 改进后的代码：
         ```JavaScript
         function showpopup()
         {
            document.getElementsByClassName('popup')[0].style.display = 'block';
         }
         function hidepopup()
         {
            document.getElementsByClassName('popup')[0].style.display = 'none';
         }
         ```
- 接下来的计划
    - 明日实现
        - 侧边悬浮条中返回页面顶部的效果。
        - 根据微软雅黑重新适配字重。（目前是基于思源黑体）
    - 争取实现
        - 适配移动端/响应式布局

---

##20190325

- 进度
    - 确认了原字重方案可以适配微软雅黑及思源黑体。
    - 实现了侧边悬浮条中返回页面顶部的效果，并用原生JavaScript实现了返回顶部时得缓冲动画。
- 学习的进度
    - 了解了JS 计时事件
- 遇到的问题
- 笔记
    - 微软雅黑字重
        - Light: 100, 200, 300, lighter;
        - Regular: 400, 500, normal, initial, unset;
        - Bold: 600, 700, 800, 900, bold, bolder;
    - 思源黑体字重
        - ExtraLight: 100, 200;
        - Light: 300;
        - Normal: ？？？;
        - Regular: 400, normal, initial, unset;
        - SemiBold: 500;
        - Bold: 600, 700, bold, bolder;
        - Heavy: 800, 900;
- 接下来的计划
    - 争取明日实现
        - 适配移动端/响应式布局

---

##20190326 - 20190327

- 进度
    - 使用媒体查询适配较低分辨率下的网页布局
        - 注：仅在原来的布局基础上针对个别元素的大小等进行适配，仍为转用Grid布局和采用em/rem等单位，最终效果个人感受较为一般。
    - 优化网页布局
- 学习进度
    - 了解了静态布局、自适应布局、流式布局、响应式布局、弹性布局等的概念和区别
    - 了解了rem、em、px这三个单位的区别
    - 了解了Grid布局
- 遇到的问题
    - 在这两天中，我仅仅适配了三种屏幕宽度，但感觉工作量就已经十分巨大。在之前的CSS中，我在一些地方混用了px和百分比，这也使我在这两天的适配工作中还得重新统一单位。另外，虽然有了解了各种单位和布局的区别，但对于要在什么具体的情况下运用具体的单位、布局，我还是需要做进一步了解。
- 接下来的计划
    - 继续优化适配
    - 争取适配移动端

---

## 20190328 - 20190330

- 进度
    - 补全了网页中链接激活变色效果
    - 优化返回顶部功能
        - 解决了重复点击返回顶部按钮导致定时器重复定义的问题
        - 禁止了返回顶部过程中鼠标的滚动事件
        - 增加了对起始位置的判断
    - 实现了HTML和JavaScript的分离
    - 由于时间有限，以及对相关知识的掌握还不够全面，经过仔细考虑，放弃全面转为flex布局、转用rem及适配移动端的计划
- 学习进度
    - 深入了解了flex布局，但对flex兼容性问题还未完全掌握
    - 研读《JavaScript DOM 编程艺术》，对DOM有了更深入的了解，特别是书里提到的“平稳退化、渐进增强”的理念给我的印象颇深。
- 遇到的问题
    1. 优化返回顶部功能时，我用了几行代码判断当用户按下“回到顶部”按钮时，先判断当前滚动条的高度，若已达顶部，则直接退出函数：
        ```JavaScript
        if (document.body.scrollTop || document.documentElement.scrollTop == 0)
        {
            return false;
        }
        ```
        - 判断条件写为` document.body.scrollTop || document.documentElement.scrollTop == 0 `的原因是之前在网上看到了“`document.body`和`document.documentElement`中只有一个有值，而Chrome只认”的说法。
        但保存后却发现Chrome能正常运行，而Edge却无法返回顶部。
        - 在函数内添加以下代码：
            ```JavaScript
            alert("body: " + document.body.scrollTop);
            alert("documentElement: " + document.documentElement.scrollTop);
            ```
            发现无论Chrome还是Edge，`document.body`和`document.documentElement`始终有值，只不过Chrome下`document.body.scrollTop`始终为0，Edge下`document.documentElement.scrollTop`始终为0。
        - 经过一番仔细查询，得知不是“只有一个有值”，而是“**只有一个能取到值，此时另一个值为0**”；而至于在哪个浏览器中能取哪个值，实际结果貌似与目前在网上查询的结果是相反的，***有待进一步考证***。
        - 最终代码的判断条件由原先的或运算改为并运算：
            ```JavaScript
            if (document.body.scrollTop && document.documentElement.scrollTop == 0)
            {
                return false;
            }
            ```
- 存在的问题
    - 布局效果看起来可能还行，但存在不同布局混用问题
    - 目前仅在Chrome和Edge上测试，对于其它浏览器的显示效果还未验证
    - Chrome缩放到50%以下会存在布局混乱问题（经测试，许多网站在Chrome缩放到50%以下时大都出现布局混乱。网上存在使用rem就能避免此问题的说法，但经局部测试好像并没能解决。***待后续继续查证***）
    - 对不同浏览器的兼容性十分欠佳
- 接下来的计划
    - 虽然在10天的期限内，我已做出了基本符合设计稿的网站，并不断改进，但因时间关系，仍有一些遗憾。无论最后能不能通过考核，我都会更深入了解以下的这几点，并在此DEMO或其它DEMO上进行实践：
        - “平稳退化、渐进增强”
        - 各浏览器的兼容问题
        - flex/grid布局
        - 响应式布局
        - 《JavaScript 高级编程》
        - 性能更好的定时器requestAnimationFrame
        - ......
    - 解决上述提到的尚且存在的问题