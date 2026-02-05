"use client";

import { Stage, Trip } from "@/types/map";

type MapMenuProps = {
  trips: Trip[];
  stages: Stage[];
  selectedStageId: number | null;
  onSelectStage: (stageId: number) => void;
  onClearSelection: () => void;
};

function formatDate(input?: string) {
  if (!input) return null;
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return null;

  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default function MapMenu({
  trips,
  stages,
  selectedStageId,
  onSelectStage,
  onClearSelection,
}: MapMenuProps) {
  const years = trips
    .map((t) => t.year)
    .filter((y) => typeof y === "number" && !Number.isNaN(y));

  const latestYear = years.length ? Math.max(...years) : null;
  const latestTrips = latestYear == null ? [] : trips.filter((t) => t.year === latestYear);
  const activeTrip = latestTrips.length ? latestTrips[latestTrips.length - 1] : null;

  const currentStages = activeTrip ? stages.filter((s) => s.trip_id === activeTrip.id) : [];

  const departureDate = formatDate(activeTrip?.departure_date);
  const arrivalDate = formatDate(activeTrip?.arrival_date);

  return (
    <aside
      className={[
        "absolute left-4 top-4 z-20",
        "hidden md:flex",
        "w-88 max-w-[calc(100%-2rem)]",
        "max-h-[calc(100%-2rem)] overflow-auto",
        "flex-col gap-3",
        "rounded-md bg-secondary/90 p-4 shadow-lg backdrop-blur scrollbar-hide",
      ].join(" ")}
    >
      {currentStages.length === 0 ? (
        <div>
          <h1 className="text-xl font-semibold text-center">
            The route for this year will soon be published.
          </h1>
          <p className="text-muted-foreground text-center">Stay tuned for updates!</p>
        </div>
      ) : (
        <>
          <div>
            <h2 className="text-2xl font-semibold leading-tight text-center">
              {activeTrip?.name ?? `Trip ${activeTrip?.year ?? ""}`}
            </h2>
            <p className="mt-1 text-muted-foreground font-bold text-center">{activeTrip?.year ?? "-"}</p>

            <div className="mt-2 flex flex-row justify-between items-center gap-2 text-sm px-2">
              <span className="font-bold text-right">{activeTrip?.departure_port ?? "-"}</span>
              <div className="h-0.5 w-full rounded-full bg-muted-foreground" />
              <span className="font-bold text-right">{activeTrip?.arrival_port ?? "-"}</span>
            </div>

            {activeTrip?.description ? (
              <p className="mt-2 text-sm text-center">{activeTrip.description}</p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onClearSelection}
            className={[
              "text-left rounded-md p-3 transition",
              "hover:bg-background/30",
              selectedStageId == null ? "bg-background/20" : "",
            ].join(" ")}
          >
            <h3 className="text-lg font-semibold mb-1">Show full route</h3>
            <p className="text-sm text-muted-foreground">
              Zoom out to the full trip and show all stages again.
            </p>
          </button>

          {currentStages.map((stage) => (
            <button
              key={stage.id}
              className={[
                "text-left rounded-md p-3 transition",
                "hover:bg-background/30",
                selectedStageId === stage.id ? "bg-background/20" : "",
              ].join(" ")}
              type="button"
              onClick={() => onSelectStage(stage.id)}
            >
              <h3 className="text-lg font-semibold">From {stage.departure_port}</h3>
              <h3 className="text-lg font-semibold">To {stage.arrival_port}</h3>
            </button>
          ))}
        </>
      )}
    </aside>
  );
}
