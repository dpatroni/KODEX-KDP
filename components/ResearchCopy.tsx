export function ResearchCopy() {
  return (
    <div className="panel rounded-3xl p-7">
      <h2 className="text-2xl font-semibold">What KODEX is building</h2>
      <div className="mt-5 grid gap-5 text-sm leading-7 text-white/60 md:grid-cols-2">
        <p>
          KODEX develops a computational method for exploring magnetic architectures where the spatial orientation
          of each magnetic element is treated as an independent design variable.
        </p>
        <p>
          The current demonstrator does not claim final physical validation. It shows a reproducible path:
          simplified model, architecture ranking, FEM validation, and then physical prototype.
        </p>
      </div>
    </div>
  );
}
