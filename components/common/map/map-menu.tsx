"use client";

import { Stage, Trip } from "@/types/map";
import { ArrowLeft, ArrowRight } from "lucide-react";

type MapMenuProps = {
  trips: Trip[];
  stages: Stage[];
  selectedStageId: number | null;
  onSelectStage: (stageId: number) => void;
  onClearSelection: () => void;
};

function formatDate(input: string) {
  // Supports both ISO-like strings and "dd/mm/yyyy"
  const ddmmyyyy = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = input.match(ddmmyyyy);

  const d = match
    ? new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]))
    : new Date(input);

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

  const departureDate = activeTrip ? formatDate(activeTrip.departure_date) : null;
  const arrivalDate = activeTrip ? formatDate(activeTrip.arrival_date) : null;

  const isStageView = selectedStageId != null;
  const selectedStage = isStageView
    ? currentStages.find((s) => s.id === selectedStageId)!
    : null;

  return (
    <aside
      className={[
        "absolute left-4 top-4 z-20",
        "hidden md:flex",
        "w-88 max-w-[calc(100%-2rem)]",
        "h-[calc(100%-2rem)] overflow-auto",
        "flex-col gap-3",
        "rounded-md bg-secondary/90 p-4 shadow-lg backdrop-blur scrollbar-hide",
      ].join(" ")}
    >
      {currentStages.length === 0 ? (
        <div className="flex flex-col h-full justify-center">
          <h1 className="text-xl font-semibold text-center">
            The route for this year will soon be published.
          </h1>
          <p className="text-muted-foreground text-center">Stay tuned for updates!</p>
        </div>
      ) : isStageView && selectedStage ? (
        <div className="flex flex-col h-full min-h-full">
          <button
            type="button"
            onClick={onClearSelection}
            className={[
              "flex items-center gap-2",
              "text-left rounded-md p-3 transition",
              "hover:bg-background/30",
              "bg-background/20",
            ].join(" ")}
          >
            <ArrowLeft size={16} />
            <span className="font-semibold">Back to stages</span>
          </button>

          <div className="mt-3 flex flex-col gap-3 flex-1 min-h-0">
            <div className="rounded-md bg-background/20 p-4">
              <h2 className="text-2xl font-semibold leading-tight">
                {selectedStage.name}
              </h2>

              <div className="mt-3 text-sm text-muted-foreground">
                <div className="flex flex-row items-center gap-2">
                  <span className="font-semibold text-foreground text-lg">{selectedStage.departure_port}</span>
                  <ArrowRight size={16} />
                  <span className="font-semibold text-foreground text-lg">{selectedStage.arrival_port}</span>
                </div>
              </div>

              <div className="mt-3 flex flex-col gap-2 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Departure</span>
                  <span className="font-semibold text-right">
                    {selectedStage.departure_port} · {formatDate(selectedStage.departure_date)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Arrival</span>
                  <span className="font-semibold text-right">
                    {selectedStage.arrival_port} · {formatDate(selectedStage.arrival_date)}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-md bg-background/20 p-4 flex-1 min-h-0 overflow-auto">
              <h3 className="text-lg font-semibold">Stage info</h3>
              <p className="mt-2 text-sm leading-relaxed">{selectedStage.description}</p>
            </div>

            <div className="rounded-md bg-background/10 p-3 text-xs text-muted-foreground">
              <div className="flex items-center justify-between gap-3">
                <span>Trip</span>
                <span className="font-semibold text-foreground">
                  {activeTrip?.name ?? `Trip ${activeTrip?.year ?? ""}`}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between gap-3">
                <span>Dates</span>
                <span className="font-semibold text-foreground">
                  {departureDate} to {arrivalDate}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-center pb-4">
              {activeTrip?.name ?? `Trip ${activeTrip?.year ?? ""}`}
            </h2>

            <div className="mt-2 flex flex-row justify-center items-center gap-2 text-sm px-2">
              <span className="font-bold text-right">{activeTrip?.departure_port ?? "-"}</span>
              <ArrowRight size={16} />
              <span className="font-bold text-right">{activeTrip?.arrival_port ?? "-"}</span>
            </div>

            {activeTrip?.description ? (
              <p className="mt-2 text-sm text-center">{activeTrip.description}</p>
            ) : null}
          </div>

          <h2 className="mt-4 text-2xl font-semibold leading-tight">
            Select a stage
          </h2>
          {currentStages.map((stage) => (
            <button
              key={stage.id}
              className={`flex flex-row items-center gap-3 text-left rounded-md p-3 transition hover:bg-background/30 ${selectedStageId === stage.id ? "bg-background/20" : ""
                }`}
              type="button"
              onClick={() => onSelectStage(stage.id)}
            >
              <h3 className="text-lg font-semibold">{stage.departure_port}</h3>
              <div className="flex flex-row items-center w-full">
                <div className="w-full h-0.5 bg-muted-foreground rounded-full" />
                <ArrowRight strokeWidth={3} className="text-muted-foreground -translate-x-1" />
              </div>
              <h3 className="text-lg font-semibold">{stage.arrival_port}</h3>
            </button>
          ))}
        </>
      )}
    </aside>
  );
}
