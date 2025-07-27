import{ useState, useEffect } from "react";
import { TrendingUp, Users, Clock, Trophy, Globe, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const CourseStats = () => {
  const [stats, setStats] = useState({
    activeStudents: 1247,
    completionRate: 89,
    avgRating: 4.8,
    certificates: 3420,
    countries: 95,
    hoursWatched: 45670
  });

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        activeStudents: prev.activeStudents + Math.floor(Math.random() * 3),
        hoursWatched: prev.hoursWatched + Math.floor(Math.random() * 5)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const statItems = [
    {
      icon: Users,
      label: "Active Students",
      value: stats.activeStudents.toLocaleString(),
      change: "+12% this week",
      color: "text-primary"
    },
    {
      icon: TrendingUp,
      label: "Completion Rate",
      value: `${stats.completionRate}%`,
      change: "Above average",
      color: "text-course-success"
    },
    {
      icon: Trophy,
      label: "Certificates Issued",
      value: stats.certificates.toLocaleString(),
      change: "+89 this week",
      color: "text-course-accent"
    },
    {
      icon: Globe,
      label: "Countries",
      value: stats.countries.toString(),
      change: "Worldwide reach",
      color: "text-course-premium"
    },
    {
      icon: Clock,
      label: "Hours Watched",
      value: `${(stats.hoursWatched / 1000).toFixed(1)}K`,
      change: "This month",
      color: "text-blue-500"
    },
    {
      icon: Zap,
      label: "Avg Rating",
      value: stats.avgRating.toString(),
      change: "5-star reviews",
      color: "text-yellow-500"
    }
  ];

  return (
    <Card className="shadow-card border-0 bg-gradient-card px-0">
      <CardContent className="px-0">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold">Course Statistics</h3>
            <p className="text-muted-foreground text-sm">Live data from our learning platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {statItems.map((stat, index) => (
              <div 
                key={stat.label}
                className="group p-4 rounded-xl border border-border bg-[#EFF6E3] hover:shadow-elegant transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-lg">{stat.value}</div>
                    <div className="text-xs text-muted-foreground truncate">{stat.label}</div>
                    <div className="text-xs text-primary font-medium">{stat.change}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4 border-t border-border">
            <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              Updated in real-time
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseStats;