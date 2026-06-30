export function PublicExplainer({ lang = "es" }: { lang?: "es" | "en" }) {
  const es = lang === "es";

  const blocks = es
    ? [
        {
          title: "1. El problema",
          body: "El diseño convencional de máquinas eléctricas suele concentrarse en geometría, materiales, número de polos y bobinas. KODEX investiga una dimensión adicional: la orientación espacial de cada elemento magnético como variable de diseño.",
        },
        {
          title: "2. La hipótesis",
          body: "Si la orientación de los imanes se describe mediante funciones espaciales —por ejemplo α(θ) y β(θ)— es posible explorar familias de arquitecturas que no son evidentes por intuición o prueba manual.",
        },
        {
          title: "3. Lo construido",
          body: "Hemos desarrollado un demostrador computacional que genera arquitecturas candidatas, calcula respuestas relativas de flujo, torque y score, y crea un ranking automático de configuraciones prometedoras.",
        },
        {
          title: "4. Evidencia preliminar",
          body: "La primera corrida del Architecture Explorer evaluó 5,760 arquitecturas. El mejor candidato no fue una inclinación uniforme, sino una función espacial. Esto no prueba un resultado físico final, pero justifica validación FEM.",
        },
        {
          title: "5. Siguiente etapa",
          body: "El siguiente paso es validar los mejores candidatos con FEMM / Ansys Maxwell y luego diseñar un prototipo físico medible. Buscamos colaboradores técnicos, universidades, asesores electromagnéticos e inversionistas seed.",
        },
      ]
    : [
        {
          title: "1. The problem",
          body: "Conventional electric-machine design usually focuses on geometry, materials, pole count and coils. KODEX investigates an additional dimension: the spatial orientation of each magnetic element as a design variable.",
        },
        {
          title: "2. The hypothesis",
          body: "If magnet orientation is described through spatial functions — such as α(θ) and β(θ) — it becomes possible to explore architecture families that are not obvious through intuition or manual trial and error.",
        },
        {
          title: "3. What we built",
          body: "We developed a computational demonstrator that generates candidate architectures, computes relative flux, torque and score responses, and creates an automatic ranking of promising configurations.",
        },
        {
          title: "4. Preliminary evidence",
          body: "The first Architecture Explorer run evaluated 5,760 architectures. The best candidate was not a uniform tilt, but a spatial function. This does not prove final physical performance, but it justifies FEM validation.",
        },
        {
          title: "5. Next stage",
          body: "The next step is to validate the best candidates with FEMM / Ansys Maxwell and then design a measurable physical prototype. We are looking for technical collaborators, universities, electromagnetic advisors and seed investors.",
        },
      ];

  return (
    <section className="mt-10">
      <div className="panel rounded-3xl p-8">
        <div className="badge inline-flex rounded-full px-4 py-2 text-sm">
          {es ? "Qué es KODEX Discovery Platform" : "What is KODEX Discovery Platform?"}
        </div>
        <h2 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight">
          {es
            ? "Un laboratorio digital para descubrir, comparar y validar arquitecturas magnéticas."
            : "A digital lab to discover, compare and validate magnetic architectures."}
        </h2>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-white/60">
          {es
            ? "KODEX no presenta una afirmación física final. Presenta una metodología reproducible, un demostrador funcional y un camino claro hacia validación de alta fidelidad y prototipo."
            : "KODEX is not presenting a final physical claim. It presents a reproducible methodology, a working demonstrator and a clear path toward high-fidelity validation and prototyping."}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {blocks.map((item) => (
            <div key={item.title} className="rounded-3xl border border-white/10 bg-black/20 p-5">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/55">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
