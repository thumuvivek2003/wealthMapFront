
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, DollarSign, User, Building, Eye, Download, Bookmark } from "lucide-react";

const PropertySearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    priceRange: "",
    propertyType: "",
    netWorthRange: "",
    location: ""
  });

  // Mock search results
  const searchResults = [
    {
      id: 1,
      address: "123 Ocean Drive, Miami Beach, FL 33139",
      propertyValue: "$2,450,000",
      propertyType: "Luxury Condo",
      owner: "John Smith",
      netWorth: "$12.5M",
      confidence: "High",
      lastSale: "2021",
      sqft: "2,400",
      bedrooms: 3,
      bathrooms: 2.5
    },
    {
      id: 2,
      address: "456 Park Avenue, New York, NY 10016",
      propertyValue: "$8,750,000",
      propertyType: "Penthouse",
      owner: "Sarah Johnson",
      netWorth: "$45.2M",
      confidence: "Medium",
      lastSale: "2020",
      sqft: "4,200",
      bedrooms: 4,
      bathrooms: 3.5
    },
    {
      id: 3,
      address: "789 Beverly Hills Blvd, Beverly Hills, CA 90210",
      propertyValue: "$15,200,000",
      propertyType: "Mansion",
      owner: "Michael Chen",
      netWorth: "$89.1M",
      confidence: "High",
      lastSale: "2019",
      sqft: "8,500",
      bedrooms: 6,
      bathrooms: 7
    },
    {
      id: 4,
      address: "321 Lake Shore Drive, Chicago, IL 60611",
      propertyValue: "$3,200,000",
      propertyType: "Luxury Condo",
      owner: "Jennifer Davis",
      netWorth: "$18.7M",
      confidence: "High",
      lastSale: "2022",
      sqft: "3,100",
      bedrooms: 3,
      bathrooms: 3
    }
  ];

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getConfidenceBadge = (confidence: string) => {
    switch (confidence) {
      case "High":
        return <Badge className="bg-green-100 text-green-800 border-green-300">High</Badge>;
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Medium</Badge>;
      case "Low":
        return <Badge className="bg-red-100 text-red-800 border-red-300">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Property Search</h1>
          <p className="text-gray-600">Find properties and analyze owner wealth data with advanced search capabilities</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Search & Filters */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search Box */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Search className="w-5 h-5 mr-2 text-blue-600" />
                  Search
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Address, owner name, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </CardContent>
            </Card>

            {/* Advanced Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Filter className="w-5 h-5 mr-2 text-green-600" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Value</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                  >
                    <option value="">Any Price</option>
                    <option value="under-1m">Under $1M</option>
                    <option value="1m-5m">$1M - $5M</option>
                    <option value="5m-10m">$5M - $10M</option>
                    <option value="over-10m">Over $10M</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filters.propertyType}
                    onChange={(e) => handleFilterChange("propertyType", e.target.value)}
                  >
                    <option value="">Any Type</option>
                    <option value="condo">Condo</option>
                    <option value="house">House</option>
                    <option value="mansion">Mansion</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Owner Net Worth</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filters.netWorthRange}
                    onChange={(e) => handleFilterChange("netWorthRange", e.target.value)}
                  >
                    <option value="">Any Range</option>
                    <option value="under-10m">Under $10M</option>
                    <option value="10m-50m">$10M - $50M</option>
                    <option value="50m-100m">$50M - $100M</option>
                    <option value="over-100m">Over $100M</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                  >
                    <option value="">Any Location</option>
                    <option value="ny">New York</option>
                    <option value="ca">California</option>
                    <option value="fl">Florida</option>
                    <option value="tx">Texas</option>
                    <option value="il">Illinois</option>
                  </select>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1" onClick={() => setFilters({ priceRange: "", propertyType: "", netWorthRange: "", location: "" })}>
                    Clear
                  </Button>
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    Apply
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Saved Searches */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Saved Searches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-sm">
                    Miami Luxury $5M+
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm">
                    NYC Penthouses
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm">
                    High Net Worth CA
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search Results */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Search Results</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{searchResults.length} properties found</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    Sort: Value ↓
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {searchResults.map((property) => (
                    <Card key={property.id} className="border border-gray-200 hover:border-blue-300 transition-colors">
                      <CardContent className="p-6">
                        <div className="grid md:grid-cols-3 gap-6">
                          {/* Property Info */}
                          <div className="md:col-span-2">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="font-semibold text-lg text-gray-900 mb-1">{property.address}</h3>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                  <span className="flex items-center">
                                    <Building className="w-4 h-4 mr-1" />
                                    {property.propertyType}
                                  </span>
                                  <span>{property.bedrooms} bed, {property.bathrooms} bath</span>
                                  <span>{property.sqft} sqft</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-green-600 mb-1">{property.propertyValue}</div>
                                <div className="text-sm text-gray-600">Last sale: {property.lastSale}</div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-4">
                              <div className="bg-gray-50 rounded-lg p-3">
                                <div className="flex items-center mb-2">
                                  <User className="w-4 h-4 mr-2 text-blue-600" />
                                  <span className="text-sm font-medium text-gray-700">Property Owner</span>
                                </div>
                                <div className="font-semibold text-gray-900">{property.owner}</div>
                                <div className="text-sm text-blue-600 font-medium">Est. Net Worth: {property.netWorth}</div>
                              </div>
                              <div className="bg-gray-50 rounded-lg p-3">
                                <div className="flex items-center mb-2">
                                  <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                                  <span className="text-sm font-medium text-gray-700">Data Confidence</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  {getConfidenceBadge(property.confidence)}
                                  <span className="text-xs text-gray-500">95% accuracy</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="md:col-span-1 flex flex-col justify-between">
                            <div className="space-y-2">
                              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                              <Button variant="outline" className="w-full">
                                <MapPin className="w-4 h-4 mr-2" />
                                View on Map
                              </Button>
                              <Button variant="outline" className="w-full">
                                <Bookmark className="w-4 h-4 mr-2" />
                                Save Property
                              </Button>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <div className="text-xs text-gray-500 text-center">
                                Data updated: 2 days ago
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-8">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Previous</Button>
                    <Button size="sm" className="bg-blue-600 text-white">1</Button>
                    <Button variant="outline" size="sm">2</Button>
                    <Button variant="outline" size="sm">3</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySearch;