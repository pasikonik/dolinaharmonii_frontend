// shortcut: in-memory, per process. In pm2 cluster mode the real limit is `limit` × workers.
// Put nginx `limit_req` in front of /api/contact for a hard cap.
const hits = new Map<string, number[]>()

export function isRateLimited(key: string, limit: number, windowMs: number, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter(t => now - t < windowMs)
  if (recent.length >= limit) {
    hits.set(key, recent)
    return true
  }
  recent.push(now)
  hits.set(key, recent)
  // Keep the map from growing forever.
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every(t => now - t >= windowMs)) hits.delete(k)
  }
  return false
}
