"use client";

import React from "react";

type Status = "ready" | "processing" | "done";

interface ArrayBarProps {
  nums1: number[];
  nums2: number[];
  i: number | null; // partition index in nums1
  j: number | null; // partition index in nums2
  status: Status;
}

function PartitionMarker({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center mx-1">
      <div className="h-16 w-[3px] rounded-full bg-gradient-to-b from-slate-900 via-slate-500 to-slate-900" />
      <span className="mt-1 text-[10px] font-mono text-slate-400">{label}</span>
    </div>
  );
}

function Cell({
  value,
  index,
  side,
  isBoundary,
}: {
  value: number;
  index: number;
  side: "left" | "right" | "neutral";
  isBoundary?: boolean;
}) {
  const baseHeight = 26;
  const scale = 5;
  const height = baseHeight + value * scale;

  const sideClass =
    side === "left"
      ? "bg-gradient-to-t from-sky-200 to-sky-50 border-sky-300"
      : side === "right"
      ? "bg-gradient-to-t from-rose-200 to-rose-50 border-rose-300"
      : "bg-slate-100 border-slate-200";

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`relative flex items-end justify-center w-8 rounded-md border ${sideClass} transition-all duration-300`}
        style={{ height }}
      >
        <span className="text-xs font-semibold text-slate-800">{value}</span>
        {isBoundary && (
          <div className="absolute -top-1 right-0 h-2 w-2 rounded-full bg-slate-800" />
        )}
      </div>
      <span className="text-[10px] font-mono text-slate-400">idx {index}</span>
    </div>
  );
}

function renderArrayRow(
  nums: number[],
  partitionIndex: number | null,
  partitionLabel: string
) {
  const parts: React.ReactNode[] = [];

  const p = partitionIndex ?? -1;

  if (p === 0) {
    // partition before first element
    parts.push(<PartitionMarker key="p-start" label={partitionLabel} />);
  }

  nums.forEach((v, idx) => {
    parts.push(
      <Cell
        key={idx}
        value={v}
        index={idx}
        side={idx < p ? "left" : idx >= p && partitionIndex !== null ? "right" : "neutral"}
        isBoundary={idx === p - 1 || idx === p}
      />
    );

    if (idx + 1 === p && p !== nums.length) {
      parts.push(
        <PartitionMarker key={`p-${idx}`} label={partitionLabel} />
      );
    }
  });

  if (p === nums.length) {
    parts.push(<PartitionMarker key="p-end" label={partitionLabel} />);
  }

  return (
    <div className="flex items-end justify-center gap-2 overflow-x-auto pb-1">
      {parts}
    </div>
  );
}

export default function ArrayBar({
  nums1,
  nums2,
  i,
  j,
  status,
}: ArrayBarProps) {
  return (
    <div className="w-full rounded-2xl bg-slate-950/80 border border-slate-800 px-4 py-4 flex flex-col gap-4">
      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
        <span className="font-semibold text-slate-200">Arrays</span>
        <span className="font-mono">
          status:{" "}
          <span className="text-slate-100">
            {status === "ready" ? "ready" : status === "processing" ? "searching" : "done"}
          </span>
        </span>
      </div>

      {/* nums1 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
            Smaller array (A)
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            length = {nums1.length}
          </span>
        </div>
        {renderArrayRow(nums1, i, "i")}
      </div>

      {/* nums2 */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent my-1" />

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
            Larger array (B)
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            length = {nums2.length}
          </span>
        </div>
        {renderArrayRow(nums2, j, "j")}
      </div>
    </div>
  );
}
