import { Booking, Customer } from "@/types";

const img = (seed: string, w = 200, h = 200) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const bookings: Booking[] = [
  { id: "BK-3021", tourTitle: "Hunza Valley Luxury Escape", customer: "Ayesha Raza", email: "ayesha.raza@example.com", phone: "+92 300 1234567", date: "2026-08-04", travelers: 2, amount: 179000, status: "confirmed" },
  { id: "BK-3020", tourTitle: "Skardu Adventure Expedition", customer: "Bilal Ahmed", email: "bilal.ahmed@example.com", phone: "+92 301 2233445", date: "2026-08-09", travelers: 4, amount: 304000, status: "pending" },
  { id: "BK-3019", tourTitle: "Swat, Kalam & Malam Jabba Family Tour", customer: "Sara Malik", email: "sara.malik@example.com", phone: "+92 333 8765432", date: "2026-08-14", travelers: 5, amount: 270000, status: "confirmed" },
  { id: "BK-3018", tourTitle: "K2 Base Camp & Concordia Trek", customer: "Hamza Sheikh", email: "hamza.sheikh@example.com", phone: "+92 321 5566778", date: "2026-09-02", travelers: 6, amount: 1470000, status: "confirmed" },
  { id: "BK-3017", tourTitle: "Islamabad & Murree Honeymoon Getaway", customer: "Zainab Qureshi", email: "zainab.q@example.com", phone: "+92 345 1122334", date: "2026-08-20", travelers: 2, amount: 136000, status: "completed" },
  { id: "BK-3016", tourTitle: "Naran, Kaghan & Saif-ul-Malook Tour", customer: "Usman Tariq", email: "usman.tariq@example.com", phone: "+92 302 9988776", date: "2026-07-30", travelers: 3, amount: 144000, status: "cancelled" },
  { id: "BK-3015", tourTitle: "Lahore Heritage & Culinary City Tour", customer: "Mahnoor Iqbal", email: "mahnoor.i@example.com", phone: "+92 312 4433221", date: "2026-08-02", travelers: 2, amount: 57000, status: "confirmed" },
  { id: "BK-3014", tourTitle: "Fairy Meadows & Nanga Parbat Base Camp Trek", customer: "Faizan Chaudhry", email: "faizan.c@example.com", phone: "+92 336 7789900", date: "2026-08-16", travelers: 8, amount: 500000, status: "pending" },
];

export const customers: Customer[] = [
  { id: "CU-1042", name: "Ayesha Raza", email: "ayesha.raza@example.com", phone: "+92 300 1234567", avatar: img("cu-1"), totalBookings: 3, totalSpend: 412000, joined: "Jan 2025", status: "active" },
  { id: "CU-1041", name: "Bilal Ahmed", email: "bilal.ahmed@example.com", phone: "+92 301 2233445", avatar: img("cu-2"), totalBookings: 1, totalSpend: 304000, joined: "Mar 2026", status: "active" },
  { id: "CU-1040", name: "Sara Malik", email: "sara.malik@example.com", phone: "+92 333 8765432", avatar: img("cu-3"), totalBookings: 2, totalSpend: 486000, joined: "Nov 2024", status: "active" },
  { id: "CU-1039", name: "Hamza Sheikh", email: "hamza.sheikh@example.com", phone: "+92 321 5566778", avatar: img("cu-4"), totalBookings: 1, totalSpend: 1470000, joined: "Feb 2025", status: "active" },
  { id: "CU-1038", name: "Zainab Qureshi", email: "zainab.q@example.com", phone: "+92 345 1122334", avatar: img("cu-5"), totalBookings: 1, totalSpend: 136000, joined: "Jun 2026", status: "active" },
  { id: "CU-1037", name: "Usman Tariq", email: "usman.tariq@example.com", phone: "+92 302 9988776", avatar: img("cu-6"), totalBookings: 4, totalSpend: 298000, joined: "Aug 2023", status: "inactive" },
];

export const monthlyRevenue = [
  { month: "Feb", revenue: 1.8 },
  { month: "Mar", revenue: 2.4 },
  { month: "Apr", revenue: 3.1 },
  { month: "May", revenue: 4.6 },
  { month: "Jun", revenue: 5.2 },
  { month: "Jul", revenue: 6.4 },
];
