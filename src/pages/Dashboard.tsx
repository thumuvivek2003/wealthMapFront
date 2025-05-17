
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Link } from "react-router-dom";
import { Filter, Download, FileText, Map } from "lucide-react";

const Dashboard = () => {
  // Mock data for charts
  const activityData = [
    { name: 'Jan', searches: 65 },
    { name: 'Feb', searches: 82 },
    { name: 'Mar', searches: 91 },
    { name: 'Apr', searches: 78 },
    { name: 'May', searches: 102 },
    { name: 'Jun', searches: 110 },
    { name: 'Jul', searches: 125 },
  ];
  
  const propertyTypeData = [
    { name: 'Residential', value: 42 },
    { name: 'Commercial', value: 28 },
    { name: 'Industrial', value: 15 },
    { name: 'Land', value: 10 },
    { name: 'Other', value: 5 },
  ];
  
  const COLORS = ['#0D62A4', '#10B5B2', '#F39C12', '#8FC4E9', '#B0E2E2'];
  
  const recentSearches = [
    { id: 1, name: 'San Francisco Properties', date: '12 min ago', count: 423 },
    { id: 2, name: 'NYC High Value', date: '2 hours ago', count: 1207 },
    { id: 3, name: 'Seattle Tech Owners', date: 'Yesterday', count: 89 },
    { id: 4, name: 'Miami Beachfront', date: '2 days ago', count: 156 },
  ];
  
  const savedViews = [
    { id: 1, name: 'Silicon Valley Tech Execs', properties: 312, lastViewed: '1 day ago' },
    { id: 2, name: 'Downtown Seattle Commercial', properties: 87, lastViewed: '3 days ago' },
    { id: 3, name: 'LA Luxury Residential', properties: 204, lastViewed: '1 week ago' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to Wealth Map. Here's an overview of your data.</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button size="sm" asChild>
            <Link to="/" className="flex items-center gap-1">
              <Map className="h-4 w-4" />
              <span>Open Map</span>
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2,847,392</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-wealth-success">+4.3%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Properties Viewed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">14,589</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-wealth-success">+12.7%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">28</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across 3 departments
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Search Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={activityData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="searches"
                    stroke="#0D62A4"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Property Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={propertyTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {propertyTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Recent Searches</CardTitle>
            <Button variant="ghost" size="sm">View all</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSearches.map((search) => (
                <div key={search.id} className="flex items-start justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                  <div>
                    <h4 className="font-medium">{search.name}</h4>
                    <p className="text-xs text-muted-foreground">{search.date}</p>
                  </div>
                  <div className="text-sm font-medium">{search.count.toLocaleString()} properties</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Saved Map Views</CardTitle>
            <Button variant="ghost" size="sm">View all</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {savedViews.map((view) => (
                <div key={view.id} className="flex items-start justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                      <Map className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium">{view.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {view.properties.toLocaleString()} properties • Last viewed {view.lastViewed}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
