
# 图片上传预览
```
imageSelector.addEventListener('change', (event) => {
  const file = event.target.files[0]; 
  const url = URL.createObjectURL(file);
  imagePreview.src = url;
});
```

canvas对象用toDataURL()给转成base64，然后传输给服务器处理。但是实际上，canvas除了可以toDataURL，也可以直接用toBlob转成二进制对象。如果你的服务器能直接处理二进制数据，那没必要转base64，直接传二进制，不但传输的数据更小，服务器也不需要额外转换，处理起来更快。

创建一个256 * 256的图片并转换成Blob，添加到img标签中。
```
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

const width = 256;
const height = 256;

canvas.width = width;
canvas.height = height;

const bufferData = new Uint8ClampedArray(width * height * 4);
for(let i = 0; i < 256; i++) {
  for(let j = 0; j < 256; j++) {
    const idx = i * 256 + j;
    bufferData[idx * 4] = i;
    bufferData[idx * 4 + 1] = 255 - i;
    bufferData[idx * 4 + 3] = 255;
  }
}
context.putImageData(new ImageData(bufferData, width, height), 0, 0);

canvas.toBlob((blob) => {
  const image = new Image();
  image.width = width;
  image.height = height;
  document.body.append(image);
  image.src = URL.createObjectURL(blob);
});
```