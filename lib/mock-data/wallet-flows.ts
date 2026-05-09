import type { Edge, Node } from "@xyflow/react";

export const walletFlowNodes: Node[] = [
  {
    id: "attacker",
    type: "input",
    position: { x: 0, y: 120 },
    data: { label: "Attacker Wallet\n7bF...9Qx" },
  },
  {
    id: "vault",
    position: { x: 250, y: 40 },
    data: { label: "Token Drains\n$42.1M" },
  },
  {
    id: "bridge",
    position: { x: 250, y: 210 },
    data: { label: "Bridge Transfer\nSOL -> ETH" },
  },
  {
    id: "mixer",
    position: { x: 520, y: 120 },
    data: { label: "Mixer Usage\n6 hops" },
  },
  {
    id: "cex",
    type: "output",
    position: { x: 790, y: 40 },
    data: { label: "CEX Deposit\nTagged" },
  },
  {
    id: "cold",
    type: "output",
    position: { x: 790, y: 210 },
    data: { label: "Dormant Wallet\nWatching" },
  },
];

export const walletFlowEdges: Edge[] = [
  { id: "e1", source: "attacker", target: "vault", animated: true, label: "drain" },
  { id: "e2", source: "attacker", target: "bridge", animated: true, label: "route" },
  { id: "e3", source: "vault", target: "mixer", animated: true, label: "split" },
  { id: "e4", source: "bridge", target: "mixer", animated: true, label: "swap" },
  { id: "e5", source: "mixer", target: "cex", animated: true, label: "cashout" },
  { id: "e6", source: "mixer", target: "cold", animated: true, label: "park" },
];

export const trustedVolumesFlowNodes: Node[] = [
  {
    id: "victim",
    type: "input",
    position: { x: 0, y: 150 },
    data: { label: "Victim Resolver\n0x9bA0...Da31" },
    style: {
      borderColor: "rgba(255,45,85,.65)",
      background: "rgba(127,29,29,.42)",
      color: "#ffe4e6",
      width: 178,
    },
  },
  {
    id: "proxy",
    position: { x: 250, y: 150 },
    data: { label: "Custom RFQ Proxy\n0xeEeE...756" },
    style: {
      borderColor: "rgba(245,158,11,.6)",
      background: "rgba(120,53,15,.38)",
      color: "#fef3c7",
      width: 178,
    },
  },
  {
    id: "tx",
    position: { x: 500, y: 150 },
    data: { label: "Exploit Tx\n0xc5c6...0513" },
    style: {
      borderColor: "rgba(0,255,209,.45)",
      background: "rgba(8,47,73,.42)",
      color: "#cffafe",
      width: 178,
    },
  },
  {
    id: "exploiter",
    position: { x: 750, y: 150 },
    data: { label: "Exploiter\n0xC3EB...9100" },
    style: {
      borderColor: "rgba(255,45,85,.7)",
      background: "rgba(88,28,135,.3)",
      color: "#fce7f3",
      width: 178,
    },
  },
  {
    id: "weth",
    type: "output",
    position: { x: 1010, y: 0 },
    data: { label: "WETH\n1,291.16" },
    style: { borderColor: "rgba(0,255,209,.45)", background: "rgba(6,78,59,.35)", color: "#d1fae5" },
  },
  {
    id: "usdt",
    type: "output",
    position: { x: 1010, y: 105 },
    data: { label: "USDT\n206,282" },
    style: { borderColor: "rgba(0,255,209,.45)", background: "rgba(6,78,59,.35)", color: "#d1fae5" },
  },
  {
    id: "wbtc",
    type: "output",
    position: { x: 1010, y: 210 },
    data: { label: "WBTC\n16.939" },
    style: { borderColor: "rgba(0,255,209,.45)", background: "rgba(6,78,59,.35)", color: "#d1fae5" },
  },
  {
    id: "usdc",
    type: "output",
    position: { x: 1010, y: 315 },
    data: { label: "USDC\n1,268,771" },
    style: { borderColor: "rgba(0,255,209,.45)", background: "rgba(6,78,59,.35)", color: "#d1fae5" },
  },
];

export const trustedVolumesFlowEdges: Edge[] = [
  {
    id: "tv-1",
    source: "victim",
    target: "proxy",
    animated: true,
    label: "resolver route",
    style: { stroke: "#ff2d55", strokeWidth: 2 },
  },
  {
    id: "tv-2",
    source: "proxy",
    target: "tx",
    animated: true,
    label: "unsafe swap execution",
    style: { stroke: "#f59e0b", strokeWidth: 2 },
  },
  {
    id: "tv-3",
    source: "tx",
    target: "exploiter",
    animated: true,
    label: "~$5.87M extracted",
    style: { stroke: "#00ffd1", strokeWidth: 2 },
  },
  { id: "tv-4", source: "exploiter", target: "weth", animated: true, label: "drain", style: { stroke: "#00ffd1" } },
  { id: "tv-5", source: "exploiter", target: "usdt", animated: true, label: "drain", style: { stroke: "#00ffd1" } },
  { id: "tv-6", source: "exploiter", target: "wbtc", animated: true, label: "drain", style: { stroke: "#00ffd1" } },
  { id: "tv-7", source: "exploiter", target: "usdc", animated: true, label: "drain", style: { stroke: "#00ffd1" } },
];
