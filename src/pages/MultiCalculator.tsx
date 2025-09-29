import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Calendar, Percent, Heart, Activity, Clock } from "lucide-react";

export default function MultiCalculator() {
  // Date Difference Calculator
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateDiffResult, setDateDiffResult] = useState("");

  // Percentage Calculator  
  const [baseValue, setBaseValue] = useState("");
  const [percentageValue, setPercentageValue] = useState("");
  const [percentageResult, setPercentageResult] = useState("");

  // German DRG Calculator
  const [maxLos2, setMaxLos2] = useState("");
  const [bundesland, setBundesland] = useState("");
  const [col10, setCol10] = useState("");
  const [actualLos2, setActualLos2] = useState("");
  const [bundeslandResult, setBundeslandResult] = useState("");

  // Swiss DRG Calculator
  const [cw, setCw] = useState("");
  const [maxLos, setMaxLos] = useState("");
  const [drgRate, setDrgRate] = useState("");
  const [col9, setCol9] = useState("");
  const [actualLos, setActualLos] = useState("");
  const [drgResult, setDrgResult] = useState("");

  const calculateDateDifference = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start && end && !isNaN(start.getTime()) && !isNaN(end.getTime())) {
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDateDiffResult(`Difference: ${diffDays} days`);
    } else {
      setDateDiffResult('Please enter valid dates');
    }
  };

  const calculatePercentage = () => {
    const base = parseFloat(baseValue);
    const percentage = parseFloat(percentageValue);
    
    if (!isNaN(base) && !isNaN(percentage)) {
      const result = (base * percentage) / 100;
      setPercentageResult(`${percentage}% of ${base} = ${result.toFixed(2)}`);
    } else {
      setPercentageResult('Please enter valid numbers');
    }
  };

  const updateGermanDRG = () => {
    const max = parseInt(maxLos2);
    const rate = parseFloat(bundesland);
    const factor = parseFloat(col10);
    const actual = parseInt(actualLos2);

    if ([max, rate, factor, actual].some(isNaN)) {
      setBundeslandResult('Please enter valid numbers');
      return;
    }
    
    const ext = actual - max;
    if (ext <= 0) {
      setBundeslandResult("LOS within limit.");
    } else {
      const res = rate * factor * ext;
      setBundeslandResult(`Extended: ${ext} days → ${res.toFixed(2)} EUR`);
    }
  };

  const updateSwissDRG = () => {
    const c = parseFloat(cw);
    const m = parseInt(maxLos);
    const r = parseFloat(drgRate);
    const f = parseFloat(col9);
    const a = parseInt(actualLos);

    if ([c, m, r, f, a].some(isNaN)) {
      setDrgResult('Please enter valid numbers');
      return;
    }

    const basePayment = c * r;
    const ext = a - m;

    if (ext <= 0) {
      setDrgResult(`LOS within limit. Payment: ${basePayment.toFixed(2)} CHF`);
    } else {
      const comp = (ext + 1) * f;
      const finalCW = c + comp;
      const payment = finalCW * r;
      setDrgResult(`Excess days: ${ext}. Final CW: ${finalCW.toFixed(4)} → ${payment.toFixed(2)} CHF`);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Multi-Calculator</h1>
        <p className="text-muted-foreground">
          Healthcare-specific calculators and computational tools
        </p>
      </div>

      <Tabs defaultValue="date" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="date" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Date Calc</span>
          </TabsTrigger>
          <TabsTrigger value="percentage" className="flex items-center space-x-2">
            <Percent className="h-4 w-4" />
            <span className="hidden sm:inline">Percentage</span>
          </TabsTrigger>
          <TabsTrigger value="german-drg" className="flex items-center space-x-2">
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">German DRG</span>
          </TabsTrigger>
          <TabsTrigger value="swiss-drg" className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Swiss DRG</span>
          </TabsTrigger>
        </TabsList>

        {/* Date Difference Calculator */}
        <TabsContent value="date">
          <Card className="bg-gradient-card shadow-card-custom border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Date Difference Calculator</span>
              </CardTitle>
              <CardDescription>
                Calculate the difference between two dates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={calculateDateDifference} className="w-full bg-gradient-primary text-white hover:opacity-90">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Difference
              </Button>
              {dateDiffResult && (
                <div className="p-4 bg-primary-light rounded-lg border border-primary/20">
                  <p className="font-medium text-foreground">{dateDiffResult}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Percentage Calculator */}
        <TabsContent value="percentage">
          <Card className="bg-gradient-card shadow-card-custom border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Percent className="h-5 w-5 text-primary" />
                <span>Percentage Calculator</span>
              </CardTitle>
              <CardDescription>
                Calculate percentage values for medical calculations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="base-value">Base Value</Label>
                  <Input
                    id="base-value"
                    type="number"
                    placeholder="Enter base value"
                    value={baseValue}
                    onChange={(e) => setBaseValue(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="percentage-value">Percentage</Label>
                  <Input
                    id="percentage-value"
                    type="number"
                    placeholder="Enter percentage"
                    value={percentageValue}
                    onChange={(e) => setPercentageValue(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={calculatePercentage} className="w-full bg-gradient-primary text-white hover:opacity-90">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Percentage
              </Button>
              {percentageResult && (
                <div className="p-4 bg-primary-light rounded-lg border border-primary/20">
                  <p className="font-medium text-foreground">{percentageResult}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* German DRG Calculator */}
        <TabsContent value="german-drg">
          <Card className="bg-gradient-card shadow-card-custom border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-primary" />
                <span>German DRG Calculator</span>
              </CardTitle>
              <CardDescription>
                Calculate German DRG payments for extended length of stay
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="max-los-2">Maximum LOS (days)</Label>
                  <Input
                    id="max-los-2"
                    type="number"
                    placeholder="Enter max LOS"
                    value={maxLos2}
                    onChange={(e) => setMaxLos2(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bundesland">Bundesland Rate</Label>
                  <Input
                    id="bundesland"
                    type="number"
                    step="0.01"
                    placeholder="Enter rate"
                    value={bundesland}
                    onChange={(e) => setBundesland(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="col10">Cost Weight Factor</Label>
                  <Input
                    id="col10"
                    type="number"
                    step="0.0001"
                    placeholder="Enter factor"
                    value={col10}
                    onChange={(e) => setCol10(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="actual-los-2">Actual LOS (days)</Label>
                  <Input
                    id="actual-los-2"
                    type="number"
                    placeholder="Enter actual LOS"
                    value={actualLos2}
                    onChange={(e) => setActualLos2(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={updateGermanDRG} className="w-full bg-gradient-primary text-white hover:opacity-90">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate German DRG
              </Button>
              {bundeslandResult && (
                <div className="p-4 bg-primary-light rounded-lg border border-primary/20">
                  <p className="font-medium text-foreground" dangerouslySetInnerHTML={{ __html: bundeslandResult }} />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Swiss DRG Calculator */}
        <TabsContent value="swiss-drg">
          <Card className="bg-gradient-card shadow-card-custom border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-primary" />
                <span>Swiss DRG Calculator</span>
              </CardTitle>
              <CardDescription>
                Calculate Swiss DRG payments with cost weights and rates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cw">Cost Weight</Label>
                  <Input
                    id="cw"
                    type="number"
                    step="0.0001"
                    placeholder="Enter cost weight"
                    value={cw}
                    onChange={(e) => setCw(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-los">Maximum LOS (days)</Label>
                  <Input
                    id="max-los"
                    type="number"
                    placeholder="Enter max LOS"
                    value={maxLos}
                    onChange={(e) => setMaxLos(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="drg-rate">DRG Rate</Label>
                  <Input
                    id="drg-rate"
                    type="number"
                    step="0.01"
                    placeholder="Enter DRG rate"
                    value={drgRate}
                    onChange={(e) => setDrgRate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="col9">Daily Cost Weight</Label>
                  <Input
                    id="col9"
                    type="number"
                    step="0.0001"
                    placeholder="Enter daily CW"
                    value={col9}
                    onChange={(e) => setCol9(e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="actual-los">Actual LOS (days)</Label>
                  <Input
                    id="actual-los"
                    type="number"
                    placeholder="Enter actual LOS"
                    value={actualLos}
                    onChange={(e) => setActualLos(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={updateSwissDRG} className="w-full bg-gradient-primary text-white hover:opacity-90">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Swiss DRG
              </Button>
              {drgResult && (
                <div className="p-4 bg-primary-light rounded-lg border border-primary/20">
                  <p className="font-medium text-foreground" dangerouslySetInnerHTML={{ __html: drgResult }} />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}