
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RedemptionType, MOCK_REDEMPTIONS, Redemption } from '@/lib/types';
import { Award, Gift, Tag, Clock, Check } from 'lucide-react';

const RedemptionPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with auth state
  const [userPoints, setUserPoints] = useState(5000); // Replace with user data
  const [redemptionHistory, setRedemptionHistory] = useState<Redemption[]>([]);
  const [availableRedemptions, setAvailableRedemptions] = useState<Redemption[]>([]);

  useEffect(() => {
    // In a real app, fetch user redemption history and available redemptions from API
    setAvailableRedemptions(MOCK_REDEMPTIONS);
    
    // Mock redemption history for demo purposes
    setRedemptionHistory([
      {
        ...MOCK_REDEMPTIONS[0],
        redeemedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      },
      {
        ...MOCK_REDEMPTIONS[3],
        redeemedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      }
    ]);
  }, []);

  const handleRedeem = (redemption: Redemption) => {
    if (!isLoggedIn) {
      navigate('/login', { state: { redirectTo: '/redemption' } });
      return;
    }

    if (userPoints < redemption.pointsRequired) {
      toast({
        title: "Not enough points",
        description: `You need ${redemption.pointsRequired - userPoints} more points to redeem this reward.`,
        variant: "destructive"
      });
      return;
    }

    // In a real app, make API call to redeem the reward
    toast({
      title: "Successfully redeemed!",
      description: `You have redeemed "${redemption.itemName}".`,
      variant: "default"
    });

    // Update user points and redemption history
    setUserPoints(prev => prev - redemption.pointsRequired);
    setRedemptionHistory(prev => [
      {
        ...redemption,
        redeemedAt: new Date()
      },
      ...prev
    ]);
  };

  // Function to switch tabs
  const switchToRewardsTab = () => {
    // Find the rewards tab trigger and click it
    const tabsTrigger = document.querySelector('[data-state="inactive"][value="rewards"]') as HTMLElement;
    if (tabsTrigger) {
      tabsTrigger.click();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-luxe-dark to-gray-900">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="luxe-container">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Loyalty <span className="text-luxe-gold">Rewards</span> Program
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Earn points with every stay and redeem them for exclusive rewards and discounts on future bookings.
            </p>
          </div>

          {isLoggedIn ? (
            <div className="mb-10 bg-gradient-to-r from-luxe-dark/80 to-gray-900/80 rounded-lg p-6 border border-gray-800">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <Award className="text-luxe-gold h-12 w-12 mr-4" />
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-white">Your Points Balance</h2>
                    <p className="text-luxe-gold text-3xl font-bold">{userPoints} points</p>
                  </div>
                </div>
                <Button className="bg-luxe-gold hover:bg-luxe-gold/80 text-black">
                  View Earning History
                </Button>
              </div>
            </div>
          ) : (
            <div className="mb-10 bg-gradient-to-r from-luxe-dark/80 to-gray-900/80 rounded-lg p-6 border border-gray-800">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <Award className="text-luxe-gold h-12 w-12 mr-4" />
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-white">Join Our Rewards Program</h2>
                    <p className="text-gray-300">Sign up to start earning points with every stay.</p>
                  </div>
                </div>
                <Button className="bg-luxe-gold hover:bg-luxe-gold/80 text-black" onClick={() => navigate('/register')}>
                  Sign Up Now
                </Button>
              </div>
            </div>
          )}

          <Tabs defaultValue="rewards" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-luxe-dark/60 border border-gray-800 rounded-lg p-1 mb-8">
              <TabsTrigger value="rewards" className="text-white data-[state=active]:bg-luxe-gold data-[state=active]:text-black">
                Available Rewards
              </TabsTrigger>
              <TabsTrigger value="history" className="text-white data-[state=active]:bg-luxe-gold data-[state=active]:text-black">
                Redemption History
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="rewards" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableRedemptions.map((redemption) => (
                  <Card key={redemption.id} className="bg-gray-900/50 border border-gray-800 overflow-hidden flex flex-col">
                    <div className="relative">
                      {redemption.imageUrl && (
                        <div 
                          className="h-48 bg-cover bg-center" 
                          style={{ backgroundImage: `url(${redemption.imageUrl})` }}
                        />
                      )}
                      <div className="absolute top-2 right-2 bg-luxe-dark/80 text-luxe-gold px-3 py-1 rounded-full flex items-center">
                        <span className="font-bold">{redemption.pointsRequired}</span>
                        <span className="ml-1 text-sm">pts</span>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        {redemption.type === RedemptionType.GIFT ? (
                          <Gift className="text-luxe-gold h-5 w-5 mr-2" />
                        ) : (
                          <Tag className="text-luxe-gold h-5 w-5 mr-2" />
                        )}
                        <CardTitle className="text-lg text-white">
                          {redemption.itemName}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-gray-400">
                        {redemption.type === RedemptionType.DISCOUNT 
                          ? `Get ${redemption.discountValue}% off your next booking` 
                          : "Exclusive luxury travel item"}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto">
                      <Button 
                        onClick={() => handleRedeem(redemption)}
                        disabled={!isLoggedIn || userPoints < redemption.pointsRequired}
                        className="w-full bg-luxe-gold hover:bg-luxe-gold/80 text-black disabled:bg-gray-700 disabled:text-gray-400"
                      >
                        {userPoints < redemption.pointsRequired 
                          ? `Need ${redemption.pointsRequired - userPoints} more points` 
                          : "Redeem Now"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="mt-0">
              {redemptionHistory.length > 0 ? (
                <div className="space-y-4">
                  {redemptionHistory.map((redemption, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between"
                    >
                      <div className="flex items-center mb-3 md:mb-0">
                        <div className="bg-luxe-dark/80 p-3 rounded-full mr-4">
                          {redemption.type === RedemptionType.GIFT ? (
                            <Gift className="text-luxe-gold h-5 w-5" />
                          ) : (
                            <Tag className="text-luxe-gold h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{redemption.itemName}</h3>
                          <div className="flex items-center text-gray-400 text-sm">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>
                              {redemption.redeemedAt && 
                                `Redeemed on ${redemption.redeemedAt.toLocaleDateString()}`}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-luxe-gold font-medium mr-4">
                          -{redemption.pointsRequired} points
                        </span>
                        <div className="bg-green-900/30 text-green-400 py-1 px-3 rounded-full flex items-center">
                          <Check className="h-4 w-4 mr-1" />
                          <span className="text-sm">Completed</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-900/30 rounded-lg border border-gray-800">
                  <Clock className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">No Redemption History</h3>
                  <p className="text-gray-400 mb-6">You haven't redeemed any rewards yet.</p>
                  <Button 
                    onClick={switchToRewardsTab}
                    variant="outline"
                    className="border-luxe-gold text-luxe-gold hover:bg-luxe-gold hover:text-black"
                  >
                    View Available Rewards
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-16 bg-luxe-dark/60 border border-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-serif font-bold text-white mb-6">How Our Rewards Program Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-luxe-gold flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-luxe-dark" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Earn Points</h3>
                <p className="text-gray-400">Earn 1 point for every $1 spent on hotel bookings through LuxeStay.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-luxe-gold flex items-center justify-center mb-4">
                  <Gift className="h-8 w-8 text-luxe-dark" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Redeem Rewards</h3>
                <p className="text-gray-400">Use your points to redeem luxury items or get discounts on future bookings.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-luxe-gold flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-luxe-dark" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Enjoy Benefits</h3>
                <p className="text-gray-400">Members also get exclusive benefits like early check-in, late check-out, and room upgrades.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RedemptionPage;
