export default async function getScreenshotDataUrl(viewer) {
  const markupExt = await viewer.getExtension('Autodesk.Viewing.MarkupsCore')
  return new Promise(function (resolve) {
    // eslint-disable-next-line no-undef
    const canvas = document.createElement('canvas')
    // eslint-disable-next-line no-undef
    const view3DContainer = document.getElementById('viewer')
    const width = view3DContainer.offsetWidth
    const height = view3DContainer.offsetHeight

    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d')
    // eslint-disable-next-line no-undef
    const image = new Image()
    image.onload = function () {
      context.drawImage(image, 0, 0)
      markupExt.renderToCanvas(context, function () {
        resolve(canvas.toDataURL('image/png'))
      })
    }
    viewer.getScreenShot(width, height, (blob) => (image.src = blob))
  })
}
