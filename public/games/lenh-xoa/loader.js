/* Runtime shell for the single-threaded Godot Web export. */
(async () => {
  const canvas = document.getElementById('canvas')
  const overlay = document.getElementById('loading')
  const status = document.getElementById('status')
  const details = document.getElementById('details')
  const progress = document.getElementById('progress')
  const notify = (type, extra = {}) => {
    if (parent !== window) parent.postMessage({ source: 'lenh-xoa', type, ...extra }, location.origin)
  }
  document.getElementById('retry').onclick = () => location.reload()
  canvas.addEventListener('contextmenu', (event) => event.preventDefault())
  const fail = (error) => {
    const message = error instanceof Error ? error.message : String(error)
    console.error('Lệnh Xóa:', message)
    overlay.hidden = false
    status.textContent = 'Không thể khởi động game.'
    details.textContent = message + ' Hãy thử Chrome hoặc Edge trên máy tính, bật tăng tốc đồ họa và tải lại.'
    progress.hidden = true
    document.getElementById('retry').hidden = false
    notify('error', { message: details.textContent })
  }
  try {
    const missing = Engine.getMissingFeatures({ threads: false })
    if (missing.length) throw new Error(missing.join(', '))
    if (!('DecompressionStream' in window)) throw new Error('Trình duyệt chưa hỗ trợ giải nén dữ liệu game.')
    const leaderboardConfig = await fetch('leaderboard-config.json', { cache: 'no-cache' })
    if (leaderboardConfig.ok) window.lenhXoaLeaderboardConfig = await leaderboardConfig.json()
    const manifestResponse = await fetch('runtime.json', { cache: 'no-cache' })
    if (!manifestResponse.ok) throw new Error('Không tìm thấy bản game (' + manifestResponse.status + ').')
    const manifest = await manifestResponse.json()
    const engine = new Engine({
      ...manifest.engine,
      canvas,
      onPrint: (...args) => console.log(...args),
      onPrintError: (...args) => console.error(...args),
      onExit: () => notify('exited'),
    })
    const download = async () => {
      const response = await fetch(manifest.pack.file)
      if (!response.ok || !response.body) throw new Error('Không tải được dữ liệu game (' + response.status + ').')
      const reader = response.body.getReader()
      const chunks = []
      let received = 0
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        chunks.push(value)
        received += value.length
        progress.value = Math.min(received / manifest.pack.downloadBytes, 1)
        status.textContent = 'Đang tải game: ' + (received / 1048576).toFixed(1) + ' / ' + (manifest.pack.downloadBytes / 1048576).toFixed(1) + ' MB'
      }
      status.textContent = 'Đang mở khu liên hợp Haneul…'
      progress.removeAttribute('value')
      const blob = new Blob(chunks)
      const alreadyDecoded = response.headers.get('content-encoding')?.includes('gzip')
      const body = alreadyDecoded ? blob.stream() : blob.stream().pipeThrough(new DecompressionStream('gzip'))
      const buffer = await new Response(body).arrayBuffer()
      if (buffer.byteLength !== manifest.pack.uncompressedBytes) throw new Error('Dữ liệu game chưa tải đủ. Hãy tải lại.')
      return buffer
    }
    const [pack] = await Promise.all([download(), engine.init('index')])
    engine.copyToFS('index.pck', pack)
    const args = ['--main-pack', 'index.pck']
    // Explicit save-disabled diagnostic mode used by the integration check.
    if (new URLSearchParams(location.search).get('smoke') === '1') args.push('--', '--night-smoke')
    await engine.start({ args })
    overlay.hidden = true
    canvas.focus()
    notify('ready')
  } catch (error) { fail(error) }
})()
