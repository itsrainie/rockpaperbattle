import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiRequest, queryClient } from "@/lib/queryClient";
import MoveSelector from "@/components/game/move-selector";
import GameStatus from "@/components/game/game-status";
import ResultDisplay from "@/components/game/result-display";
import type { GameRoom } from "@shared/schema";

export default function GameRoom() {
  const { roomId } = useParams();

  const { data: room, isLoading, error } = useQuery<GameRoom>({
    queryKey: [`/api/rooms/${roomId}`],
    refetchInterval: 1000,
  });

  const makeMoveMutation = useMutation({
    mutationFn: async ({ player, move }: { player: string; move: string }) => {
      await apiRequest("POST", `/api/rooms/${roomId}/move`, { player, move });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/rooms/${roomId}`] });
    },
  });

  const resetGameMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", `/api/rooms/${roomId}/reset`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/rooms/${roomId}`] });
    },
  });

  if (error) {
    return <div>Error loading room: {(error as Error).message}</div>;
  }

  if (isLoading || !room) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading room {roomId}...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center">
            Room: {room.id}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <GameStatus room={room} />

          {room.status === "playing" && (
            <MoveSelector
              onMove={(move) => {
                const player = localStorage.getItem("playerName");
                if (player) {
                  makeMoveMutation.mutate({ player, move });
                }
              }}
              disabled={makeMoveMutation.isPending}
            />
          )}

          {room.status === "finished" && (
            <>
              <ResultDisplay room={room} />
              <Button 
                className="w-full" 
                onClick={() => resetGameMutation.mutate()}
                disabled={resetGameMutation.isPending}
              >
                Play Again
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}