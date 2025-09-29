import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Search, AlertTriangle, Clock, CheckCircle, Download, Star } from "lucide-react";

export default function SOPPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const sopCategories = [
    {
      id: "emergency",
      title: "Emergency Procedures",
      description: "Critical care and emergency response protocols",
      count: 12,
      priority: "high",
      procedures: [
        {
          id: "emer-001",
          title: "Cardiac Arrest Response",
          version: "2.1",
          lastUpdated: "2024-01-15",
          steps: [
            "Call emergency team immediately",
            "Begin CPR compressions at 100-120 per minute",
            "Attach AED/defibrillator if available",
            "Establish IV access",
            "Administer medications per ACLS protocol"
          ],
          warnings: ["Ensure proper PPE", "Check pulse every 2 minutes"],
          materials: ["AED", "IV kit", "Emergency medications", "Oxygen"]
        },
        {
          id: "emer-002", 
          title: "Severe Bleeding Control",
          version: "1.8",
          lastUpdated: "2024-01-10",
          steps: [
            "Apply direct pressure to wound",
            "Elevate injured area if possible",
            "Apply pressure bandage",
            "Monitor vital signs",
            "Prepare for potential transfusion"
          ],
          warnings: ["Universal precautions required"],
          materials: ["Gauze pads", "Pressure bandages", "Gloves"]
        }
      ]
    },
    {
      id: "surgical",
      title: "Surgical Protocols",
      description: "Pre, intra, and post-operative procedures",
      count: 25,
      priority: "medium",
      procedures: [
        {
          id: "surg-001",
          title: "Pre-operative Preparation",
          version: "3.2",
          lastUpdated: "2024-01-20",
          steps: [
            "Verify patient identity and surgical site",
            "Confirm consent forms signed",
            "Review medical history and allergies",
            "Ensure NPO status maintained",
            "Complete surgical site marking",
            "Perform safety checklist"
          ],
          warnings: ["Verify correct patient", "Confirm surgical site"],
          materials: ["Surgical marker", "Consent forms", "Patient chart"]
        }
      ]
    },
    {
      id: "infection",
      title: "Infection Control",
      description: "Prevention and management of healthcare-associated infections",
      count: 18,
      priority: "high",
      procedures: []
    },
    {
      id: "medication",
      title: "Medication Administration",
      description: "Safe medication handling and administration protocols",
      count: 22,
      priority: "medium",
      procedures: []
    }
  ];

  const recentUpdates = [
    {
      id: "update-001",
      procedure: "Hand Hygiene Protocol",
      category: "Infection Control",
      version: "4.1",
      date: "2024-01-25",
      type: "Major Update"
    },
    {
      id: "update-002", 
      procedure: "IV Medication Safety",
      category: "Medication Administration",
      version: "2.8",
      date: "2024-01-23",
      type: "Minor Update"
    },
    {
      id: "update-003",
      procedure: "Surgical Timeout Checklist",
      category: "Surgical Protocols",
      version: "1.5", 
      date: "2024-01-20",
      type: "Revision"
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>;
      case "medium":
        return <Badge variant="default" className="bg-warning text-warning-foreground">Medium Priority</Badge>;
      case "low":
        return <Badge variant="secondary">Low Priority</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Standard Operating Procedures</h1>
          <p className="text-muted-foreground">
            Comprehensive healthcare protocols and procedural guidelines
          </p>
        </div>
        <Button className="bg-gradient-primary text-white hover:opacity-90 shadow-medical">
          <Download className="h-4 w-4 mr-2" />
          Export All SOPs
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-gradient-card shadow-card-custom border-0">
        <CardContent className="pt-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search procedures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="categories" className="space-y-6">
        <TabsList>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="recent">Recent Updates</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {sopCategories.map((category) => (
              <Card key={category.id} className="bg-gradient-card shadow-card-custom border-0">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <span>{category.title}</span>
                      </CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                    {getPriorityBadge(category.priority)}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{category.count} procedures</span>
                  </div>
                </CardHeader>
                
                {category.procedures.length > 0 && (
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.procedures.map((procedure) => (
                        <AccordionItem key={procedure.id} value={procedure.id}>
                          <AccordionTrigger className="text-left">
                            <div className="flex items-center justify-between w-full pr-4">
                              <span className="font-medium">{procedure.title}</span>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">v{procedure.version}</Badge>
                                <Star className="h-4 w-4 text-muted-foreground hover:text-warning cursor-pointer" />
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="space-y-4">
                            <div className="text-sm text-muted-foreground">
                              Last updated: {procedure.lastUpdated}
                            </div>
                            
                            {/* Steps */}
                            <div>
                              <h4 className="font-medium text-foreground mb-2 flex items-center">
                                <CheckCircle className="h-4 w-4 text-success mr-2" />
                                Procedure Steps
                              </h4>
                              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground ml-6">
                                {procedure.steps.map((step, index) => (
                                  <li key={index}>{step}</li>
                                ))}
                              </ol>
                            </div>

                            {/* Warnings */}
                            {procedure.warnings && procedure.warnings.length > 0 && (
                              <div>
                                <h4 className="font-medium text-foreground mb-2 flex items-center">
                                  <AlertTriangle className="h-4 w-4 text-warning mr-2" />
                                  Important Warnings
                                </h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-warning ml-6">
                                  {procedure.warnings.map((warning, index) => (
                                    <li key={index}>{warning}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Required Materials */}
                            {procedure.materials && procedure.materials.length > 0 && (
                              <div>
                                <h4 className="font-medium text-foreground mb-2">Required Materials</h4>
                                <div className="flex flex-wrap gap-2">
                                  {procedure.materials.map((material, index) => (
                                    <Badge key={index} variant="secondary">{material}</Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <Card className="bg-gradient-card shadow-card-custom border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Recent Updates</span>
              </CardTitle>
              <CardDescription>
                Latest changes and revisions to SOPs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Procedure</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUpdates.map((update) => (
                      <TableRow key={update.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{update.procedure}</TableCell>
                        <TableCell>{update.category}</TableCell>
                        <TableCell>
                          <Badge variant="outline">v{update.version}</Badge>
                        </TableCell>
                        <TableCell>{update.date}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{update.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm">
                              <Star className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites">
          <div className="text-center py-12">
            <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No favorite procedures saved yet. Star procedures to add them here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}