import { Card, CardContent } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import type { GameRoom } from "@shared/schema";

interface ResultDisplayProps {
  room: GameRoom;
}

export default function ResultDisplay({ room }: ResultDisplayProps) {
  const getWinner = () => {
    if (room.player1Move === room.player2Move) {
      return "It's a tie!";
    }
    if (
      (room.player1Move === "rock" && room.player2Move === "scissors") ||
      (room.player1Move === "paper" && room.player2Move === "rock") ||
      (room.player1Move === "scissors" && room.player2Move === "paper")
    ) {
      return `${room.player1} wins!`;
    }
    return `${room.player2} wins!`;
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <Trophy className="h-12 w-12 mx-auto text-yellow-500" />
          <div className="text-2xl font-bold">{getWinner()}</div>
          <div className="text-sm text-muted-foreground">
            {room.player1}: {room.player1Move} vs {room.player2}: {room.player2Move}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
