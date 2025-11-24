"use client";

import { useState } from "react";
import ModeToggleM2, {
  ModeM2,
} from "@/components/binary-search/median-two-sorted-arrays/ModeToggleM2";
import StoryTabs, {
  StoryTabId,
} from "@/components/binary-search/median-two-sorted-arrays/StoryTabs";
import MergeIntuitionView from "@/components/binary-search/median-two-sorted-arrays/MergeIntuitionView";
import PartitionView from "@/components/binary-search/median-two-sorted-arrays/PartitionView";
import StatsPanelM2 from "@/components/binary-search/median-two-sorted-arrays/StatsPanelM2";
import CodePanelM2 from "@/components/binary-search/median-two-sorted-arrays/CodePanelM2";
import FormulaView from "@/components/binary-search/median-two-sorted-arrays/FormulaView";

type Status = "ready" | "running" | "done";

type LastAction =
  | {
      kind: "init";
      low: number;
      high: number;
    }
  | {
      kind: "partition";
      move: "left" | "right" | "found";
      i: number;
      j: number;
      maxLeftA: number;
      minRightA: number;
      maxLeftB: number;
      minRightB: number;
      median?: number;
    }
  | null;

// --- Scenario data -------------------------------------------------------

const A = [1, 3, 8];
const B = [7, 9, 10, 11]; // |A| <= |B|, total length = 7 -> median 8

const TOTAL = A.length + B.length;
const HALF = Math.floor((TOTAL + 1) / 2);

// Helper to pretty-print sentinel ∞ values
function pretty(x: number | null | undefined, sign: "neg" | "pos") {
  if (x == null) return "–";
  if (x === Number.NEGATIVE_INFINITY) return sign === "neg" ? "−∞" : String(x);
  if (x === Number.POSITIVE_INFINITY) return sign === "pos" ? "+∞" : String(x);
  return x.toString();
}

export default function MedianTwoSortedArraysPage() {
  const [status, setStatus] = useState<Status>("ready");
  const [mode, setMode] = useState<ModeM2>("beginner");
  const [activeTab, setActiveTab] = useState<StoryTabId>("partition");

  // binary-search state on A
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(A.length);
  const [i, setI] = useState<number | null>(null);
  const [j, setJ] = useState<number | null>(null);

  const [median, setMedian] = useState<number | null>(null);

  const [maxLeftA, setMaxLeftA] = useState<number | null>(null);
  const [minRightA, setMinRightA] = useState<number | null>(null);
  const [maxLeftB, setMaxLeftB] = useState<number | null>(null);
  const [minRightB, setMinRightB] = useState<number | null>(null);
  const [lastMove, setLastMove] = useState<"left" |
