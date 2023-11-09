/*
   FileName: SophisticatedCode.js

   Description: This code demonstrates a complex and sophisticated implementation
   in JavaScript. It includes various advanced concepts such as asynchronous
   programming, object-oriented programming, event handling, and functional
   programming.

   This code is an online ticket booking system for a cinema. It utilizes 
   Promises, ES6 classes, arrow functions, and other modern JavaScript features
   to provide a seamless and efficient user experience.

   Author: John Doe
   Last Modified: 2022-01-01
*/

// Constants
const MAX_SEATS = 100;
const TICKET_PRICE = 10;
const CURRENCY = "USD";

// Class representing a Seat
class Seat {
  constructor(number, status, reservedBy) {
    this.number = number;
    this.status = status;
    this.reservedBy = reservedBy;
  }
}

// Class representing the Cinema Hall
class CinemaHall {
  constructor() {
    this.seats = [];
    this.generateSeats();
  }

  generateSeats() {
    for (let i = 1; i <= MAX_SEATS; i++) {
      this.seats.push(new Seat(i, "available", null));
    }
  }

  reserveSeat(number, user) {
    const seat = this.seats.find((seat) => seat.number === number);

    if (seat && seat.status === "available") {
      seat.status = "reserved";
      seat.reservedBy = user;
      return Promise.resolve("Seat reserved successfully!");
    } else {
      return Promise.reject("Seat is either unavailable or already reserved!");
    }
  }

  cancelReservation(number, user) {
    const seat = this.seats.find(
      (seat) => seat.number === number && seat.reservedBy === user
    );

    if (seat && seat.status === "reserved") {
      seat.status = "available";
      seat.reservedBy = null;
      return Promise.resolve("Reservation canceled successfully!");
    } else {
      return Promise.reject("Seat reservation does not exist or unauthorized!");
    }
  }
}

// Helper function to format currency
const formatCurrency = (amount, currency) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);

// Main function to handle user interactions
const main = async () => {
  const hall = new CinemaHall();
  console.log("Welcome to the Cinema Ticket Booking System!");

  while (true) {
    console.log("\n1. Reserve a seat");
    console.log("2. Cancel seat reservation");
    console.log("3. Exit");
    const choice = parseInt(prompt("Enter your choice:"), 10);

    if (choice === 1) {
      const seatNumber = parseInt(prompt("Enter seat number:"), 10);
      try {
        const successMessage = await hall.reserveSeat(seatNumber, "John Doe");
        console.log(successMessage);
        console.log(
          `Ticket price: ${formatCurrency(TICKET_PRICE, CURRENCY)}`
        );
      } catch (error) {
        console.log(error);
      }
    } else if (choice === 2) {
      const seatNumber = parseInt(prompt("Enter seat number:"), 10);
      try {
        const successMessage = await hall.cancelReservation(
          seatNumber,
          "John Doe"
        );
        console.log(successMessage);
      } catch (error) {
        console.log(error);
      }
    } else if (choice === 3) {
      console.log("Thank you for using the Cinema Ticket Booking System!");
      break;
    } else {
      console.log("Invalid choice! Please try again.");
    }
  }
};

// Start the ticket booking system
main();