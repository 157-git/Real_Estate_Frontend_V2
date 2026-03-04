import { useState, useRef, useEffect } from 'react'
import { Send, Search, Phone, MoreVertical, ArrowLeft } from 'lucide-react'
import { conversations as initConvs } from '../../../data/mockData.js'
import styles from './MessagesPage.module.css'

export default function MessagesPage() {
  const [convs, setConvs]       = useState(initConvs)
  const [active, setActive]     = useState(initConvs[0])
  const [input, setInput]       = useState('')
  const [search, setSearch]     = useState('')
  const [showList, setShowList] = useState(true)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [active])

  const send = () => {
    if (!input.trim()) return
    const msg = { from: 'me', text: input.trim(), time: 'Now' }
    const updated = convs.map(c =>
      c.id === active.id
        ? { ...c, messages: [...c.messages, msg], lastMsg: input.trim(), time: 'Now', unread: 0 }
        : c
    )
    setConvs(updated)
    setActive(prev => ({ ...prev, messages: [...prev.messages, msg] }))
    setInput('')
  }

  const openConv = (c) => {
    const cleared = convs.map(cv => cv.id === c.id ? { ...cv, unread: 0 } : cv)
    setConvs(cleared)
    setActive({ ...c, unread: 0 })
    setShowList(false)
  }

  const filtered = convs.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.property.toLowerCase().includes(search.toLowerCase())
  )

  const totalUnread = convs.reduce((s, c) => s + (c.unread || 0), 0)

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.title}>Client Messages</h2>
          <p>{totalUnread > 0 ? `${totalUnread} unread message${totalUnread > 1 ? 's' : ''}` : 'All caught up'}</p>
        </div>
      </div>

      <div className={styles.layout}>
        {/* Conversation list */}
        <div className={`${styles.sidebar} ${!showList ? styles.sidebarHidden : ''}`}>
          <div className={styles.sidebarSearch}>
            <div className="form-input-icon">
              <Search size={14} className="input-icon" />
              <input className="form-input" placeholder="Search conversations…"
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
          <div className={styles.convList}>
            {filtered.map(c => (
              <div key={c.id}
                className={`${styles.convItem} ${active?.id === c.id ? styles.convActive : ''}`}
                onClick={() => openConv(c)}>
                <div className={styles.convAvatar}>{c.name[0]}</div>
                <div className={styles.convBody}>
                  <div className={styles.convTop}>
                    <span className={styles.convName}>{c.name}</span>
                    <span className={styles.convTime}>{c.time}</span>
                  </div>
                  <div className={styles.convRole}>{c.role} · {c.property}</div>
                  <div className={styles.convPreview}>{c.lastMsg}</div>
                </div>
                {c.unread > 0 && (
                  <span className={styles.unreadBadge}>{c.unread}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat window */}
        <div className={`${styles.chat} ${showList ? styles.chatHidden : ''}`}>
          {active ? (
            <>
              <div className={styles.chatHead}>
                <button className={styles.backBtn} onClick={() => setShowList(true)}>
                  <ArrowLeft size={18} />
                </button>
                <div className={styles.chatAvatar}>{active.name[0]}</div>
                <div className={styles.chatInfo}>
                  <div className={styles.chatName}>{active.name}
                    <span className={styles.chatRole}>{active.role}</span>
                  </div>
                  <div className={styles.chatProp}>{active.property}</div>
                </div>
                <div className={styles.chatActions}>
                  <a href={`tel:9876543210`} className={styles.chatBtn}><Phone size={16} /></a>
                  <button className={styles.chatBtn}><MoreVertical size={16} /></button>
                </div>
              </div>

              <div className={styles.messages}>
                {active.messages.map((m, i) => (
                  <div key={i} className={`${styles.bubble} ${m.from === 'me' ? styles.bubbleMe : styles.bubbleThem}`}>
                    <div className={styles.bubbleText}>{m.text}</div>
                    <div className={styles.bubbleTime}>{m.time}</div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              <div className={styles.inputRow}>
                <input
                  className={styles.msgInput}
                  placeholder="Type a message…"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), send())}
                />
                <button
                  className={styles.sendBtn}
                  onClick={send}
                  disabled={!input.trim()}
                >
                  <Send size={17} />
                </button>
              </div>
            </>
          ) : (
            <div className={styles.chatEmpty}>
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
