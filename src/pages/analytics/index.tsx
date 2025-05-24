
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, DollarSign, Users, Building, BarChart3, PieChart, Download } from "lucide-react";

const WealthAnalytics = () => {
  const metrics = [
    {
      title: "Total Portfolio Value",
      value: "$2.8B",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign
    },
    {
      title: "Properties Tracked",
      value: "15,247",
      change: "+8.2%",
      trend: "up",
      icon: Building
    },
    {
      title: "High Net Worth Owners",
      value: "3,892",
      change: "-2.1%",
      trend: "down",
      icon: Users
    },
    {
      title: "Average Property Value",
      value: "$1.8M",
      change: "+5.7%",
      trend: "up",
      icon: TrendingUp
    }
  ];

  const topWealthOwners = [
    {
      name: "Michael Chen",
      netWorth: "$89.1M",
      properties: 12,
      totalValue: "$45.2M",
      location: "Beverly Hills, CA"
    },
    {
      name: "Sarah Johnson",
      netWorth: "$45.2M",
      properties: 8,
      totalValue: "$32.1M",
      location: "Manhattan, NY"
    },
    {
      name: "David Rodriguez",
      netWorth: "$34.7M",
      properties: 15,
      totalValue: "$28.9M",
      location: "Miami, FL"
    },
    {
      name: "Jennifer Davis",
      netWorth: "$18.7M",
      properties: 6,
      totalValue: "$15.2M",
      location: "Chicago, IL"
    },
    {
      name: "Robert Wilson",
      netWorth: "$16.3M",
      properties: 9,
      totalValue: "$12.8M",
      location: "Austin, TX"
    }
  ];

  const geographicData = [
    { state: "California", value: "$892M", properties: 4247, percentage: 32 },
    { state: "New York", value: "$654M", properties: 2891, percentage: 24 },
    { state: "Florida", value: "$421M", properties: 3156, percentage: 15 },
    { state: "Texas", value: "$318M", properties: 2103, percentage: 11 },
    { state: "Illinois", value: "$267M", properties: 1850, percentage: 10 },
    { state: "Others", value: "$248M", properties: 1000, percentage: 8 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Wealth Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive analysis of property ownership and wealth distribution patterns</p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${metric.trend === 'up' ? 'text-green-700 border-green-300 bg-green-50' : 'text-red-700 border-red-300 bg-red-50'}`}
                      >
                        {metric.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {metric.change}
                      </Badge>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${metric.trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
                    <metric.icon className={`w-6 h-6 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Top Wealth Owners */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  Top Wealth Owners
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topWealthOwners.map((owner, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{owner.name}</h4>
                          <p className="text-sm text-gray-600">{owner.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-lg text-blue-600">{owner.netWorth}</div>
                        <div className="text-sm text-gray-600">{owner.properties} properties · {owner.totalValue}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Geographic Distribution */}
          <div>
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="w-5 h-5 mr-2 text-green-600" />
                  Geographic Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {geographicData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }}
                        ></div>
                        <span className="text-sm font-medium text-gray-900">{item.state}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900">{item.value}</div>
                        <div className="text-xs text-gray-600">{item.properties} properties</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Wealth Distribution Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
                Wealth Distribution by Range
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { range: "$100M+", count: 127, percentage: 85 },
                  { range: "$50M - $100M", count: 284, percentage: 70 },
                  { range: "$10M - $50M", count: 892, percentage: 55 },
                  { range: "$1M - $10M", count: 2589, percentage: 30 }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-900">{item.range}</span>
                      <span className="text-gray-600">{item.count} owners</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Market Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-green-900">Property Values</h4>
                    <Badge className="bg-green-100 text-green-800">+12.5%</Badge>
                  </div>
                  <p className="text-sm text-green-700">Average property values increased across all tracked markets</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-blue-900">High-Value Transactions</h4>
                    <Badge className="bg-blue-100 text-blue-800">+8.3%</Badge>
                  </div>
                  <p className="text-sm text-blue-700">Increase in transactions above $10M this quarter</p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-orange-900">Market Concentration</h4>
                    <Badge className="bg-orange-100 text-orange-800">74%</Badge>
                  </div>
                  <p className="text-sm text-orange-700">Top 10% of owners control 74% of total property value</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Section */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Generate Custom Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button className="h-20 flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700">
                  <BarChart3 className="w-6 h-6 mb-2" />
                  Wealth Analysis Report
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Building className="w-6 h-6 mb-2" />
                  Property Portfolio Report
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Users className="w-6 h-6 mb-2" />
                  Owner Intelligence Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WealthAnalytics;