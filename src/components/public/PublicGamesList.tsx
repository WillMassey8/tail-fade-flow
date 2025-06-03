import React, { useState, useEffect } from "react";
import PublicGameItem from "./PublicGameItem";
import { Badge } from "@/components/ui/badge";
import { Activity, Zap } from "lucide-react";

interface PublicGame {
  id: string;
  team: string;
  opponent: string;
  publicPercentage: number;
  totalBets: number;
  gameTime: string;
  isLive: boolean;
  spread: string;
  sport: string;
}

// Mock data - in production this would come from your API
const mockPublicGames: PublicGame[] = [
  {
    id: "1",
    team: "Lakers",
    opponent: "Warriors",
    publicPercentage: 87,
    totalBets: 1247,
    gameTime: "2024-06-03T20:00:00Z",
    isLive: false,
    spread: "-5",
    sport: "NBA"
  },
  {
    id: "2",
    team: "Chiefs",
    opponent: "Broncos",
    publicPercentage: 82,
    totalBets: 2156,
    gameTime: "2024-06-03T18:30:00Z",
    isLive: true,
    spread: "-7.5",
    sport: "NFL"
  },
  {
    id: "3",
    team: "Celtics",
    opponent: "Heat",
    publicPercentage: 79,
    totalBets: 934,
    gameTime: "2024-06-03T21:30:00Z",
    isLive: false,
    spread: "-3",
    sport: "NBA"
  },
  {
    id: "4",
    team: "Yankees",
    opponent: "Red Sox",
    publicPercentage: 76,
    totalBets: 567,
    gameTime: "2024-06-03T19:00:00Z",
    isLive: false,
    spread: "-1.5",
    sport: "MLB"
  },
  {
    id: "5",
    team: "Rangers",
    opponent: "Islanders",
    publicPercentage: 74,
    totalBets: 423,
    gameTime: "2024-06-03T20:30:00Z",
    isLive: false,
    spread: "-1",
    sport: "NHL"
  },
  {
    id: "6",
    team: "Cowboys",
    opponent: "Eagles",
    publicPercentage: 71,
    totalBets: 1834,
    gameTime: "2024-06-03T22:00:00Z",
    isLive: false,
    spread: "-3.5",
    sport: "NFL"
  },
  {
    id: "7",
    team: "Dodgers",
    opponent: "Padres",
    publicPercentage: 68,
    totalBets: 789,
    gameTime: "2024-06-03T17:00:00Z",
    isLive: true,
    spread: "-2",
    sport: "MLB"
  }
];

const PublicGamesList = () => {
  const [games, setGames] = useState<PublicGame[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    // Sort games by public percentage (highest first)
    const sortedGames = [...mockPublicGames].sort((a, b) => b.publicPercentage - a.publicPercentage);
    setGames(sortedGames);

    // Simulate real-time updates every 30 seconds
    const interval = setInterval(() => {
      setGames(prevGames => {
        const updatedGames = prevGames.map(game => ({
          ...game,
          publicPercentage: Math.round(Math.max(50, Math.min(95, game.publicPercentage + (Math.random() - 0.5) * 4))),
          totalBets: game.totalBets + Math.floor(Math.random() * 20)
        }));
        return updatedGames.sort((a, b) => b.publicPercentage - a.publicPercentage);
      });
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      {/* Futuristic Header */}
      <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl p-4 border border-white/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]"></div>
              <span className="text-sm text-white font-bold tracking-wide">
                LIVE PULSE
              </span>
              <Activity className="h-4 w-4 text-cyan-400" />
            </div>
          </div>
          <Badge variant="outline" className="text-cyan-400 border-cyan-400/50 bg-cyan-400/10 text-xs font-bold">
            <Zap className="h-3 w-3 mr-1" />
            {games.length} GAMES
          </Badge>
        </div>
        <div className="text-xs text-white/60 text-center">
          Updated {lastUpdated.toLocaleTimeString()} • Real-time public betting data
        </div>
      </div>

      {/* Compact Grid Layout */}
      <div className="grid grid-cols-1 gap-3">
        {games.map((game, index) => (
          <PublicGameItem 
            key={game.id} 
            game={game} 
            rank={index + 1}
          />
        ))}
      </div>
      
      {/* Futuristic Footer */}
      <div className="mt-6 p-3 bg-gradient-to-r from-white/5 to-white/10 rounded-xl border border-white/10 backdrop-blur-sm">
        <p className="text-xs text-white/60 text-center">
          <span className="text-cyan-400 font-bold">80%+</span> = Heavy Public • 
          Data refreshes every 30s • 
          <span className="text-orange-400 font-bold">Fade responsibly</span>
        </p>
      </div>
    </div>
  );
};

export default PublicGamesList;
