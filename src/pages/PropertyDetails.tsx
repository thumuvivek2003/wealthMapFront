
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Building, User, FileText, Download, Map, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const PropertyDetails = () => {
  const { id } = useParams();
  
  // In a real app, we would fetch the property details based on the ID
  // For now, we'll use a mock property
  const property = {
    id: Number(id),
    title: "Luxury Highrise Condo",
    address: "123 Market St, San Francisco, CA 94105",
    description: "Exclusive luxury high-rise condominium in San Francisco's Financial District, featuring floor-to-ceiling windows with panoramic views of the city and bay. Premium finishes, concierge services, and state-of-the-art amenities.",
    price: "$4,500,000",
    sqft: 2800,
    bedrooms: 3,
    bathrooms: 3.5,
    yearBuilt: 2018,
    type: "Residential",
    image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511",
    additionalImages: [
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc",
      "https://images.unsplash.com/photo-1617806118233-18e1de247200"
    ],
    owner: {
      name: "Pacific Heights Holdings LLC",
      type: "Limited Liability Company",
      netWorth: "$120M",
      founder: "William Chen",
      founderTitle: "Founder & CEO, TechVentures Inc.",
      properties: 8,
      totalValue: "$78.5M",
      confidenceScore: 92
    },
    transactions: [
      {
        date: "May 12, 2022",
        type: "Purchase",
        amount: "$4,200,000",
        parties: "Current Owner"
      },
      {
        date: "June 5, 2018",
        type: "Sale",
        amount: "$3,750,000",
        parties: "Previous Owner"
      },
      {
        date: "August 22, 2012",
        type: "Sale",
        amount: "$2,800,000",
        parties: "Original Developer"
      }
    ]
  };

  return (
    <div className="container py-8 max-w-6xl">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link to="/map">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">{property.title}</h1>
            <Badge className="ml-2">{property.type}</Badge>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="aspect-[16/9] rounded-lg overflow-hidden bg-muted">
              <img 
                src={property.image} 
                alt={property.title}
                className="object-cover w-full h-full"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-2 mt-2">
              {property.additionalImages.map((image, i) => (
                <div key={i} className="aspect-[4/3] rounded-md overflow-hidden bg-muted">
                  <img 
                    src={image} 
                    alt={`${property.title} - Image ${i+1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Property Details</h2>
              <p className="text-muted-foreground">{property.address}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-6">
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="font-semibold">{property.price}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Square Feet</p>
                  <p className="font-semibold">{property.sqft.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bedrooms</p>
                  <p className="font-semibold">{property.bedrooms}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bathrooms</p>
                  <p className="font-semibold">{property.bathrooms}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Year Built</p>
                  <p className="font-semibold">{property.yearBuilt}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Property Type</p>
                  <p className="font-semibold">{property.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Price per sqft</p>
                  <p className="font-semibold">${Math.round(4500000 / property.sqft)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="font-semibold">May 8, 2025</p>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-muted-foreground">{property.description}</p>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h2 className="text-xl font-semibold mb-6">Transaction History</h2>
                
                <div className="relative border-l border-border pl-6 space-y-6">
                  {property.transactions.map((transaction, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[25px] h-4 w-4 rounded-full border-4 border-wealth-blue bg-background"></div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium">{transaction.type}</p>
                          <p className="font-bold">{transaction.amount}</p>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <p className="text-muted-foreground">{transaction.parties}</p>
                          <p className="text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Location</h2>
                  <Button variant="outline" size="sm">
                    <Map className="h-4 w-4 mr-2" />
                    Open in Map View
                  </Button>
                </div>
                
                <div className="h-60 bg-muted rounded-lg mt-4 overflow-hidden">
                  <img 
                    src="https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-s+0D62A4(-122.4194,37.7749)/-122.4194,37.7749,14,0/600x400@2x?access_token=pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbG53eXNicDYwYnY4MmlsYnJ1amVyMTU3In0.X06GnUZ8_I4Mw7jqz_271A" 
                    alt="Map view of the property"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">{property.address}</p>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Owner Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{property.owner.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{property.owner.type}</p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-muted-foreground">Estimated Net Worth</p>
                    <Badge variant="outline" className="text-wealth-teal border-wealth-teal bg-wealth-teal/10">
                      {property.owner.confidenceScore}% Confidence
                    </Badge>
                  </div>
                  <p className="font-bold text-xl">{property.owner.netWorth}</p>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm font-medium">Wealth Composition</p>
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-muted-foreground">Real Estate</p>
                      <p className="text-xs font-medium">45%</p>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-muted-foreground">Stocks & Investments</p>
                      <p className="text-xs font-medium">30%</p>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-muted-foreground">Other Assets</p>
                      <p className="text-xs font-medium">25%</p>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm font-medium mb-2">Key Individual</p>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">{property.owner.founder}</p>
                      <p className="text-xs text-muted-foreground">{property.owner.founderTitle}</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm font-medium mb-1">Property Portfolio</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Properties Owned</p>
                    <p className="text-sm font-medium">{property.owner.properties}</p>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <p className="text-sm font-medium">{property.owner.totalValue}</p>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  <User className="h-4 w-4 mr-2" />
                  View Owner Profile
                </Button>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Data Sources</CardTitle>
              </CardHeader>
              <CardContent className="text-xs">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p>Property Data</p>
                    <Badge variant="outline" className="text-xs font-normal">County Records</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>Owner Information</p>
                    <Badge variant="outline" className="text-xs font-normal">WealthEngine</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>Valuation</p>
                    <Badge variant="outline" className="text-xs font-normal">CoreLogic</Badge>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4">Last updated: May 8, 2025</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
