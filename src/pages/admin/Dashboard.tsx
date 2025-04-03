
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Hotel,
  BarChart4,
  ShoppingBag,
  AlertCircle,
  Search,
  Plus,
  Calendar,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Star,
  Award,
  Eye,
  Pencil,
  Trash2,
  Filter,
  MapPin
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { MOCK_HOTELS, MOCK_USERS, MOCK_REDEMPTIONS } from '@/lib/types';
import { useAuth } from '@/contexts/AuthContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter users based on search term
  const filteredUsers = MOCK_USERS.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-luxe-dark text-white">
      <Navbar />
      
      <div className="bg-gradient-to-b from-black to-luxe-dark pt-8 pb-6">
        <div className="luxe-container">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-serif font-bold flex items-center">
                Admin Dashboard
                <Badge className="ml-3 bg-luxe-gold text-black font-normal">Admin Only</Badge>
              </h1>
              <p className="text-gray-400">Welcome back, {currentUser?.name}</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="border-gray-700 text-white">
                <Calendar className="mr-2 h-4 w-4" />
                Jul 1 - Aug 1
              </Button>
              <Button variant="outline" className="border-gray-700 text-white">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <main className="flex-grow py-6">
        <div className="luxe-container">
          {/* Dashboard Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-400 text-sm font-normal">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-2xl font-bold">$428,560</div>
                    <div className="flex items-center text-emerald-500 text-sm">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      12.5% from last month
                    </div>
                  </div>
                  <div className="bg-emerald-500/20 p-2 rounded-full">
                    <DollarSign className="h-5 w-5 text-emerald-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-400 text-sm font-normal">Active Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-2xl font-bold">315</div>
                    <div className="flex items-center text-emerald-500 text-sm">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      8.1% from last month
                    </div>
                  </div>
                  <div className="bg-blue-500/20 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-400 text-sm font-normal">New Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-2xl font-bold">642</div>
                    <div className="flex items-center text-emerald-500 text-sm">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      24.3% from last month
                    </div>
                  </div>
                  <div className="bg-purple-500/20 p-2 rounded-full">
                    <Users className="h-5 w-5 text-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-gray-400 text-sm font-normal">Average Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-2xl font-bold">4.7/5</div>
                    <div className="flex items-center text-red-500 text-sm">
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      0.2 from last month
                    </div>
                  </div>
                  <div className="bg-amber-500/20 p-2 rounded-full">
                    <Star className="h-5 w-5 text-amber-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid grid-cols-4 bg-gray-800/50 mb-8">
              <TabsTrigger value="users" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Users
              </TabsTrigger>
              <TabsTrigger value="hotels" className="flex items-center">
                <Hotel className="mr-2 h-4 w-4" />
                Hotels
              </TabsTrigger>
              <TabsTrigger value="rewards" className="flex items-center">
                <Award className="mr-2 h-4 w-4" />
                Rewards
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center">
                <BarChart4 className="mr-2 h-4 w-4" />
                Reports
              </TabsTrigger>
            </TabsList>
            
            {/* Users Tab */}
            <TabsContent value="users">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle>User Management</CardTitle>
                      <CardDescription className="text-gray-400">
                        Manage user accounts, roles, and permissions
                      </CardDescription>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          type="search"
                          placeholder="Search users..."
                          className="pl-9 bg-gray-800 border-gray-700 text-white"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Button className="bg-luxe-gold hover:bg-luxe-gold/90 text-white whitespace-nowrap">
                        <Plus className="mr-2 h-4 w-4" />
                        Add User
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700 hover:bg-gray-800/50">
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Points</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id} className="border-gray-700 hover:bg-gray-800/50">
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={`
                                ${user.role === 'ADMIN' ? 'border-red-500 text-red-400' : ''}
                                ${user.role === 'HOTEL_MANAGER' ? 'border-blue-500 text-blue-400' : ''}
                                ${user.role === 'CUSTOMER' ? 'border-green-500 text-green-400' : ''}
                                ${user.role === 'GUEST' ? 'border-gray-500 text-gray-400' : ''}
                              `}
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.points.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Hotels Tab */}
            <TabsContent value="hotels">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle>Hotel Management</CardTitle>
                      <CardDescription className="text-gray-400">
                        Manage properties, rooms, and availability
                      </CardDescription>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          type="search"
                          placeholder="Search hotels..."
                          className="pl-9 bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                      <Button className="bg-luxe-gold hover:bg-luxe-gold/90 text-white whitespace-nowrap">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Hotel
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_HOTELS.map((hotel) => (
                      <Card key={hotel.id} className="bg-gray-800/50 border-gray-700">
                        <div className="relative h-44 overflow-hidden rounded-t-lg">
                          <img 
                            src={hotel.imageUrl} 
                            alt={hotel.name} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-luxe-gold text-black">
                              {hotel.rating} <Star className="ml-1 h-3 w-3" />
                            </Badge>
                          </div>
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{hotel.name}</CardTitle>
                          <CardDescription className="text-gray-400 flex items-center">
                            <MapPin className="h-3 w-3 inline mr-1" />
                            {hotel.city}, {hotel.country}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0 pb-4">
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </div>
                            <Link to={`/hotels/${hotel.id}`}>
                              <Button size="sm" variant="outline" className="border-luxe-gold text-luxe-gold h-8">
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Rewards Tab */}
            <TabsContent value="rewards">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle>Rewards Management</CardTitle>
                      <CardDescription className="text-gray-400">
                        Manage reward items, redemptions, and point values
                      </CardDescription>
                    </div>
                    <Button className="bg-luxe-gold hover:bg-luxe-gold/90 text-white whitespace-nowrap md:w-auto">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Reward Item
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_REDEMPTIONS.map((item) => (
                      <Card key={item.id} className="bg-gray-800/50 border-gray-700">
                        {item.imageUrl && (
                          <div className="h-44 overflow-hidden rounded-t-lg">
                            <img 
                              src={item.imageUrl} 
                              alt={item.itemName} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{item.itemName}</CardTitle>
                            <Badge className="bg-luxe-gold text-black">
                              {item.pointsRequired} pts
                            </Badge>
                          </div>
                          <CardDescription className="text-gray-400">
                            {item.type === 'DISCOUNT' 
                              ? `${item.discountValue}% discount on bookings` 
                              : 'Physical reward item'}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0 pb-4">
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 px-2 text-red-500 hover:text-red-600">
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                            <Button size="sm" variant="default" className="bg-luxe-gold hover:bg-luxe-gold/90 text-white h-8">
                              Update
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Reports Tab */}
            <TabsContent value="reports">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle>Analytics & Reports</CardTitle>
                  <CardDescription className="text-gray-400">
                    View performance metrics and generate reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                      <h3 className="text-lg font-medium mb-4">Monthly Bookings & Revenue</h3>
                      <div className="h-64 flex items-center justify-center border border-dashed border-gray-700 rounded bg-gray-800/30">
                        <div className="text-center">
                          <BarChart4 className="h-10 w-10 text-gray-500 mx-auto mb-2" />
                          <p className="text-gray-400">Chart visualization would appear here</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                        <h3 className="text-lg font-medium mb-4">User Demographics</h3>
                        <div className="h-48 flex items-center justify-center border border-dashed border-gray-700 rounded bg-gray-800/30">
                          <div className="text-center">
                            <Users className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                            <p className="text-gray-400">User demographic chart</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                        <h3 className="text-lg font-medium mb-4">Popular Destinations</h3>
                        <div className="h-48 flex items-center justify-center border border-dashed border-gray-700 rounded bg-gray-800/30">
                          <div className="text-center">
                            <MapPin className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                            <p className="text-gray-400">Top destination chart</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button variant="outline" className="border-gray-700 text-white">
                        Generate Report
                      </Button>
                      <Button variant="outline" className="border-gray-700 text-white">
                        Export Data
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
