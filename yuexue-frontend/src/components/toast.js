export default function Toast(message, duration) {
  duration = isNaN(duration) ? 3000 : duration
  let toast = document.createElement('div')
  let text = document.createElement('span')
  text.innerText = message
  text.style.cssText = 'background: #000; opacity: 0.5; border-radius: 3px; padding: 5px;'
  toast.appendChild(text)
  toast.style.cssText = 'height: 40px; line-height: 40px; color: #fff; text-align: center; position:fixed;' +
                        'bottom: 50px; z-index:99999; font-size: 12px; width: 100%'
  document.body.appendChild(toast)
  setTimeout(() => {
    toast.style.webkitTransition = '-webkit-transform 0.3s, opacity 0.3s'
    toast.style.transition = 'transform 0.3s, opacity 0.3s'
    toast.style.opacity = '0'
    toast.addEventListener('webkitTransitionEnd', () => {
      document.body.removeChild(toast)
      toast = null
    })
    toast.addEventListener('transitionend', () => {
      document.body.removeChild(toast)
      toast = null
    })
  }, duration)
}
