import { Order, OrderStatus } from './models/order';

export const MOCK_ORDERS: Order[] = [
  {
    id: 64,
    rideId: 45,
    routeId: 18,
    seatId: 2,
    userId: 3,
    status: OrderStatus.Active,
    path: [33, 5, 62, 11, 48, 34],
    carriages: ['carriage1', 'carriage2', 'carriage3', 'test'],
    schedule: {
      segments: [
        {
          time: ['2024-09-08T10:00:00.000Z', '2024-08-08T11:00:00.000Z'],
          price: { standard: 120, premium: 180 }
        },
        {
          time: ['2024-09-08T11:15:00.000Z', '2024-08-08T12:15:00.000Z'],
          price: { standard: 120, premium: 180 }
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
    carriages: ['carriage1', 'carriage2', 'carriage3', 'test'],
    schedule: {
      segments: [
        {
          time: ['2024-09-08T10:00:00.000Z', '2024-08-08T11:00:00.000Z'],
          price: { standard: 120, premium: 180 }
        },
        {
          time: ['2024-09-08T11:15:00.000Z', '2024-08-08T12:15:00.000Z'],
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
    carriages: ['carriage1', 'carriage2', 'carriage3', 'test'],
    schedule: {
      segments: [
        {
          time: ['2024-11-08T12:00:00.000Z', '2024-08-08T13:00:00.000Z'],
          price: { standard: 130, premium: 190 }
        },
        {
          time: ['2024-11-08T13:15:00.000Z', '2024-08-08T14:15:00.000Z'],
          price: { standard: 130, premium: 190 }
        }
      ]
    }
  }
];
