
export const mockDelay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// --- Types ---
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'guard' | 'resident';
}

export interface House {
  id: string;
  block: string;
  unitNumber: string;
  ownerName: string;
  contactNumber: string;
  status: 'occupied' | 'vacant' | 'renovation';
}

export interface Resident {
  id: string;
  name: string;
  email: string;
  phone: string;
  houseId: string;
  type: 'owner' | 'tenant' | 'family';
  status: 'active' | 'inactive';
}

export interface Visitor {
  id: string;
  name: string;
  licensePlate?: string;
  visitDate: string;
  houseId: string;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected' | 'checked-in' | 'checked-out';
}

// --- Seed Data ---
const USERS: User[] = [
  { id: '1', name: 'System Admin', email: 'admin@dc2.com', role: 'admin' },
  { id: '2', name: 'Security Guard', email: 'guard@dc2.com', role: 'guard' },
  { id: '3', name: 'John Resident', email: 'resident@dc2.com', role: 'resident' },
];

const HOUSES: House[] = [
  { id: 'h1', block: 'A', unitNumber: '10-01', ownerName: 'John Doe', contactNumber: '555-0101', status: 'occupied' },
  { id: 'h2', block: 'A', unitNumber: '10-02', ownerName: 'Alice Smith', contactNumber: '555-0102', status: 'vacant' },
  { id: 'h3', block: 'B', unitNumber: '05-05', ownerName: 'Bob Jones', contactNumber: '555-0103', status: 'renovation' },
];

const RESIDENTS: Resident[] = [
  { id: 'r1', name: 'John Doe', email: 'john@example.com', phone: '555-0101', houseId: 'h1', type: 'owner', status: 'active' },
  { id: 'r2', name: 'Jane Doe', email: 'jane@example.com', phone: '555-0104', houseId: 'h1', type: 'family', status: 'active' },
];

const VISITORS: Visitor[] = [
  { id: 'v1', name: 'Delivery Guy', licensePlate: 'WXYZ 123', visitDate: new Date().toISOString(), houseId: 'h1', purpose: 'Delivery', status: 'checked-in' },
  { id: 'v2', name: 'Guest User', licensePlate: 'ABCD 456', visitDate: new Date().toISOString(), houseId: 'h3', purpose: 'Visit', status: 'pending' },
];

// --- Mock Service ---
export const mockApi = {
  auth: {
    login: async (email: string, _password: string): Promise<{ user: User; token: string }> => {
      await mockDelay();
      const user = USERS.find((u) => u.email === email);
      if (!user) throw new Error('Invalid credentials');
      
      let token = 'mock-jwt-token-123';
      if (user.role === 'resident') token = 'mock-jwt-token-resident';
      
      return { user, token };
    },
    me: async (token: string): Promise<User> => {
       await mockDelay();
       if (token === 'mock-jwt-token-resident') {
           return USERS.find(u => u.email === 'resident@dc2.com')!;
       }
       if (token === 'mock-jwt-token-123') {
           return USERS[0];
       }
       throw new Error('Unauthorized');
    }
  },
  houses: {
    list: async (): Promise<House[]> => {
      await mockDelay();
      return [...HOUSES];
    },
    get: async (id: string): Promise<House | undefined> => {
      await mockDelay();
      return HOUSES.find((h) => h.id === id);
    },
    update: async (id: string, data: Partial<House>): Promise<House> => {
        await mockDelay();
        const index = HOUSES.findIndex(h => h.id === id);
        if (index === -1) throw new Error('House not found');
        HOUSES[index] = { ...HOUSES[index], ...data };
        return HOUSES[index];
    }
  },
  residents: {
    list: async (): Promise<Resident[]> => {
       await mockDelay();
       return [...RESIDENTS];
    }
  },
  visitors: {
     list: async (): Promise<Visitor[]> => {
        await mockDelay();
        return [...VISITORS];
     },
     create: async (data: Partial<Visitor>): Promise<Visitor> => {
        await mockDelay();
        const newVisitor: Visitor = {
            id: String(VISITORS.length + 1),
            name: data.name || 'Unknown',
            licensePlate: data.licensePlate,
            visitDate: data.visitDate || new Date().toISOString(),
            purpose: data.purpose || 'Visit',
            status: 'pending',
            houseId: data.houseId || 'h1',
        };
        VISITORS.push(newVisitor);
        return newVisitor;
    }
  },
  users: {
      list: async (): Promise<User[]> => {
          await mockDelay();
          return [...USERS];
      }
  },
  payments: {
      list: async (): Promise<{id: string, month: string, amount: number, status: string}[]> => {
          await mockDelay();
          return [
              { id: '1', month: 'December 2025', amount: 150, status: 'unpaid' },
              { id: '2', month: 'November 2025', amount: 150, status: 'paid' },
              { id: '3', month: 'October 2025', amount: 150, status: 'paid' },
          ];
      },
      pay: async (_id: string) => {
          await mockDelay(800);
          return { success: true };
      }
  }
};
