import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DollarSign, ArrowRightLeft, TrendingUp, Clock } from "lucide-react";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const currencies = [
    { code: "USD", name: "US Dollar", flag: "🇺🇸" },
    { code: "EUR", name: "Euro", flag: "🇪🇺" },
    { code: "GBP", name: "British Pound", flag: "🇬🇧" },
    { code: "CHF", name: "Swiss Franc", flag: "🇨🇭" },
    { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
    { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
    { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
    { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
    { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
    { code: "BRL", name: "Brazilian Real", flag: "🇧🇷" },
  ];

  const convertCurrency = async () => {
    const amountNum = parseFloat(amount);
    
    if (isNaN(amountNum) || amountNum <= 0) {
      setResult("Please enter a valid amount");
      return;
    }
    
    if (fromCurrency === toCurrency) {
      setResult(`Result: ${amountNum.toFixed(2)} ${toCurrency}`);
      setExchangeRate("1.000000");
      setLastUpdated(new Date().toLocaleString());
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const data = await response.json();
      
      if (data && data.rates && data.rates[toCurrency]) {
        const rate = data.rates[toCurrency];
        const convertedAmount = (amountNum * rate).toFixed(2);
        setResult(`${convertedAmount} ${toCurrency}`);
        setExchangeRate(rate.toFixed(6));
        setLastUpdated(new Date().toLocaleString());
      } else {
        setResult("Error: Unable to fetch exchange rate");
        setExchangeRate("");
        setLastUpdated("");
      }
    } catch (error) {
      setResult("Error: Network issue or API unavailable");
      setExchangeRate("");
      setLastUpdated("");
    } finally {
      setLoading(false);
    }
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    setResult("");
    setExchangeRate("");
    setLastUpdated("");
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Currency Converter</h1>
        <p className="text-muted-foreground">
          Real-time currency conversion for international healthcare transactions
        </p>
      </div>

      {/* Main Converter */}
      <Card className="bg-gradient-card shadow-card-custom border-0 max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-primary" />
            <span>Currency Converter</span>
          </CardTitle>
          <CardDescription>
            Convert between different currencies with live exchange rates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="Enter amount to convert"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg"
            />
          </div>

          {/* Currency Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="from-currency">From</Label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger id="from-currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center space-x-2">
                        <span>{currency.flag}</span>
                        <span>{currency.code}</span>
                        <span className="text-muted-foreground">- {currency.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={swapCurrencies}
                className="rounded-full p-2 hover:bg-primary/10"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to-currency">To</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger id="to-currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center space-x-2">
                        <span>{currency.flag}</span>
                        <span>{currency.code}</span>
                        <span className="text-muted-foreground">- {currency.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Convert Button */}
          <Button 
            onClick={convertCurrency} 
            disabled={loading}
            className="w-full bg-gradient-primary text-white hover:opacity-90 shadow-medical"
          >
            {loading ? (
              "Converting..."
            ) : (
              <>
                <DollarSign className="h-4 w-4 mr-2" />
                Convert Currency
              </>
            )}
          </Button>

          {/* Result Display */}
          {result && (
            <div className="space-y-4 p-4 bg-primary-light rounded-lg border border-primary/20">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Converted Amount</p>
                <p className="text-3xl font-bold text-foreground">{result}</p>
              </div>

              {exchangeRate && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-primary/20">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <div>
                      <p className="text-sm text-muted-foreground">Exchange Rate</p>
                      <p className="font-medium text-foreground">
                        1 {fromCurrency} = {exchangeRate} {toCurrency}
                      </p>
                    </div>
                  </div>
                  
                  {lastUpdated && (
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Last Updated</p>
                        <p className="text-sm font-medium text-foreground">{lastUpdated}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Popular Conversions */}
      <Card className="bg-gradient-card shadow-card-custom border-0">
        <CardHeader>
          <CardTitle>Popular Healthcare Currency Pairs</CardTitle>
          <CardDescription>
            Commonly used conversions in international healthcare
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { from: "USD", to: "EUR" },
              { from: "USD", to: "CHF" },
              { from: "EUR", to: "GBP" },
              { from: "USD", to: "CAD" },
              { from: "EUR", to: "CHF" },
              { from: "GBP", to: "EUR" },
              { from: "USD", to: "JPY" },
              { from: "EUR", to: "USD" },
            ].map((pair, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => {
                  setFromCurrency(pair.from);
                  setToCurrency(pair.to);
                  setResult("");
                  setExchangeRate("");
                  setLastUpdated("");
                }}
                className="justify-start"
              >
                <span className="font-mono text-xs">{pair.from} → {pair.to}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="bg-muted/30 border border-muted">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <Badge variant="outline" className="mt-1">Info</Badge>
            <div className="text-sm text-muted-foreground">
              <p>
                Exchange rates are provided by external APIs and are for informational purposes only. 
                For official transactions, please consult with your financial institution or use certified 
                financial services. Rates may vary and include additional fees from service providers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}