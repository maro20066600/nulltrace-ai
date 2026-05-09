"use client";

import { Background, Controls, ReactFlow } from "@xyflow/react";
import type { Incident } from "@/lib/types";
import {
  trustedVolumesFlowEdges,
  trustedVolumesFlowNodes,
  walletFlowEdges,
  walletFlowNodes,
} from "@/lib/mock-data/wallet-flows";
import { GlassCard } from "@/components/ui/GlassCard";

export function WalletFlowGraph({ incident }: { incident: Incident }) {
  const isTrustedVolumes = incident.id === "trustedvolumes-resolver-exploit";
  const nodes = isTrustedVolumes ? trustedVolumesFlowNodes : walletFlowNodes;
  const edges = isTrustedVolumes ? trustedVolumesFlowEdges : walletFlowEdges;

  return (
    <GlassCard className="p-6">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Wallet Flow Visualization</h2>
          <p className="text-sm text-slate-500">
            {isTrustedVolumes
              ? "Victim resolver, RFQ proxy, exploit transaction, exploiter, and extracted assets"
              : "Attacker path, bridge transfers, token drains, mixer usage"}
          </p>
        </div>
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-200">
          {isTrustedVolumes ? "trustedvolumes flow" : "interactive graph"}
        </span>
      </div>
      {isTrustedVolumes ? (
        <div className="mb-4 grid gap-3 md:grid-cols-4">
          {[
            ["Victim", "TrustedVolumes resolver"],
            ["Exploit tx", "0xc5c6...0513"],
            ["Exploiter", "0xC3EB...9100"],
            ["Extracted", "~$5.87M"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-md border border-white/10 bg-black/25 p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{label}</p>
              <p className="mt-1 font-mono text-sm text-cyan-100">{value}</p>
            </div>
          ))}
        </div>
      ) : null}
      <div className="h-[500px] overflow-hidden rounded-lg border border-white/10 bg-black/45">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          nodesDraggable
          proOptions={{ hideAttribution: true }}
          defaultEdgeOptions={{ style: { stroke: "#00ffd1", strokeWidth: 2 } }}
        >
          <Background color="#164e63" gap={24} />
          <Controls />
        </ReactFlow>
      </div>
    </GlassCard>
  );
}
