import { PokemonStat } from '@/lib/api';

interface PokemonStatsProps {
  stats: PokemonStat[];
}

export default function PokemonStats({ stats }: PokemonStatsProps) {
  // Define colors for different stat types
  const getStatColor = (statName: string): string => {
    const colors: Record<string, string> = {
      hp: 'bg-red-500',
      attack: 'bg-orange-500',
      defense: 'bg-yellow-500',
      'special-attack': 'bg-blue-500',
      'special-defense': 'bg-green-500',
      speed: 'bg-pink-500',
    };
    
    return colors[statName.toLowerCase()] || 'bg-gray-500';
  };
  
  // Calculate percentage for stat bar (max stat value is typically 255)
  const calculatePercentage = (value: number): number => {
    const maxStatValue = 255;
    return Math.min(100, (value / maxStatValue) * 100);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">Stats</h3>
      
      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.name} className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm font-medium capitalize">
                {stat.name.replace('-', ' ')}
              </span>
              <span className="text-sm font-medium">{stat.value}</span>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${getStatColor(stat.name)}`}
                style={{ width: `${calculatePercentage(stat.value)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
