
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Layers, 
  Filter, 
  Search, 
  Save, 
  Download,
  Map as MapIcon,
  FileText,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from '@/components/ui/badge';
import PropertyCard from '@/components/PropertyCard';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from '@/components/ui/card';
import MapboxKeyInput from '@/components/MapboxKeyInput';
import { getMapboxToken } from '@/lib/apiKeys';

const MapView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [activeTab, setActiveTab] = useState('filters');
  const [filtersPanelOpen, setFiltersPanelOpen] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [mapStyle, setMapStyle] = useState('light');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Mock properties data
  const [mockProperties, setMockProperties] = useState([
    {
      id: 1,
      lat: 37.7749,
      lng: -122.4194,
      title: "Luxury Highrise Condo",
      address: "123 Market St, San Francisco, CA",
      price: 4500000,
      priceFormatted: "$4,500,000",
      sqft: 2800,
      type: "Residential",
      image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511",
      owner: "Pacific Heights Holdings LLC",
      ownerNetWorth: 120000000,
      ownerNetWorthFormatted: "$120M",
    },
    {
      id: 2,
      lat: 37.7833,
      lng: -122.4167,
      title: "Downtown Office Building",
      address: "555 Montgomery St, San Francisco, CA",
      price: 28750000,
      priceFormatted: "$28,750,000",
      sqft: 45000,
      type: "Commercial",
      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e",
      owner: "Green Street Investments",
      ownerNetWorth: 340000000,
      ownerNetWorthFormatted: "$340M",
    },
    {
      id: 3,
      lat: 37.7694,
      lng: -122.4862,
      title: "Modern Townhouse",
      address: "1800 Divisadero St, San Francisco, CA",
      price: 2195000,
      priceFormatted: "$2,195,000",
      sqft: 1950,
      type: "Residential",
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6",
      owner: "John & Sarah Chen",
      ownerNetWorth: 8500000,
      ownerNetWorthFormatted: "$8.5M",
    },
    {
      id: 4,
      lat: 37.7850,
      lng: -122.4300,
      title: "Historic Nob Hill Apartment Building",
      address: "1100 Sacramento St, San Francisco, CA",
      price: 12500000,
      priceFormatted: "$12,500,000",
      sqft: 15000,
      type: "Residential",
      image: "https://images.unsplash.com/photo-1580041065738-e72023775cdc",
      owner: "SF Heritage Properties",
      ownerNetWorth: 75000000,
      ownerNetWorthFormatted: "$75M",
    },
    {
      id: 5,
      lat: 37.7650,
      lng: -122.4100,
      title: "Mission District Mixed-Use Building",
      address: "2500 Mission St, San Francisco, CA",
      price: 8900000,
      priceFormatted: "$8,900,000",
      sqft: 12000,
      type: "Commercial",
      image: "https://images.unsplash.com/photo-1577494237962-839d25f7c8c1",
      owner: "Urban Core Investments",
      ownerNetWorth: 95000000,
      ownerNetWorthFormatted: "$95M",
    },
  ]);

  // Filtered properties based on filters
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);

  // Filter state
  const [filters, setFilters] = useState({
    priceRange: [500000, 15000000],
    propertyTypes: {
      residential: true,
      commercial: true,
      industrial: false,
      land: false,
    },
    ownerNetWorthRange: [1000000, 500000000],
  });

  // Function to filter properties based on current filters
  const applyFilters = () => {
    const filtered = mockProperties.filter(property => {
      // Check price range
      if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
        return false;
      }

      // Check property type
      if (property.type === 'Residential' && !filters.propertyTypes.residential) {
        return false;
      }
      if (property.type === 'Commercial' && !filters.propertyTypes.commercial) {
        return false;
      }
      if (property.type === 'Industrial' && !filters.propertyTypes.industrial) {
        return false;
      }
      if (property.type === 'Land' && !filters.propertyTypes.land) {
        return false;
      }

      // Check owner net worth
      if (property.ownerNetWorth < filters.ownerNetWorthRange[0] || 
          property.ownerNetWorth > filters.ownerNetWorthRange[1]) {
        return false;
      }

      // Check search term
      if (searchTerm && !property.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !property.address.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !property.owner.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      return true;
    });

    setFilteredProperties(filtered);
    updateMapMarkers(filtered);

    toast({
      title: `${filtered.length} Properties Found`,
      description: "Filter applied successfully",
    });
  };

  const updateMapMarkers = (properties: any[]) => {
    if (!map.current || !isMapLoaded) return;

    // Clear existing markers
    const existingMarkers = document.querySelectorAll('.property-marker');
    existingMarkers.forEach(marker => marker.remove());

    // Add new markers
    properties.forEach(property => {
      // Create a DOM element for each marker
      const el = document.createElement('div');
      el.className = 'property-marker';
      el.style.width = '24px';
      el.style.height = '24px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = property.type === 'Commercial' ? '#10B5B2' : '#0D62A4';
      el.style.border = '2px solid white';
      el.style.cursor = 'pointer';
      el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
      
      // Add a click event to the marker
      el.addEventListener('click', () => {
        setSelectedProperty(property);
      });
      
      // Add marker to map
      new mapboxgl.Marker(el)
        .setLngLat([property.lng, property.lat])
        .addTo(map.current!);
    });
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePropertyTypeChange = (type: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      propertyTypes: {
        ...prev.propertyTypes,
        [type]: checked
      }
    }));
  };

  const handleSaveView = () => {
    if (!map.current) return;
    
    const center = map.current.getCenter();
    const zoom = map.current.getZoom();
    
    const viewData = {
      center: [center.lng, center.lat],
      zoom,
      filters,
      timestamp: new Date().toISOString(),
    };
    
    // Save to local storage
    const savedViews = JSON.parse(localStorage.getItem('mapSavedViews') || '[]');
    savedViews.push(viewData);
    localStorage.setItem('mapSavedViews', JSON.stringify(savedViews));
    
    toast({
      title: "View saved",
      description: "The current map view has been saved to your account",
    });
  };

  const handleMapStyleChange = (style: string) => {
    setMapStyle(style);
    if (map.current) {
      const styleUrl = `mapbox://styles/mapbox/${style}-v11`;
      map.current.setStyle(styleUrl);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Initialize map when component mounts
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    const token = getMapboxToken();
    if (!token) {
      console.log("No Mapbox token found");
      return;
    }

    // Set Mapbox token
    mapboxgl.accessToken = token;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: `mapbox://styles/mapbox/${mapStyle}-v11`,
        center: [-122.4194, 37.7749], // San Francisco
        zoom: 12,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );

      // Add markers when map loads
      map.current.on('load', () => {
        setIsMapLoaded(true);
        updateMapMarkers(filteredProperties);
      });

      // Cleanup function
      return () => {
        map.current?.remove();
      };
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }, [filteredProperties]);

  return (
    <div className="relative h-[calc(100vh-4rem)]">
      {/* Map container */}
      <div ref={mapContainer} className="absolute inset-0" />

      {/* Mapbox API Key Input */}
      <MapboxKeyInput />

      {/* Map toolbar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between">
        <div className="flex items-center space-x-2 bg-background/95 backdrop-blur-sm p-2 rounded-md shadow-md">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search address, owner, or area..." 
              className="pl-8 pr-4 w-[250px] md:w-[350px] h-9"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Layers className="h-[18px] w-[18px]" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="py-4">
                <h2 className="text-xl font-semibold mb-4">Map Layers</h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Base Map</h3>
                    <Tabs defaultValue={mapStyle} className="w-full" onValueChange={handleMapStyleChange}>
                      <TabsList className="grid grid-cols-3 w-full">
                        <TabsTrigger value="light">Light</TabsTrigger>
                        <TabsTrigger value="dark">Dark</TabsTrigger>
                        <TabsTrigger value="satellite">Satellite</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Data Layers</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-wealth-blue"></div>
                          <span className="text-sm">Property Values</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-7 px-2">
                          <MapIcon className="h-4 w-4 mr-1" /> View
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-wealth-teal"></div>
                          <span className="text-sm">Owner Net Worth</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-7 px-2">
                          <MapIcon className="h-4 w-4 mr-1" /> View
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-wealth-warning"></div>
                          <span className="text-sm">Property Density</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-7 px-2">
                          <MapIcon className="h-4 w-4 mr-1" /> View
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            className="bg-background/95 backdrop-blur-sm"
            onClick={handleSaveView}
          >
            <Save className="h-4 w-4 mr-2" />
            Save View
          </Button>
          <Button 
            variant="outline"
            className="bg-background/95 backdrop-blur-sm"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters side panel */}
      <div 
        className={`absolute top-0 bottom-0 z-20 bg-background border-r border-border transition-all duration-300 ${
          filtersPanelOpen ? 'left-0' : '-left-[320px]'
        }`}
        style={{ width: '320px' }}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold">Property Explorer</h2>
            <Button variant="ghost" size="sm" onClick={() => setFiltersPanelOpen(false)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid grid-cols-2 px-4 pt-4 pb-0 bg-transparent">
              <TabsTrigger value="filters" className="text-sm">
                <Filter className="h-3.5 w-3.5 mr-1" />
                Filters
              </TabsTrigger>
              <TabsTrigger value="results" className="text-sm">
                <FileText className="h-3.5 w-3.5 mr-1" />
                Results
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="filters" className="flex-1 overflow-auto p-4 mt-0">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price Range</label>
                  <div className="pt-6">
                    <Slider
                      value={filters.priceRange}
                      min={100000}
                      max={30000000}
                      step={100000}
                      minStepsBetweenThumbs={1}
                      onValueChange={(value) => handleFilterChange('priceRange', value)}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>${(filters.priceRange[0] / 1000000).toFixed(1)}M</span>
                    <span>${(filters.priceRange[1] / 1000000).toFixed(1)}M</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Property Type</label>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      className={`cursor-pointer ${filters.propertyTypes.residential ? 'bg-wealth-blue hover:bg-wealth-blue/80' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                      onClick={() => handlePropertyTypeChange('residential', !filters.propertyTypes.residential)}
                    >
                      Residential
                    </Badge>
                    <Badge
                      className={`cursor-pointer ${filters.propertyTypes.commercial ? 'bg-wealth-teal hover:bg-wealth-teal/80' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                      onClick={() => handlePropertyTypeChange('commercial', !filters.propertyTypes.commercial)}
                    >
                      Commercial
                    </Badge>
                    <Badge
                      className={`cursor-pointer ${filters.propertyTypes.industrial ? 'bg-wealth-blue hover:bg-wealth-blue/80' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                      onClick={() => handlePropertyTypeChange('industrial', !filters.propertyTypes.industrial)}
                    >
                      Industrial
                    </Badge>
                    <Badge
                      className={`cursor-pointer ${filters.propertyTypes.land ? 'bg-wealth-teal hover:bg-wealth-teal/80' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                      onClick={() => handlePropertyTypeChange('land', !filters.propertyTypes.land)}
                    >
                      Land
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Owner Net Worth</label>
                  <div className="pt-6">
                    <Slider
                      value={filters.ownerNetWorthRange}
                      min={0}
                      max={1000000000}
                      step={1000000}
                      minStepsBetweenThumbs={1}
                      onValueChange={(value) => handleFilterChange('ownerNetWorthRange', value)}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>${(filters.ownerNetWorthRange[0] / 1000000).toFixed(1)}M</span>
                    <span>${(filters.ownerNetWorthRange[1] / 1000000).toFixed(0)}M</span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button className="w-full" onClick={applyFilters}>Apply Filters</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="results" className="flex-1 overflow-auto p-4 mt-0">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{filteredProperties.length} Properties</span>
                  <Button variant="outline" size="sm">Sort</Button>
                </div>
                
                {filteredProperties.length > 0 ? filteredProperties.map((property) => (
                  <Card 
                    key={property.id} 
                    className={`cursor-pointer hover:border-primary transition-colors ${
                      selectedProperty?.id === property.id ? 'border-primary' : ''
                    }`}
                    onClick={() => setSelectedProperty(property)}
                  >
                    <CardContent className="p-3">
                      <div className="flex flex-col space-y-3">
                        <div className="aspect-video relative rounded-sm overflow-hidden">
                          <img 
                            src={property.image} 
                            alt={property.title}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 px-2">
                            {property.type}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">{property.title}</div>
                          <div className="text-xs text-muted-foreground">{property.address}</div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="font-medium text-sm">{property.priceFormatted}</span>
                            <span className="text-xs">{property.sqft} sqft</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No properties match your current filters</p>
                    <Button 
                      variant="link" 
                      onClick={() => {
                        // Reset filters to default
                        setFilters({
                          priceRange: [100000, 30000000],
                          propertyTypes: {
                            residential: true,
                            commercial: true,
                            industrial: false,
                            land: false,
                          },
                          ownerNetWorthRange: [0, 1000000000],
                        });
                        setSearchTerm('');
                        setFilteredProperties(mockProperties);
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Toggle button for filters panel */}
      {!filtersPanelOpen && (
        <button 
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-background border border-border border-l-0 rounded-r-md p-1 z-20"
          onClick={() => setFiltersPanelOpen(true)}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
      
      {/* Selected property details panel */}
      {selectedProperty && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-10">
          <PropertyCard 
            property={selectedProperty} 
            onClose={() => setSelectedProperty(null)}
          />
        </div>
      )}

      {/* No Mapbox token message */}
      {!getMapboxToken() && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
          <div className="bg-background p-8 rounded-lg shadow-lg max-w-md text-center">
            <h2 className="text-xl font-bold mb-4">Mapbox API Key Required</h2>
            <p className="mb-4">Please enter your Mapbox API key to use the map functionality.</p>
            <p className="text-sm text-muted-foreground mb-4">
              Get your public token from <a href="https://mapbox.com/account/access-tokens" target="_blank" rel="noreferrer" className="underline">mapbox.com</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
