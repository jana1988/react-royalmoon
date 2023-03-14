import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * 导出PDF
 * @param {导出后的文件名} title
 * @param {要导出的dom节点：react使用ref} ele
 */
export default async (title, el) => {
  const ele = el.firstChild.firstChild;

  // 根据dpi放大，防止图片模糊
  const scale = 1;
  // 下载尺寸 a4 纸 比例
  let pdf = new jsPDF("p", "pt", "a4");
  let width = ele.offsetWidth;
  let height = ele.offsetHeight;

  const canvas = document.createElement("canvas");
  canvas.width = width * scale;
  canvas.height = height * scale;
  var contentWidth = canvas.width;
  var contentHeight = canvas.height;

  //一页pdf显示html页面生成的canvas高度;
  var pageHeight = (contentWidth / 592.28) * 841.89;
  //未生成pdf的html页面高度
  var leftHeight = contentHeight;
  //页面偏移
  var position = 0;
  //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
  var imgWidth = 595.28;
  var imgHeight = (592.28 / contentWidth) * contentHeight;

  // // 缩放为 a4 大小  pdfpdf.internal.pageSize 获取当前pdf设定的宽高
  // height = (height * pdf.internal.pageSize.getWidth()) / width;
  // width = pdf.internal.pageSize.getWidth();

  // if (height > 9000) {
  //   // 超出jspdf高度限制时
  //   const ratio = height / 9000;
  //   // height = 14400;
  //   width = width / ratio;
  // }

  const pdfCanvas = await html2canvas(ele, {
    useCORS: true,
    canvas,
    scale,
    width,
    height,
    x: 0,
    y: 0,
    allowTaint: true,
    backgroundColor: "#211d3b",
  });
  const imgDataUrl = pdfCanvas.toDataURL();
  if (leftHeight < pageHeight) {
    pdf.addImage(imgDataUrl, "png", 0, 0, imgWidth, imgHeight);
  } else {
    // 分页
    while (leftHeight > 0) {
      pdf.addImage(imgDataUrl, "png", 0, position, imgWidth, imgHeight);
      leftHeight -= pageHeight;
      //避免添加空白页
      if (leftHeight > 841.89) {
        position -= 841.89;
        pdf.addPage();
      }
    }
  }
  // 导出下载
  await pdf.save(`${title}.pdf`);
};
