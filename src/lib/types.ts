
export enum UserRole {
  GUEST = "GUEST",
  CUSTOMER = "CUSTOMER",
  HOTEL_MANAGER = "HOTEL_MANAGER",
  ADMIN = "ADMIN"
}

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  points: number;
  avatar?: string;
};

export enum RoomType {
  STANDARD = "STANDARD",
  DELUXE = "DELUXE",
  SUITE = "SUITE",
  PRESIDENTIAL = "PRESIDENTIAL"
}

export enum RedemptionType {
  GIFT = "GIFT",
  DISCOUNT = "DISCOUNT"
}

export enum ReportType {
  INAPPROPRIATE = "INAPPROPRIATE",
  MISLEADING = "MISLEADING",
  SPAM = "SPAM",
  OFFENSIVE = "OFFENSIVE"
}

export type Hotel = {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  amenities: string[];
  managerId?: string;
};

export type Room = {
  id: string;
  hotelId: string;
  type: RoomType;
  name: string;
  description: string;
  capacity: number;
  price: number;
  imageUrl: string;
  amenities: string[];
  status: "AVAILABLE" | "BOOKED";
};

export type Booking = {
  id: string;
  userId: string;
  hotelId: string;
  roomId: string;
  checkInDate: Date;
  checkOutDate: Date;
  status: "CONFIRMED" | "CANCELLED" | "COMPLETED";
  totalPrice: number;
  pointsEarned: number;
  discountApplied?: number;
  couponCode?: string;
};

export type Review = {
  id: string;
  userId: string;
  hotelId: string;
  bookingId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  reply?: string;
  reported?: boolean;
  reportType?: ReportType;
};

export type Redemption = {
  id: string;
  userId: string;
  type: RedemptionType;
  itemName: string;
  pointsRequired: number;
  discountValue?: number;
  imageUrl?: string;
  redeemedAt?: Date;
};

export type Coupon = {
  id: string;
  code: string;
  discountPercentage: number;
  validUntil: Date;
  description: string;
};

// Mock data for initial rendering
export const MOCK_HOTELS: Hotel[] = [
  {
    id: "1",
    name: "The Grand Plaza",
    description: "A luxurious hotel in the heart of the city with stunning views and premium amenities.",
    address: "123 Luxury Avenue",
    city: "New York",
    country: "USA",
    imageUrl: "https://images.unsplash.com/photo-1551038247-3d9af20df552",
    rating: 4.8,
    reviewCount: 420,
    amenities: ["Pool", "Spa", "Gym", "Restaurant", "WiFi"]
  },
  {
    id: "2",
    name: "Royal Elegance Hotel",
    description: "Experience the royal treatment with our premium suites and world-class service.",
    address: "456 Elegance Street",
    city: "Paris",
    country: "France",
    imageUrl: "https://images.unsplash.com/photo-1551038247-3d9af20df552",
    rating: 4.9,
    reviewCount: 350,
    amenities: ["Pool", "Spa", "Gym", "Restaurant", "WiFi", "Bar"]
  },
  {
    id: "3",
    name: "Seaside Luxury Resort",
    description: "Relax and unwind in our beachfront resort with stunning ocean views and private access to the beach.",
    address: "789 Coastal Road",
    city: "Miami",
    country: "USA",
    imageUrl: "https://images.unsplash.com/photo-1551038247-3d9af20df552",
    rating: 4.7,
    reviewCount: 280,
    amenities: ["Private Beach", "Pool", "Spa", "Water Sports", "Restaurant"]
  },
  {
    id: "4",
    name: "Mountain View Lodge",
    description: "A peaceful retreat in the mountains with breathtaking views and outdoor activities.",
    address: "101 Mountain Path",
    city: "Aspen",
    country: "USA",
    imageUrl: "https://images.unsplash.com/photo-1551038247-3d9af20df552",
    rating: 4.6,
    reviewCount: 210,
    amenities: ["Hiking Trails", "Ski Access", "Fireplace", "Hot Tub", "Restaurant"]
  },
  {
    id: "5",
    name: "Oriental Harmony Hotel",
    description: "Experience the perfect blend of traditional and modern luxury in the heart of Asia.",
    address: "202 Harmony Road",
    city: "Tokyo",
    country: "Japan",
    imageUrl: "https://images.unsplash.com/photo-1551038247-3d9af20df552",
    rating: 4.9,
    reviewCount: 390,
    amenities: ["Hot Springs", "Traditional Garden", "Tea Ceremony", "Fine Dining", "Spa"]
  },
  {
    id: "6",
    name: "Desert Oasis Resort",
    description: "A luxurious escape in the desert with private pools and stunning sunset views.",
    address: "303 Oasis Boulevard",
    city: "Dubai",
    country: "UAE",
    imageUrl: "https://images.unsplash.com/photo-1551038247-3d9af20df552",
    rating: 4.8,
    reviewCount: 320,
    amenities: ["Private Pools", "Desert Safari", "Spa", "Fine Dining", "Air Conditioning"]
  }
];

