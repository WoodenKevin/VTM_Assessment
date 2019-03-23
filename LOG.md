#学习日志

---

##20190322

- 进度
    - 顶部悬浮条（后面统称.top）已基本做好，正在考虑.top中间的“欢迎来到热泉港!”是否要做成滚动样式。
- 遇到的问题
    - 垂直居中
        - 由于.top的position属性为fixed，以前掌握的垂直居中方法无法使用
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
        - body和.top的宽度设为100%、.top设置padding后会有元素超出宽度的情况
        - .top元素会被后面的元素遮挡
- 目前的解决方法
    - 垂直居中的问题
        - .top内子元素的**display属性设为flex**，**align-items属性设为center**
        ```CSS
        .top div
        {
            ...
            display: flex;
            align-items: center;
        }
        ```
    - 元素超出宽度的问题
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
    - 元素遮挡的问题
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

---

##20190323