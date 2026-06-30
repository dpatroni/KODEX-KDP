export const metrics = [
  { label: "Architectures", value: "5,760", detail: "evaluated in first Explorer run" },
  { label: "Best Candidate", value: "CAND-001317", detail: "SMF-SIN / A=40 / H=2" },
  { label: "Validation Level", value: "L1", detail: "simplified dipole model" },
  { label: "Research Status", value: "PoC", detail: "ready for FEM validation" },
];

export const candidates = [
  { rank: 1, id: "CAND-001317", family: "SMF-SIN", score: 0.982, validation: "L1", summary: "A=40°, H=2, phase=45°, beta=theta+90°" },
  { rank: 2, id: "CAND-001308", family: "SMF-SIN", score: 0.971, validation: "L1", summary: "High-amplitude functional orientation" },
  { rank: 3, id: "CAND-002941", family: "SMF-COS", score: 0.948, validation: "L1", summary: "Cosine spatial function candidate" },
  { rank: 4, id: "CAND-004522", family: "SMF-HYBRID", score: 0.934, validation: "L1", summary: "Mixed harmonic candidate" },
  { rank: 134, id: "CAND-MOBIUS-001", family: "Half-Twist", score: 0.812, validation: "L1", summary: "Early Möbius-inspired half-twist candidate" },
];

export const experiments = [
  { id: "EXP-001", title: "Baseline 16 Magnets", status: "Completed", score: "Reference", level: "L1" },
  { id: "EXP-004", title: "Uniform Alpha Tilt", status: "Completed", score: "Low impact", level: "L1" },
  { id: "EXP-007", title: "Progressive Alpha Function", status: "Completed", score: "Promising signal", level: "L1" },
  { id: "EXP-ARCH", title: "Architecture Explorer Run", status: "Completed", score: "5,760 candidates", level: "L1" },
];

export const roadmap = [
  ["Digital Twin", 100],
  ["Python Magnetic Engine", 95],
  ["Research Console", 85],
  ["Interactive Live Lab", 45],
  ["Genome / Evolution Engine", 25],
  ["FEMM Validation", 10],
  ["Physical Prototype", 5],
];
