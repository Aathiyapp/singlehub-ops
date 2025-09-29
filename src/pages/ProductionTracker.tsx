import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, Clock, Users, TrendingUp, Plus, Search, Filter } from "lucide-react";

export default function ProductionTracker() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const productionData = [
    {
      id: "PROC001",
      procedure: "Cardiac Surgery",
      patient: "John Doe",
      surgeon: "Dr. Smith",
      room: "OR-3",
      startTime: "08:00",
      estimatedDuration: "4h 30m",
      status: "in-progress",
      progress: 65,
    },
    {
      id: "PROC002",
      procedure: "Appendectomy",
      patient: "Jane Wilson",
      surgeon: "Dr. Johnson",
      room: "OR-1",
      startTime: "09:30",
      estimatedDuration: "1h 45m",
      status: "completed",
      progress: 100,
    },
    {
      id: "PROC003",
      procedure: "Hip Replacement",
      patient: "Robert Brown",
      surgeon: "Dr. Davis",
      room: "OR-2",
      startTime: "11:00",
      estimatedDuration: "3h 15m",
      status: "scheduled",
      progress: 0,
    },
    {
      id: "PROC004",
      procedure: "Cataract Surgery",
      patient: "Mary Johnson",
      surgeon: "Dr. Wilson",
      room: "OR-4",
      startTime: "14:00",
      estimatedDuration: "45m",
      status: "prep",
      progress: 15,
    },
  ];

  const dailyMetrics = [
    { label: "Total Procedures", value: "12", change: "+2", icon: Activity },
    { label: "Completed", value: "8", change: "+1", icon: TrendingUp },
    { label: "In Progress", value: "3", change: "0", icon: Clock },
    { label: "Scheduled", value: "4", change: "+1", icon: Users },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default" className="bg-success text-success-foreground">Completed</Badge>;
      case "in-progress":
        return <Badge variant="default" className="bg-primary text-primary-foreground">In Progress</Badge>;
      case "scheduled":
        return <Badge variant="secondary">Scheduled</Badge>;
      case "prep":
        return <Badge variant="default" className="bg-warning text-warning-foreground">Prep</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredData = productionData.filter((item) => {
    const matchesSearch = 
      item.procedure.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.surgeon.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || item.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Production Tracker</h1>
          <p className="text-muted-foreground">
            Monitor real-time surgical procedures and operating room utilization
          </p>
        </div>
        <Button className="bg-gradient-primary text-white hover:opacity-90 shadow-medical">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Procedure
        </Button>
      </div>

      {/* Daily Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dailyMetrics.map((metric, index) => (
          <Card key={index} className="bg-gradient-card shadow-card-custom border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.label}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-success">
                  {metric.change}
                </span>
                {" "}from yesterday
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Production Tracking */}
      <Card className="bg-gradient-card shadow-card-custom border-0">
        <CardHeader>
          <CardTitle>Today's Procedures</CardTitle>
          <CardDescription>
            Real-time tracking of all surgical procedures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" className="space-y-4">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <TabsList>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search procedures..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="prep">Prep</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="active" className="space-y-4">
              <div className="rounded-md border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Procedure ID</TableHead>
                      <TableHead>Procedure</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Surgeon</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Start Time</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((procedure) => (
                      <TableRow key={procedure.id} className="hover:bg-muted/50">
                        <TableCell className="font-mono text-sm">{procedure.id}</TableCell>
                        <TableCell className="font-medium">{procedure.procedure}</TableCell>
                        <TableCell>{procedure.patient}</TableCell>
                        <TableCell>{procedure.surgeon}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{procedure.room}</Badge>
                        </TableCell>
                        <TableCell>{procedure.startTime}</TableCell>
                        <TableCell>{procedure.estimatedDuration}</TableCell>
                        <TableCell>{getStatusBadge(procedure.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all duration-500" 
                                style={{ width: `${procedure.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {procedure.progress}%
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="scheduled">
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Scheduled procedures for upcoming time slots
                </p>
              </div>
            </TabsContent>

            <TabsContent value="completed">
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 text-success mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Completed procedures from today
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}