import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Search, Star, BookOpen, Globe, FileText, Calculator, Heart } from "lucide-react";

export default function UsefulLinks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const linkCategories = [
    {
      id: "medical",
      title: "Medical Resources",
      icon: Heart,
      description: "Clinical guidelines, research, and medical databases",
      links: [
        {
          title: "PubMed",
          description: "National Library of Medicine database",
          url: "https://pubmed.ncbi.nlm.nih.gov/",
          category: "Research",
          tags: ["research", "articles", "medical"],
        },
        {
          title: "UpToDate",
          description: "Evidence-based clinical decision support",
          url: "https://www.uptodate.com/",
          category: "Clinical",
          tags: ["clinical", "guidelines", "evidence"],
        },
        {
          title: "WHO Guidelines",
          description: "World Health Organization clinical guidelines",
          url: "https://www.who.int/publications/guidelines",
          category: "Guidelines",
          tags: ["who", "guidelines", "international"],
        },
        {
          title: "FDA Drug Database",
          description: "US Food and Drug Administration drug information",
          url: "https://www.fda.gov/drugs",
          category: "Pharmaceuticals",
          tags: ["fda", "drugs", "pharmaceuticals"],
        },
      ],
    },
    {
      id: "healthcare",
      title: "Healthcare Management",
      icon: FileText,
      description: "Healthcare administration and management tools",
      links: [
        {
          title: "CMS.gov",
          description: "Centers for Medicare & Medicaid Services",
          url: "https://www.cms.gov/",
          category: "Regulatory",
          tags: ["cms", "medicare", "medicaid"],
        },
        {
          title: "Joint Commission",
          description: "Healthcare quality and safety standards",
          url: "https://www.jointcommission.org/",
          category: "Quality",
          tags: ["quality", "safety", "accreditation"],
        },
        {
          title: "HIMSS",
          description: "Healthcare Information Management Systems",
          url: "https://www.himss.org/",
          category: "Technology",
          tags: ["himss", "technology", "systems"],
        },
        {
          title: "AHRQ",
          description: "Agency for Healthcare Research and Quality",
          url: "https://www.ahrq.gov/",
          category: "Research",
          tags: ["ahrq", "research", "quality"],
        },
      ],
    },
    {
      id: "tools",
      title: "Online Tools",
      icon: Calculator,
      description: "Calculators, converters, and utility tools",
      links: [
        {
          title: "MDCalc",
          description: "Medical calculators for clinical use",
          url: "https://www.mdcalc.com/",
          category: "Calculator",
          tags: ["calculator", "clinical", "tools"],
        },
        {
          title: "Medscape Drug Interaction Checker",
          description: "Check for drug interactions",
          url: "https://reference.medscape.com/drug-interactionchecker",
          category: "Pharmaceuticals",
          tags: ["drugs", "interactions", "safety"],
        },
        {
          title: "BMI Calculator",
          description: "Body Mass Index calculator",
          url: "https://www.nhlbi.nih.gov/health/educational/lose_wt/BMI/bmicalc.htm",
          category: "Calculator",
          tags: ["bmi", "calculator", "health"],
        },
        {
          title: "Lab Values Reference",
          description: "Normal laboratory values reference",
          url: "https://www.labvaluesreference.com/",
          category: "Reference",
          tags: ["lab", "values", "reference"],
        },
      ],
    },
    {
      id: "education",
      title: "Education & Training",
      icon: BookOpen,
      description: "Medical education and continuing education resources",
      links: [
        {
          title: "NEJM Knowledge+",
          description: "New England Journal of Medicine education",
          url: "https://knowledgeplus.nejm.org/",
          category: "Education",
          tags: ["nejm", "education", "training"],
        },
        {
          title: "Coursera Healthcare Courses",
          description: "Online healthcare and medical courses",
          url: "https://www.coursera.org/browse/health",
          category: "Education",
          tags: ["coursera", "courses", "online"],
        },
        {
          title: "Khan Academy Health & Medicine",
          description: "Free medical education videos",
          url: "https://www.khanacademy.org/science/health-and-medicine",
          category: "Education",
          tags: ["khan", "videos", "free"],
        },
        {
          title: "Medline Plus",
          description: "Patient education and health information",
          url: "https://medlineplus.gov/",
          category: "Patient Education",
          tags: ["patient", "education", "information"],
        },
      ],
    },
  ];

  const allLinks = linkCategories.flatMap(category => 
    category.links.map(link => ({ ...link, categoryTitle: category.title, categoryId: category.id }))
  );

  const filteredLinks = allLinks.filter(link =>
    link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Useful Links</h1>
        <p className="text-muted-foreground">
          Curated collection of healthcare resources, tools, and educational materials
        </p>
      </div>

      {/* Search */}
      <Card className="bg-gradient-card shadow-card-custom border-0">
        <CardContent className="pt-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search links, descriptions, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          {searchQuery && (
            <p className="text-sm text-muted-foreground mt-2">
              Found {filteredLinks.length} results for "{searchQuery}"
            </p>
          )}
        </CardContent>
      </Card>

      {/* Content */}
      {searchQuery ? (
        /* Search Results */
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Search Results</h2>
          <div className="grid gap-4">
            {filteredLinks.map((link, index) => (
              <Card key={index} className="bg-gradient-card shadow-card-custom border-0 hover:shadow-medical transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-foreground hover:text-primary cursor-pointer"
                            onClick={() => openLink(link.url)}>
                          {link.title}
                        </h3>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">{link.description}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{link.categoryTitle}</Badge>
                        <Badge variant="secondary">{link.category}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {link.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openLink(link.url)}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        /* Category View */
        <Tabs defaultValue="medical" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            {linkCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-2">
                <category.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{category.title.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {linkCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-6">
              <Card className="bg-gradient-card shadow-card-custom border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <category.icon className="h-5 w-5 text-primary" />
                    <span>{category.title}</span>
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                {category.links.map((link, index) => (
                  <Card key={index} className="bg-gradient-card shadow-card-custom border-0 hover:shadow-medical transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-2">
                          <CardTitle className="text-lg hover:text-primary cursor-pointer"
                                     onClick={() => openLink(link.url)}>
                            {link.title}
                          </CardTitle>
                          <CardDescription>{link.description}</CardDescription>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">{link.category}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openLink(link.url)}
                            className="hover:bg-primary/10"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Star className="h-4 w-4 hover:text-warning" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1">
                        {link.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}

      {/* Quick Links */}
      <Card className="bg-gradient-card shadow-card-custom border-0">
        <CardHeader>
          <CardTitle>Quick Access</CardTitle>
          <CardDescription>
            Frequently used healthcare resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: "Emergency Protocols", url: "#", icon: Heart },
              { name: "Drug Reference", url: "#", icon: FileText },
              { name: "Lab Values", url: "#", icon: Calculator },
              { name: "Medical Calculator", url: "#", icon: Calculator },
            ].map((quickLink, index) => (
              <Button
                key={index}
                variant="outline"
                className="flex flex-col items-center space-y-2 h-16 hover:bg-primary/5"
                onClick={() => openLink(quickLink.url)}
              >
                <quickLink.icon className="h-5 w-5" />
                <span className="text-xs text-center">{quickLink.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="bg-muted/30 border border-muted">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <Badge variant="outline" className="mt-1">Disclaimer</Badge>
            <div className="text-sm text-muted-foreground">
              <p>
                External links are provided for informational purposes only. Please verify 
                information independently and consult with appropriate healthcare professionals. 
                Links may change or become unavailable without notice.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}