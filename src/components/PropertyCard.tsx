
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, User, Building, FileText, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

interface PropertyCardProps {
  property: {
    id: number;
    title: string;
    address: string;
    price: string;
    sqft: number;
    type: string;
    image: string;
    owner: string;
    ownerNetWorth: string;
  };
  onClose: () => void;
}

const PropertyCard = ({ property, onClose }: PropertyCardProps) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <Card className="shadow-lg overflow-hidden animate-scale-in">
      <div className="relative aspect-video">
        <img 
          src={property.image} 
          alt={property.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h2 className="font-bold text-xl">{property.title}</h2>
          <p className="text-white/80 text-sm">{property.address}</p>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 bg-black/20 text-white hover:bg-black/40 hover:text-white"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <Badge className="absolute top-3 left-3 bg-wealth-blue">{property.type}</Badge>
      </div>
      
      <CardContent className="p-4">
        <Tabs defaultValue="details">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="details">
              <Building className="h-3.5 w-3.5 mr-1.5" />
              Property
            </TabsTrigger>
            <TabsTrigger value="owner">
              <User className="h-3.5 w-3.5 mr-1.5" />
              Owner
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4 mt-0">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Price</p>
                <p className="font-medium">{property.price}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Size</p>
                <p className="font-medium">{property.sqft.toLocaleString()} sqft</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Type</p>
                <p className="font-medium">{property.type}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Last Sale</p>
                <p className="font-medium">Oct 2022</p>
              </div>
            </div>
            
            <div>
              <p className="text-xs text-muted-foreground mb-1">Property Value Trend (5 years)</p>
              <Progress value={80} className="h-2 bg-muted" />
              <div className="flex justify-between text-xs mt-1">
                <span>+23.4%</span>
                <span className="text-muted-foreground">vs. market +18.7%</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="owner" className="space-y-4 mt-0">
            <div>
              <p className="text-xs text-muted-foreground">Owner</p>
              <p className="font-medium">{property.owner}</p>
              
              <div className="flex items-center justify-between mt-3">
                <p className="text-xs text-muted-foreground">Estimated Net Worth</p>
                <Badge variant="outline" className="text-wealth-teal border-wealth-teal">
                  High Confidence
                </Badge>
              </div>
              <p className="font-bold text-lg">{property.ownerNetWorth}</p>
            </div>
            
            <div>
              <p className="text-xs text-muted-foreground mb-1">Wealth Composition</p>
              <div className="h-3 w-full rounded-full overflow-hidden flex">
                <div className="bg-wealth-blue h-full" style={{ width: '45%' }}></div>
                <div className="bg-wealth-teal h-full" style={{ width: '30%' }}></div>
                <div className="bg-wealth-warning h-full" style={{ width: '25%' }}></div>
              </div>
              <div className="flex text-xs justify-between mt-1">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-wealth-blue"></div>
                  <span>Real Estate</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-wealth-teal"></div>
                  <span>Stocks</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-wealth-warning"></div>
                  <span>Other</span>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-xs text-muted-foreground">Properties Owned</p>
              <p className="font-medium">12 properties • Total value: $78.3M</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 gap-2">
        <Button variant="outline" className="flex-1">
          <FileText className="h-4 w-4 mr-2" />
          Report
        </Button>
        <Button className="flex-1" onClick={handleViewDetails}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
