import { useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Users, Activity, Calendar, Globe } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function LiveDashboards() {
  // User Chart Data
  const userChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Active Users',
        data: [1200, 1350, 1180, 1400, 1600, 1750],
        backgroundColor: 'hsl(210 100% 50% / 0.8)',
        borderColor: 'hsl(210 100% 50%)',
        borderWidth: 2,
      },
    ],
  };

  // Status Chart Data
  const statusChartData = {
    labels: ['Active', 'Scheduled', 'Completed', 'Cancelled'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: [
          'hsl(142 76% 36%)',
          'hsl(210 100% 50%)',
          'hsl(38 92% 50%)',
          'hsl(0 84% 60%)',
        ],
        borderWidth: 0,
      },
    ],
  };

  // Date Chart Data
  const dateChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Procedures',
        data: [85, 92, 78, 96],
        fill: true,
        backgroundColor: 'hsl(210 100% 50% / 0.1)',
        borderColor: 'hsl(210 100% 50%)',
        tension: 0.4,
      },
    ],
  };

  // Work Type Chart Data
  const workTypeChartData = {
    labels: ['Surgery', 'Consultation', 'Emergency', 'Routine', 'Diagnostics'],
    datasets: [
      {
        label: 'Hours',
        data: [45, 32, 28, 55, 20],
        backgroundColor: [
          'hsl(210 100% 50%)',
          'hsl(142 76% 36%)',
          'hsl(0 84% 60%)',
          'hsl(38 92% 50%)',
          'hsl(200 100% 60%)',
        ],
      },
    ],
  };

  // Savings Chart Data
  const savingsChartData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Cost Savings ($)',
        data: [25000, 32000, 28000, 35000],
        backgroundColor: 'hsl(142 76% 36% / 0.8)',
        borderColor: 'hsl(142 76% 36%)',
        borderWidth: 2,
      },
    ],
  };

  // Country Chart Data
  const countryChartData = {
    labels: ['USA', 'Germany', 'UK', 'Switzerland', 'Canada'],
    datasets: [
      {
        data: [35, 25, 15, 15, 10],
        backgroundColor: [
          'hsl(210 100% 50%)',
          'hsl(142 76% 36%)',
          'hsl(38 92% 50%)',
          'hsl(0 84% 60%)',
          'hsl(200 100% 60%)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        backgroundColor: 'hsl(var(--card))',
        titleColor: 'hsl(var(--card-foreground))',
        bodyColor: 'hsl(var(--card-foreground))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'hsl(var(--border))',
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
        },
      },
      x: {
        grid: {
          color: 'hsl(var(--border))',
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        backgroundColor: 'hsl(var(--card))',
        titleColor: 'hsl(var(--card-foreground))',
        bodyColor: 'hsl(var(--card-foreground))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 1,
      },
    },
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Live Dashboards</h1>
        <p className="text-muted-foreground">
          Real-time analytics and performance metrics for healthcare operations
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Users", value: "1,247", change: "+12%", icon: Users, variant: "success" },
          { title: "Active Procedures", value: "87", change: "+5%", icon: Activity, variant: "default" },
          { title: "Monthly Revenue", value: "$124K", change: "+8%", icon: TrendingUp, variant: "success" },
          { title: "Global Locations", value: "25", change: "+2", icon: Globe, variant: "default" },
        ].map((metric, index) => (
          <Card key={index} className="bg-gradient-card shadow-card-custom border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                <Badge variant={metric.variant as any} className="text-xs">
                  {metric.change}
                </Badge>
                {" "}from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dashboard Tabs */}
      <Tabs defaultValue="operations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
        </TabsList>

        {/* Operations Dashboard */}
        <TabsContent value="operations" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* User Chart */}
            <Card className="bg-gradient-card shadow-card-custom border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>User Activity Trends</span>
                </CardTitle>
                <CardDescription>Monthly active user statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Bar data={userChartData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>

            {/* Status Chart */}
            <Card className="bg-gradient-card shadow-card-custom border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <span>Procedure Status Distribution</span>
                </CardTitle>
                <CardDescription>Current status breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Doughnut data={statusChartData} options={doughnutOptions} />
                </div>
              </CardContent>
            </Card>

            {/* Date Chart */}
            <Card className="bg-gradient-card shadow-card-custom border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Weekly Procedure Volume</span>
                </CardTitle>
                <CardDescription>Procedures completed by week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Line data={dateChartData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>

            {/* Work Type Chart */}
            <Card className="bg-gradient-card shadow-card-custom border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span>Work Type Distribution</span>
                </CardTitle>
                <CardDescription>Hours spent by work category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Bar data={workTypeChartData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Financial Dashboard */}
        <TabsContent value="financial" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Savings Chart */}
            <Card className="bg-gradient-card shadow-card-custom border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Quarterly Cost Savings</span>
                </CardTitle>
                <CardDescription>Operational efficiency improvements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Bar data={savingsChartData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>

            {/* Revenue Placeholder */}
            <Card className="bg-gradient-card shadow-card-custom border-0">
              <CardHeader>
                <CardTitle>Revenue Metrics</CardTitle>
                <CardDescription>Financial performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Revenue dashboard coming soon</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Geographic Dashboard */}
        <TabsContent value="geographic" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Country Chart */}
            <Card className="bg-gradient-card shadow-card-custom border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <span>Global Distribution</span>
                </CardTitle>
                <CardDescription>Healthcare operations by country</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Doughnut data={countryChartData} options={doughnutOptions} />
                </div>
              </CardContent>
            </Card>

            {/* Geographic Placeholder */}
            <Card className="bg-gradient-card shadow-card-custom border-0">
              <CardHeader>
                <CardTitle>Regional Analytics</CardTitle>
                <CardDescription>Geographic performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Regional analytics coming soon</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}