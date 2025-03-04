import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [, navigate] = useLocation();
  const [playerName, setPlayerName] = useState("");
  const [roomId, setRoomId] = useState("");
  const { toast } = useToast();

  const createRoom = async () => {
    if (!playerName) {
      toast({ title: "Please enter your name", variant: "destructive" });
      return;
    }

    try {
      const res = await apiRequest("POST", "/api/rooms", { player1: playerName });
      const room = await res.json();
      navigate(`/room/${room.id}`);
    } catch (error) {
      toast({ title: "Failed to create room", variant: "destructive" });
    }
  };

  const joinRoom = async () => {
    if (!playerName || !roomId) {
      toast({ title: "Please enter your name and room ID", variant: "destructive" });
      return;
    }

    try {
      const res = await apiRequest("POST", `/api/rooms/${roomId}/join`, { player2: playerName });
      const room = await res.json();
      navigate(`/room/${room.id}`);
    } catch (error) {
      toast({ title: "Failed to join room", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Rock Paper Scissors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Button className="w-full" onClick={createRoom}>
              Create New Room
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Enter room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
            <Button className="w-full" onClick={joinRoom}>
              Join Room
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
