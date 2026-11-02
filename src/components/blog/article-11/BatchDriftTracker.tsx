'use client';
import { useState, useMemo } from 'react';

export default function BatchDriftTracker() {
  const [vals, setVals] = useState<string[]>(['48', '72', '95', '128', '183']);
  const [field, setField] = useState('Phenol residue (ppm)');
  const [spec, setSpec] = useState('200');

  const stats = useMemo(() => {
    const nums = vals.map((v) => parseFloat(v)).filter((n) => !isNaN(n));
    if (nums.length < 3) return null;
    const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
    const variance = nums.reduce((a, b) => a + (b - mean) ** 2, 0) / nums.length;
    const sigma = Math.sqrt(variance);
    const specNum = parseFloat(spec) || 0;
    return {
      nums,
      mean,
      sigma,
      upper2: mean + 2 * sigma,
      upper3: mean + 3 * sigma,
      lower2: Math.max(0, mean - 2 * sigma),
      lower3: Math.max(0, mean - 3 * sigma),
      spec: specNum,
      maxY: Math.max(specNum * 1.1, mean + 3.5 * sigma),
    };
  }, [vals, spec]);

  const update = (i: number, v: string) => {
    const next = [...vals];
    next[i] = v;
    setVals(next);
  };

  const classify = (n: number) => {
    if (!stats) return 'ok';
    if (n > stats.upper3 || n < stats.lower3) return 'action';
    if (n > stats.upper2 || n < stats.lower2) return 'warn';
    return 'ok';
  };

  const W = 640;
  const H = 280;
  const padL = 50;
  const padR = 20;
  const padT = 20;
  const padB = 40;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const xPos = (i: number, n: number) => padL + (plotW * i) / Math.max(1, n - 1);
  const yPos = (v: number) => {
    if (!stats) return padT + plotH;
    return padT + plotH - (v / stats.maxY) * plotH;
  };

  return (
    <div className="my-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <label className="text-sm">
          <span className="mb-1 block text-slate-600">CoA field</span>
          <input
            className="w-full rounded border border-slate-300 px-2 py-1 text-sm"
            value={field}
            onChange={(e) => setField(e.target.value)}
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-slate-600">Contractual ceiling</span>
          <input
            className="w-full rounded border border-slate-300 px-2 py-1 text-sm"
            value={spec}
            onChange={(e) => setSpec(e.target.value)}
            inputMode="decimal"
          />
        </label>
        <div className="text-sm">
          <span className="mb-1 block text-slate-600">Status</span>
          <div className="rounded border border-slate-300 bg-slate-50 px-2 py-1 font-medium">
            {stats
              ? stats.nums.some((n) => classify(n) === 'action')
                ? 'ACTION — supplier conversation before next PO'
                : stats.nums.some((n) => classify(n) === 'warn')
                ? 'WARNING — review drift trajectory'
                : 'In control'
              : 'Enter at least 3 batches'}
          </div>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-5 gap-2">
        {vals.map((v, i) => (
          <label key={i} className="text-xs">
            <span className="mb-1 block text-slate-600">Batch {i + 1}</span>
            <input
              className="w-full rounded border border-slate-300 px-2 py-1"
              value={v}
              onChange={(e) => update(i, e.target.value)}
              inputMode="decimal"
            />
          </label>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Shewhart control chart">
        <title>Shewhart control chart for CoA batch drift</title>
        <desc>
          Line chart plotting entered CoA values against mean, plus or minus 2 sigma warning
          band, plus or minus 3 sigma action band, and the contractual ceiling.
        </desc>
        <rect x={padL} y={padT} width={plotW} height={plotH} fill="#fafafa" stroke="#e2e8f0" />
        {stats && (
          <>
            <line x1={padL} y1={yPos(stats.spec)} x2={W - padR} y2={yPos(stats.spec)} stroke="#dc2626" strokeDasharray="4 3" strokeWidth={1.5} />
            <text x={W - padR - 4} y={yPos(stats.spec) - 4} textAnchor="end" fontSize="10" fill="#dc2626">Spec {stats.spec}</text>
            <line x1={padL} y1={yPos(stats.upper3)} x2={W - padR} y2={yPos(stats.upper3)} stroke="#ea580c" strokeDasharray="2 2" />
            <line x1={padL} y1={yPos(stats.upper2)} x2={W - padR} y2={yPos(stats.upper2)} stroke="#d97706" strokeDasharray="2 2" />
            <line x1={padL} y1={yPos(stats.mean)} x2={W - padR} y2={yPos(stats.mean)} stroke="#059669" strokeWidth={1.5} />
            <line x1={padL} y1={yPos(stats.lower2)} x2={W - padR} y2={yPos(stats.lower2)} stroke="#d97706" strokeDasharray="2 2" />
            <line x1={padL} y1={yPos(stats.lower3)} x2={W - padR} y2={yPos(stats.lower3)} stroke="#ea580c" strokeDasharray="2 2" />
            <text x={padL + 4} y={yPos(stats.mean) - 3} fontSize="10" fill="#059669">μ={stats.mean.toFixed(1)}</text>
            <text x={padL + 4} y={yPos(stats.upper2) - 3} fontSize="10" fill="#d97706">+2σ</text>
            <text x={padL + 4} y={yPos(stats.upper3) - 3} fontSize="10" fill="#ea580c">+3σ</text>
            <polyline
              fill="none"
              stroke="#0f172a"
              strokeWidth={2}
              points={stats.nums.map((n, i) => `${xPos(i, stats.nums.length)},${yPos(n)}`).join(' ')}
            />
            {stats.nums.map((n, i) => {
              const c = classify(n);
              const color = c === 'action' ? '#dc2626' : c === 'warn' ? '#d97706' : '#059669';
              return (
                <g key={i}>
                  <circle cx={xPos(i, stats.nums.length)} cy={yPos(n)} r={5} fill={color} stroke="#fff" strokeWidth={1.5} />
                  <text x={xPos(i, stats.nums.length)} y={H - padB + 15} textAnchor="middle" fontSize="10" fill="#64748b">B{i + 1}</text>
                  <text x={xPos(i, stats.nums.length)} y={yPos(n) - 10} textAnchor="middle" fontSize="10" fill="#0f172a" fontWeight="600">{n}</text>
                </g>
              );
            })}
          </>
        )}
        <text x={padL} y={H - 5} fontSize="10" fill="#64748b">{field}</text>
      </svg>
    </div>
  );
}
