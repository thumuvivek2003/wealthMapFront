
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getMapboxToken, setMapboxToken } from '@/lib/apiKeys';
import { useToast } from "@/hooks/use-toast";

export default function MapboxKeyInput() {
  const [token, setToken] = useState(getMapboxToken() || '');
  const [isVisible, setIsVisible] = useState(!getMapboxToken());
  const { toast } = useToast();

  const handleSave = () => {
    if (!token.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid Mapbox token",
        variant: "destructive"
      });
      return;
    }

    setMapboxToken(token);
    setIsVisible(false);
    toast({
      title: "Success",
      description: "Mapbox token saved successfully. Refresh the page to apply changes.",
    });
    // Force reload to reinitialize the map with the new token
    window.location.reload();
  };

  if (!isVisible) {
    return (
      <Button 
        variant="outline" 
        onClick={() => setIsVisible(true)}
        className="absolute top-4 right-4 z-20 bg-background/95 backdrop-blur-sm"
      >
        Change Mapbox API Key
      </Button>
    );
  }

  return (
    <div className="absolute top-4 right-4 z-20 p-4 bg-background/95 backdrop-blur-sm rounded-md shadow-lg border border-border flex flex-col gap-2 max-w-sm">
      <h3 className="font-semibold">Enter Mapbox API Key</h3>
      <p className="text-xs text-muted-foreground">
        Get your public token from <a href="https://mapbox.com/account/access-tokens" target="_blank" rel="noreferrer" className="underline">mapbox.com</a>
      </p>
      <Input 
        value={token} 
        onChange={(e) => setToken(e.target.value)}
        placeholder="pk.eyJ1IjoieW91..."
        className="w-full"
      />
      <div className="flex gap-2">
        <Button variant="ghost" onClick={() => setIsVisible(false)}>Cancel</Button>
        <Button onClick={handleSave}>Save Token</Button>
      </div>
    </div>
  );
}
