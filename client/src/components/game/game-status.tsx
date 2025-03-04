import { Card, CardContent } from "@/components/ui/card";
import type { GameRoom } from "@shared/schema";

interface GameStatusProps {
  room: GameRoom;
}

export default function GameStatus({ room }: GameStatusProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="font-semibold">{room.player1}</div>
            <div className="text-2xl font-bold">{room.player1Score}</div>
            {room.player1Move && <div className="text-sm text-muted-foreground">Move made ✓</div>}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="font-semibold">
              {room.player2 || "Waiting for player..."}
            </div>
            <div className="text-2xl font-bold">{room.player2Score}</div>
            {room.player2Move && <div className="text-sm text-muted-foreground">Move made ✓</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
