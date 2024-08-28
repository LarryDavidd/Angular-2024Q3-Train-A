import { Order, OrderStatus } from './models/order';

export const MOCK_ORDERS: Order[] = [
  {
    id: 1,
    rideId: 101,
    routeId: 201,
    seatId: 301,
    userId: 401,
    status: OrderStatus.Active,
    path: [1, 2, 3],
    carriages: ['A', 'B'],
    schedule: {
      segments: [
        {
          time: ['2024-08-08T08:00:00.000Z', '2024-08-08T09:00:00.000Z'],
          price: { standard: 100, premium: 150 }
        },
        {
          time: ['2024-08-08T09:15:00.000Z', '2024-08-08T10:15:00.000Z'],
          price: { standard: 100, premium: 150 }
        }
      ]
    }
  },
  {
    id: 2,
    rideId: 102,
    routeId: 202,
    seatId: 302,
    userId: 402,
    status: OrderStatus.Canceled,
    path: [4, 5, 6],
    carriages: ['C', 'D'],
    schedule: {
      segments: [
        {
          time: ['2024-08-08T10:00:00.000Z', '2024-08-08T11:00:00.000Z'],
          price: { standard: 120, premium: 180 }
        },
        {
          time: ['2024-08-08T11:15:00.000Z', '2024-08-08T12:15:00.000Z'],
          price: { standard: 120, premium: 180 }
        }
      ]
    }
  },
  {
    id: 3,
    rideId: 103,
    routeId: 203,
    seatId: 303,
    userId: 403,
    status: OrderStatus.Completed,
    path: [7, 8, 9],
    carriages: ['E', 'F'],
    schedule: {
      segments: [
        {
          time: ['2024-08-08T12:00:00.000Z', '2024-08-08T13:00:00.000Z'],
          price: { standard: 130, premium: 190 }
        },
        {
          time: ['2024-08-08T13:15:00.000Z', '2024-08-08T14:15:00.000Z'],
          price: { standard: 130, premium: 190 }
        }
      ]
    }
  }
];
