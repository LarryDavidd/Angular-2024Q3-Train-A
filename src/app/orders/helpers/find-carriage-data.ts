import { Carriage } from 'admin/carriages/model/carriages.model';
import { CarriageData } from 'orders/models/carriage-data';

export const findCarriageAndSeat = (carriage_codes: string[], carriages: Carriage[], seatId: number): CarriageData | null => {
  let seatCounter = 0;

  for (let i = 0; i < carriage_codes.length; i++) {
    const carriageCode = carriage_codes[i];
    const carriage = carriages.find((c: { code: string }) => c.code === carriageCode);

    if (!carriage) {
      console.log(`Carriage with code ${carriageCode} not found`);

      return null;
    } else {
      const totalSeatsInCarriage = carriage.rows * (carriage.leftSeats + carriage.rightSeats);

      if (seatId <= seatCounter + totalSeatsInCarriage) {
        const seatInCarriage = seatId - seatCounter;
        return {
          carriageNumber: i + 1,
          seatNumber: seatInCarriage,
          carriageCode: carriage.code
        };
      }

      seatCounter += totalSeatsInCarriage;
    }
  }

  return null;
};
