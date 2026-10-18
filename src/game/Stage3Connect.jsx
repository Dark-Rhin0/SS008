import { useLayoutEffect, useRef, useState } from 'react'

const BRANCHES = [
  {
    id: 'economy',
    title: 'NHÁNH 1: LẬP LUẬN KINH TẾ',
    nodes: [
      'Áp lực kinh tế',
      'Trụ cột bán dẫn',
      'SAMSUNG',
      'LEE JAE-YONG',
      'Đặc xá kinh tế',
    ],
  },
  {
    id: 'justice',
    title: 'NHÁNH 2: LO NGẠI PHÁP QUYỀN',
    nodes: [
      'LEE JAE-YONG',
      'Kết án hối lộ',
      'Nguyên tắc pháp quyền',
      'Tranh cãi dư luận',
    ],
  },
]

const shuffle = (items) => {
  const shuffled = [...items]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
  }
  return shuffled
}

const getBoundaryPoint = (rect, toward) => {
  const center = {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  }
  const dx = toward.x - center.x
  const dy = toward.y - center.y
  const scale = Math.max(Math.abs(dx) / (rect.width / 2), Math.abs(dy) / (rect.height / 2), 1)
  return { x: center.x + dx / scale, y: center.y + dy / scale }
}

const curvePath = (start, end, verticalBendDirection = 1) => {
  const dx = end.x - start.x
  const dy = end.y - start.y
  const isHorizontal = Math.abs(dx) >= Math.abs(dy)
  const bend = Math.max(36, (isHorizontal ? Math.abs(dx) : Math.abs(dy)) * 0.38)
  const sideBend = Math.min(30, Math.max(20, Math.abs(dy) * 0.24)) * verticalBendDirection
  const control1 = isHorizontal
    ? { x: start.x + dx * 0.35, y: start.y - Math.min(48, Math.max(30, Math.abs(dx) * 0.35)) }
    : { x: start.x + sideBend, y: start.y + Math.sign(dy || 1) * bend }
  const control2 = isHorizontal
    ? { x: end.x - dx * 0.35, y: end.y - Math.min(48, Math.max(30, Math.abs(dx) * 0.35)) }
    : { x: end.x + sideBend, y: end.y - Math.sign(dy || 1) * bend }
  return `M ${start.x} ${start.y} C ${control1.x} ${control1.y}, ${control2.x} ${control2.y}, ${end.x} ${end.y}`
}

