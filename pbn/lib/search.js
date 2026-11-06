function lev(a, b) { const d = [...Array(b.length + 1).keys()]; for (let i = 1; i <= a.length; i++) { let p = d[0]; d[0] = i; for (let j = 1; j <= b.length; j++) { const t = d[j]; d[j] = Math.min(d[j] + 1, d[j - 1] + 1, p + (a[i - 1] === b[j - 1] ? 0 : 1)); p = t; } } return d[b.length]; }
export function search(list, q) {
  const qt = q.toLowerCase().split(/[\s,]+/).filter(Boolean); if (!qt.length) return list;
  return list.map(s => { const w = `${s.n} ${s.d || ''} ${s.s || ''} ${s.k || ''}`.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean); let sc = 0;
    for (const t of qt) { let b = 0; for (const x of w) { const v = x === t ? 4 : x.startsWith(t) ? 3 : x.includes(t) ? 2 : (t.length > 3 && lev(x.slice(0, t.length + 1), t) <= (t.length > 6 ? 2 : 1)) ? 1.5 : 0; if (v > b) b = v; } sc += b; }
    return [s, sc]; }).filter(x => x[1] > 0).sort((a, b) => b[1] - a[1]).map(x => x[0]);
}
export const money = p => /^\d+(\.\d+)?$/.test(String(p).trim()) ? '$' + p : String(p);
