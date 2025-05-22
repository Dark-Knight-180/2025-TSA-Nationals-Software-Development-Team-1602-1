import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Calendar, ArrowRight, Loader2, Plus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

// Type for a saved location entry
type SavedLocation = {
  id: string;
  location: string;
  date: string;
  top_crops: string[];
  coordinates: { lat: number; lng: number };
}

export default function AccountPage() {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    // Redirect if not logged in
    if (!loading && !user) {
      navigate('/');
    }

    // Fetch saved locations from Supabase
    const fetchSavedLocations = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('saved_locations')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          throw error;
        }
        
        // Format data for UI
        const formattedData = data.map(location => ({
          id: location.id,
          location: location.location,
          date: location.date,
          top_crops: location.top_crops,
          coordinates: location.coordinates
        }));
        
        setSavedLocations(formattedData);
      } catch (error: any) {
        console.error('Error fetching saved locations:', error.message);
        toast({
          title: "Error fetching locations",
          description: "We couldn't load your saved locations. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoadingData(false);
      }
    };

    if (user) {
      fetchSavedLocations();
    }
  }, [user, loading, navigate, toast]);

  // Show loader while checking auth or loading data
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <section className="py-12">
        <div className="neurocrop-container">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header and sign out button */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">
                  Your NeuroCrop Account
                </h1>
                <p className="text-muted-foreground">
                  View and manage your saved crop recommendations and analyses.
                </p>
              </div>
              <Button onClick={signOut} variant="outline">
                Sign Out
              </Button>
            </div>

            {/* Account info card */}
            <div className="bg-card rounded-xl border border-border/50 p-6 mb-8">
              <h2 className="text-xl font-medium mb-2">Account Information</h2>
              <p className="text-muted-foreground mb-1">Email: {user.email}</p>
              <p className="text-muted-foreground">Member since: {new Date(user.created_at).toLocaleDateString()}</p>
            </div>

            {/* Saved locations header and add button */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Your Saved Locations</h2>
              <Button asChild size="sm">
                <a href="/map-tool">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Location
                </a>
              </Button>
            </div>

            {/* Saved locations list or loading/empty state */}
            {loadingData ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" />
                <span>Loading your saved data...</span>
              </div>
            ) : savedLocations.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {savedLocations.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-medium mb-2">{item.location}</h3>
                            <div className="flex items-center text-sm text-muted-foreground mb-4">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>
                                {item.coordinates.lat.toFixed(4)}, {item.coordinates.lng.toFixed(4)}
                              </span>
                              <span className="mx-2">•</span>
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>{new Date(item.date).toLocaleDateString()}</span>
                            </div>
                            <div>
                              <span className="text-sm font-medium mb-1">Top recommended crops:</span>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {item.top_crops.map((crop, i) => (
                                  <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                    {crop}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" className="flex-shrink-0" asChild>
                            <a href={`/map-tool?location=${item.id}`}>
                              View Details
                              <ArrowRight className="ml-2 w-4 h-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-muted/50 rounded-xl border border-border/50 p-8 text-center">
                <p className="text-muted-foreground mb-4">You haven't saved any locations yet.</p>
                <Button asChild>
                  <a href="/map-tool">Try the Map Tool</a>
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}