export default function Stage3Connect({ onNext }) {
  const [connections, setConnections] = useState(() => ({
    economy: [0],
    justice: [0],
  }))
  const [layouts] = useState(() => Object.fromEntries(
    BRANCHES.map((branch) => [branch.id, shuffle(branch.nodes.map((_, index) => index))])
  ))
  const [lines, setLines] = useState({})
  const [dragging, setDragging] = useState(null)
  const [keyboardSource, setKeyboardSource] = useState(null)
  const [feedback, setFeedback] = useState('Kéo đầu dây từ điểm bắt đầu đến mắt xích kế tiếp để nối chuỗi.')
  const boardRef = useRef(null)
  const branchRefs = useRef(new Map())
  const nodeRefs = useRef(new Map())
  const handleRefs = useRef(new Map())

  const isCompleted = BRANCHES.every((branch) => (
    connections[branch.id].length === branch.nodes.length
  ))

  useLayoutEffect(() => {
    const measureLines = () => {
      const nextLines = {}
      BRANCHES.forEach((branch) => {
        const branchElement = branchRefs.current.get(branch.id)
        const branchRect = branchElement?.getBoundingClientRect()
        if (!branchElement || !branchRect) return

        const svgRect = branchElement.querySelector('.stage3-wires')?.getBoundingClientRect()
        const origin = { x: svgRect?.left ?? branchRect.left, y: svgRect?.top ?? branchRect.top }
        const links = connections[branch.id]
        nextLines[branch.id] = links.slice(0, -1).map((sourceIndex, linkIndex) => {
          const targetIndex = links[linkIndex + 1]
          const sourceNode = branchElement.querySelector(`[data-wire-node="${sourceIndex}"]`)
          const targetNode = branchElement.querySelector(`[data-wire-node="${targetIndex}"]`)
          if (!sourceNode || !targetNode) return null

          const sourceRect = sourceNode.getBoundingClientRect()
          const targetRect = targetNode.getBoundingClientRect()
          const sourceCenter = {
            x: sourceRect.left + sourceRect.width / 2,
            y: sourceRect.top + sourceRect.height / 2,
          }
          const targetCenter = {
            x: targetRect.left + targetRect.width / 2,
            y: targetRect.top + targetRect.height / 2,
          }
          const start = getBoundaryPoint(sourceRect, targetCenter)
          const end = getBoundaryPoint(targetRect, sourceCenter)
          return {
            key: `${branch.id}-${sourceIndex}-${targetIndex}`,
            path: curvePath(
              { x: start.x - origin.x, y: start.y - origin.y },
              { x: end.x - origin.x, y: end.y - origin.y },
              (sourceCenter.x + targetCenter.x) / 2 - origin.x < branchRect.width / 2 ? 1 : -1
            ),
          }
        }).filter(Boolean)
      })
      setLines(nextLines)
    }

    measureLines()
    const observer = new ResizeObserver(measureLines)
    if (boardRef.current) observer.observe(boardRef.current)
    branchRefs.current.forEach((element) => observer.observe(element))
    nodeRefs.current.forEach((element) => observer.observe(element))
    handleRefs.current.forEach((element) => observer.observe(element))
    window.addEventListener('resize', measureLines)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measureLines)
    }
  }, [connections, layouts])

  const connectNode = (branch, targetIndex, sourceIndex = connections[branch.id].at(-1)) => {
    if (sourceIndex === undefined || sourceIndex !== connections[branch.id].at(-1)) return
    const expectedIndex = sourceIndex + 1
    if (targetIndex !== expectedIndex) {
      setFeedback(`Chưa đúng mắt xích tiếp theo của "${branch.title}". Hãy thử một ô khác.`)
      setKeyboardSource(null)
      return
    }

    setConnections((current) => ({
      ...current,
      [branch.id]: [...current[branch.id], targetIndex],
    }))
    setKeyboardSource(null)
    setFeedback(`Đã nối thành công: ${branch.nodes[targetIndex]}. Đầu dây mới đã sẵn sàng.`)
  }

  const beginDrag = (event, branch, sourceIndex) => {
    if (sourceIndex !== connections[branch.id].at(-1)) return
    event.preventDefault()
    event.stopPropagation()
    const boardRect = boardRef.current.getBoundingClientRect()
    setDragging({
      branchId: branch.id,
      sourceIndex,
      x: event.clientX - boardRect.left,
      y: event.clientY - boardRect.top,
    })
    setKeyboardSource(null)
  }

  const moveDrag = (event) => {
    if (!dragging) return
    const boardRect = boardRef.current.getBoundingClientRect()
    setDragging((current) => current && ({
      ...current,
      x: event.clientX - boardRect.left,
      y: event.clientY - boardRect.top,
    }))
  }

  const endDrag = (event) => {
    if (!dragging) return
    const target = document.elementFromPoint(event.clientX, event.clientY)
      ?.closest('[data-chain-branch][data-chain-index]')
    const branch = BRANCHES.find((item) => item.id === dragging.branchId)
    if (branch && target?.dataset.chainBranch === branch.id) {
      connectNode(branch, Number(target.dataset.chainIndex), dragging.sourceIndex)
    } else {
      setFeedback('Thả đầu dây lên ô mắt xích tiếp theo trong cùng một chuỗi.')
    }
    setDragging(null)
  }

  const activeBranch = dragging && BRANCHES.find((branch) => branch.id === dragging.branchId)
  const activeHandle = dragging && handleRefs.current.get(`${dragging.branchId}-${dragging.sourceIndex}`)
  const activeBranchElement = dragging && branchRefs.current.get(dragging.branchId)
  let previewPath = null
  if (activeHandle && activeBranchElement && boardRef.current) {
    const boardRect = boardRef.current.getBoundingClientRect()
    const branchRect = activeBranchElement.getBoundingClientRect()
    const handleRect = activeHandle.getBoundingClientRect()
    const start = {
      x: handleRect.left + handleRect.width / 2 - branchRect.left,
      y: handleRect.top + handleRect.height / 2 - branchRect.top,
    }
    const end = {
      x: dragging.x + boardRect.left - branchRect.left,
      y: dragging.y + boardRect.top - branchRect.top,
    }
    previewPath = curvePath(start, end)
  }

  return (
    <div className="stage3-investigation">
      <h2 className="stage3-heading">MÀN 3: NỐI CÁC MẮT XÍCH</h2>
      <p className="stage3-instructions">
        Kéo đầu dây từ điểm bắt đầu đến mắt xích kế tiếp. Các mối nối đúng sẽ mở ra đầu dây mới.
      </p>
      <div className="stage3-feedback" role="status" aria-live="polite">{feedback}</div>

      <div
        className="branches-grid stage3-branches"
        ref={boardRef}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={() => setDragging(null)}
      >
        {BRANCHES.map((branch) => {
          const branchConnections = connections[branch.id]
          const sourceIndex = branchConnections.at(-1)
          const complete = branchConnections.length === branch.nodes.length

          return (
            <section
              key={branch.id}
              className={`branch-column stage3-branch ${dragging?.branchId === branch.id ? 'is-wiring' : ''} ${complete ? 'is-complete' : ''}`}
              ref={(element) => {
                if (element) branchRefs.current.set(branch.id, element)
                else branchRefs.current.delete(branch.id)
              }}
              aria-label={branch.title}
            >
              <h3>{branch.title}</h3>
              <p className="stage3-branch-hint">
                {complete ? 'CHUỖI ĐÃ KHÉP LẠI' : `${branchConnections.length}/${branch.nodes.length} MẮT XÍCH ĐÃ NỐI`}
              </p>

              <svg className="stage3-wires" aria-hidden="true">
                <defs>
                  <filter id={`wire-glow-${branch.id}`} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                {(lines[branch.id] || []).map((line) => (
                  <g key={line.key} className="stage3-wire-drawn" filter={`url(#wire-glow-${branch.id})`}>
                    <path className="stage3-wire-halo" d={line.path} />
                    <path className="stage3-wire-line" d={line.path} />
                  </g>
                ))}
                {dragging?.branchId === branch.id && previewPath && (
                  <path className="stage3-wire-preview" d={previewPath} />
                )}
              </svg>

              <div className="stage3-node-grid">
                {layouts[branch.id].map((nodeIndex) => {
                  const isConnected = branchConnections.includes(nodeIndex)
                  const isCurrent = sourceIndex === nodeIndex && !complete
                  const isTarget = keyboardSource?.branchId === branch.id
                  return (
                    <div
                      key={`${branch.id}-${nodeIndex}`}
                      data-wire-node={nodeIndex}
                      className={`stage3-node-wrap ${isConnected ? 'connected' : ''} ${isCurrent ? 'current' : ''} ${nodeIndex === 0 ? 'start-node' : ''}`}
                      ref={(element) => {
                        const key = `${branch.id}-${nodeIndex}`
                        if (element) nodeRefs.current.set(key, element)
                        else nodeRefs.current.delete(key)
                      }}
                    >
                      <button
                        type="button"
                        className="dot-node stage3-node"
                        data-chain-branch={branch.id}
                        data-chain-index={nodeIndex}
                        aria-label={`${isConnected ? 'Đã nối' : 'Mắt xích'}: ${branch.nodes[nodeIndex]}${nodeIndex === 0 ? ', điểm bắt đầu' : ''}`}
                        aria-pressed={isConnected}
                        onClick={() => {
                          if (keyboardSource?.branchId === branch.id) {
                            connectNode(branch, nodeIndex, keyboardSource.sourceIndex)
                          }
                        }}
                        onKeyDown={(event) => {
                          if ((event.key === 'Enter' || event.key === ' ') && keyboardSource?.branchId === branch.id) {
                            event.preventDefault()
                            connectNode(branch, nodeIndex, keyboardSource.sourceIndex)
                          }
                        }}
                      >
                        <span className="stage3-node-state" aria-hidden="true">{isConnected ? '✓' : '○'}</span>
                        <span>{branch.nodes[nodeIndex]}</span>
                        {nodeIndex === 0 && <small>ĐIỂM BẮT ĐẦU</small>}
                        {isConnected && nodeIndex === sourceIndex && <small>ĐẦU DÂY HIỆN TẠI</small>}
                        {!isConnected && isTarget && <small>CHỌN ĐỂ NỐI</small>}
                      </button>
                      {isCurrent && (
                        <button
                          type="button"
                          className={`stage3-wire-handle ${dragging?.branchId === branch.id ? 'dragging' : ''}`}
                          ref={(element) => {
                            const key = `${branch.id}-${nodeIndex}`
                            if (element) handleRefs.current.set(key, element)
                            else handleRefs.current.delete(key)
                          }}
                          aria-label={`Kéo dây từ ${branch.nodes[nodeIndex]}`}
                          title="Kéo dây đến mắt xích tiếp theo"
                          onPointerDown={(event) => beginDrag(event, branch, nodeIndex)}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault()
                              setKeyboardSource({ branchId: branch.id, sourceIndex: nodeIndex })
                              setFeedback(`Chọn mắt xích kế tiếp của "${branch.title}".`)
                            }
                          }}
                        >
                          <span aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>

      {isCompleted && (
        <div className="stage3-conclusion">
          <h3>HAI PHÍA CỦA CÂU CHUYỆN ĐÃ ĐƯỢC NỐI</h3>
          <p>
            <strong>LẬP LUẬN KINH TẾ:</strong> Tầm quan trọng về công nghệ và cam kết đầu tư của Samsung được đưa ra làm lý do khôi phục quyền tự do kinh doanh cho ông Lee.
          </p>
          <p>
            <strong>LO NGẠI PHÁP QUYỀN:</strong> Các nhà phê bình đặt câu hỏi liệu tầm quan trọng về kinh tế có nên biện minh cho việc đối xử đặc biệt đối với một lãnh đạo tập đoàn chaebol bị kết tội hay không.
          </p>
          <button className="game-btn" onClick={onNext}>
            VIẾT BÁO CÁO KẾT LUẬN →
          </button>
        </div>
      )}

      {dragging && activeBranch && (
        <span className="stage3-drag-announcement" aria-live="polite">
          Đang kéo dây trong {activeBranch.title}
        </span>
      )}
    </div>
  )
}
