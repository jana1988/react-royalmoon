import html2canvas from "html2canvas"; // 导入此依赖
export default (dom) => {
  // 定义打印方法
  html2canvas(dom, {
    scale: 2,
    width: dom.offsetWidth,
    height: dom.offsetHeight,
  }).then((canvas) => {
    const context = canvas.getContext("2d");
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
    const src64 = canvas.toDataURL();
    const contentWidth = canvas.width;
    const contentHeight = canvas.height;
    const imgWidth = 800; // 根据纸张宽度设定
    const imgHeight = (800 / contentWidth) * contentHeight;
    const img = new Image();
    const div = document.createElement("div");
    div.appendChild(img);
    img.setAttribute("src", src64);
    img.setAttribute("width", imgWidth);
    img.setAttribute("height", imgHeight);
    img.setAttribute("id", "imgs");
    div.setAttribute("id", "printImg");
    document.body.appendChild(div);
    window.document.body.innerHTML =
      window.document.getElementById("printImg").innerHTML;
    img.onload = () => {
      window.print(); // 调用浏览器打印
      window.location.reload();
    };
  });
};