export const MOCK_ROOMS: Record<string, Room[]> = {
  "1": [
    {
      id: "101",
      hotelId: "1",
      type: RoomType.STANDARD,
      name: "Deluxe King Room",
      description: "Spacious room with king-sized bed and city view",
      capacity: 2,
      price: 350,
      imageUrl: "https://images.unsplash.com/photo-1551038247-3d9af20df552",
      amenities: ["King Bed", "City View", "WiFi", "Minibar", "Room Service"],
      status: "AVAILABLE"
    },
    {
      id: "102",
      hotelId: "1",
      type: RoomType.DELUXE,
      name: "Premium Suite",
      description: "Luxury suite with separate living area and panoramic views",
      capacity: 2,
      price: 550,
      imageUrl: "https://images.unsplash.com/photo-1551038247-3d9af20df552",
      amenities: ["King Bed", "Separate Living Area", "Panoramic View", "Jacuzzi", "Premium Toiletries"],
      status: "AVAILABLE"
    },
    {
      id: "103",
      hotelId: "1",
      type: RoomType.SUITE,
      name: "Executive Suite",
      description: "Elegant suite with executive lounge access and butler service",
      capacity: 2,
      price: 750,
      imageUrl: "https://images.unsplash.com/photo-1551038247-3d9af20df552",
      amenities: ["King Bed", "Executive Lounge Access", "Butler Service", "Champagne Bar", "Luxury Bathroom"],
      status: "BOOKED"
    }
  ]
};

export const MOCK_REDEMPTIONS: Redemption[] = [
  {
    id: "1",
    userId: "",
    type: RedemptionType.GIFT,
    itemName: "Luxury Travel Luggage",
    pointsRequired: 5000,
    imageUrl: "https://images.unsplash.com/photo-1551038247-3d9af20df552"
  },
  {
    id: "2",
    userId: "",
    type: RedemptionType.GIFT,
    itemName: "Premium Water Bottle",
    pointsRequired: 1000,
    imageUrl: "https://images.unsplash.com/photo-1551038247-3d9af20df552"
  },
  {
    id: "3",
    userId: "",
    type: RedemptionType.GIFT,
    itemName: "High-Capacity Power Bank",
    pointsRequired: 3000,
    imageUrl: "https://images.unsplash.com/photo-1551038247-3d9af20df552"
  },
  {
    id: "4",
    userId: "",
    type: RedemptionType.DISCOUNT,
    itemName: "10% Discount on Next Booking",
    pointsRequired: 2000,
    discountValue: 10
  },
  {
    id: "5",
    userId: "",
    type: RedemptionType.DISCOUNT,
    itemName: "25% Discount on Next Booking",
    pointsRequired: 4000,
    discountValue: 25
  },
  {
    id: "6",
    userId: "",
    type: RedemptionType.DISCOUNT,
    itemName: "50% Discount on Next Booking",
    pointsRequired: 8000,
    discountValue: 50
  }
];

export const MOCK_COUPONS: Coupon[] = [
  {
    id: "1",
    code: "WELCOME10",
    discountPercentage: 10,
    validUntil: new Date("2024-12-31"),
    description: "10% off for new customers"
  },
  {
    id: "2",
    code: "SUMMER25",
    discountPercentage: 25,
    validUntil: new Date("2024-08-31"),
    description: "25% off for summer bookings"
  },
  {
    id: "3",
    code: "LUXURY15",
    discountPercentage: 15,
    validUntil: new Date("2024-12-31"),
    description: "15% off for luxury suites"
  }
];
