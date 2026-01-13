import Link from "next/link";
import { Button } from "../ui/button";
import { CrewInfo } from "@/types/crew";

type CrewCardProps = {
  crew: CrewInfo;
};

export default function CrewCard({ crew }: CrewCardProps) {
  return (
    <div className="bg-card shadow-md rounded-lg p-6 flex flex-col justify-between gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">{crew.name}</h2>
        <p className="text-muted-foreground">{crew.description}</p>
      </div>
      <div className="flex flex-row gap-2 overflow-x-auto">
        <Button asChild>
          <Link
            href={crew.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-block whitespace-nowrap bg-primary text-primary-foreground font-semibold px-4 py-2 rounded hover:opacity-90 transition-opacity"
          >
            Download PDF
          </Link>
        </Button>
        <Button asChild>
          <Link
            href={crew.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block whitespace-nowrap bg-secondary text-primary-foreground font-semibold px-4 py-2 rounded hover:opacity-90 transition-opacity"
          >
            View PDF
          </Link>
        </Button>
      </div>
    </div>
  )
}
