# vwrem

一个基于 **vw** + **rem** 适配布局的解决方案。灵感来源于 [lib-flexible](https://github.com/amfe/lib-flexible)。lib-flexible 的原理来源于 **vw** 思想。

> lib-flexible: 由于 viewport 单位得到众多浏览器的兼容，lib-flexible 这个过渡方案已经可以放弃使用，不管是现在的版本还是以前的版本，都存有一定的问题。建议大家开始使用 viewport 来替代此方案。

如果全使用 **vw** 来布局会失去`max-width`, `min-width`的限制。如果将 **vw** + **rem** 结合呢？

我们都知道 **rem** 是参考 HTML 元素的 `font-size` 来计算大小。而 **vw** 是参考 `viewport` 大小进行计算。如果将 HTML 的 `font-size` 的大小设置为 `vw`，让其随着 `viewport` 的大小变化而变化。再结合 **rem** 布局方式，这样不仅能达到自适应布局目的，而且还能控制`max-width`, `min-width`。

```css
html {
  font-size: 10vw;
}
```

> singsong: 为什么要设置`font-size: 10vw;`，这是由于浏览器对 `font-size` 有最小值限制。

## 设计

本方案，首先会检测浏览器是否支持 `vw`。如果支持会结合 `MAX_WIDTH`、`MIN_WIDTH` 参数来设置 HTML 元素的 `font-size`。反之，则模拟 `vw` 工作方式。

## 使用
- 将代码直接引入 `<head></head>`
```HTML
<head><script src="/vwrem.js" ></script></head>
```
- 使用 `rem` 布局

```css
/* 假如设计稿 750px */
/* 除以10，将 viewport 分成 10 等分 */
$vw_fontsize: 750 / 10;
@function px2rem($px) {
     @return ($px / $vw_fontsize ) * 1rem;
}
```
