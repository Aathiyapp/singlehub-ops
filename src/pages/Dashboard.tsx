import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, Users, Clock, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Active Patients",
      value: "1,247",
      change: "+12%",
      icon: Users,
      variant: "default" as const,
    },
    {
      title: "Operations Today",
      value: "87",
      change: "+5%",
      icon: Activity,
      variant: "success" as const,
    },
    {
      title: "Avg. Wait Time",
      value: "23 min",
      change: "-8%",
      icon: Clock,
      variant: "warning" as const,
    },
    {
      title: "Efficiency",
      value: "94.2%",
      change: "+3.1%",
      icon: TrendingUp,
      variant: "success" as const,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Patient Registration Completed",
      time: "2 minutes ago",
      status: "success",
    },
    {
      id: 2,
      action: "Surgery Room 3 - Cleaning Required",
      time: "15 minutes ago",
      status: "warning",
    },
    {
      id: 3,
      action: "Staff Meeting Scheduled",
      time: "1 hour ago",
      status: "info",
    },
    {
      id: 4,
      action: "Equipment Maintenance Completed",
      time: "2 hours ago",
      status: "success",
    },
  ];

  const departmentMetrics = [
    { name: "Emergency", utilization: 85, status: "critical" },
    { name: "Surgery", utilization: 72, status: "active" },
    { name: "ICU", utilization: 68, status: "active" },
    { name: "Cardiology", utilization: 45, status: "warning" },
    { name: "Pediatrics", utilization: 60, status: "active" },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Healthcare Operations Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time overview of hospital operations and key performance indicators
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gradient-card shadow-card-custom border-0 hover:shadow-medical transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <Badge 
                  variant={stat.variant}
                  className="text-xs"
                >
                  {stat.change}
                </Badge>
                {" "}from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Department Utilization */}
        <Card className="bg-gradient-card shadow-card-custom border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <span>Department Utilization</span>
            </CardTitle>
            <CardDescription>
              Current capacity usage across hospital departments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {departmentMetrics.map((dept) => (
              <div key={dept.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`status-${dept.status}`}></span>
                    <span className="font-medium">{dept.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{dept.utilization}%</span>
                </div>
                <Progress 
                  value={dept.utilization} 
                  className="h-2"
                  style={{
                    background: `hsl(var(--muted))`,
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gradient-card shadow-card-custom border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>
              Latest updates from hospital operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="mt-1">
                    {activity.status === "success" && <CheckCircle className="h-4 w-4 text-success" />}
                    {activity.status === "warning" && <AlertTriangle className="h-4 w-4 text-warning" />}
                    {activity.status === "info" && <Activity className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-card shadow-card-custom border-0">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Frequently used tools and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Patient Registration", icon: Users },
              { name: "Schedule Surgery", icon: Activity },
              { name: "View Reports", icon: TrendingUp },
              { name: "Emergency Alert", icon: AlertTriangle },
            ].map((action) => (
              <button
                key={action.name}
                className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors border border-primary/20 hover:border-primary/40"
              >
                <action.icon className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium text-foreground">{action.name}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}