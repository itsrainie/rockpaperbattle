import { Button } from "@/components/ui/button";
import { Hand, HandMetal, Scroll } from "lucide-react";

interface MoveSelectorProps {
  onMove: (move: string) => void;
  disabled?: boolean;
}

export default function MoveSelector({ onMove, disabled }: MoveSelectorProps) {
  const moves = [
    { id: "rock", icon: HandMetal, label: "Rock" },
    { id: "paper", icon: Scroll, label: "Paper" },
    { id: "scissors", icon: Hand, label: "Scissors" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {moves.map((move) => (
        <Button
          key={move.id}
          onClick={() => onMove(move.id)}
          disabled={disabled}
          variant="outline"
          className="h-24 flex flex-col items-center justify-center space-y-2"
        >
          <move.icon className="h-8 w-8" />
          <span>{move.label}</span>
        </Button>
      ))}
    </div>
  );
}
