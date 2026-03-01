document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("bookingForm");
    const checkin = document.getElementById("checkin");
    const checkout = document.getElementById("checkout");
    const roomType = document.getElementById("roomType");
    const guests = document.getElementById("guests");

    const checkinError = document.getElementById("checkinError");
    const checkoutError = document.getElementById("checkoutError");
    const roomError = document.getElementById("roomError");
    const guestError = document.getElementById("guestError");

    const summary = document.getElementById("bookingSummary");
    const summaryRoom = document.getElementById("summaryRoom");
    const summaryNights = document.getElementById("summaryNights");
    const summaryPrice = document.getElementById("summaryPrice");

    // Room Prices
    const roomPrices = {
        "Single": 1000,
        "Double": 2000,
        "Suite": 3500
    };

    // Set minimum date as today
    const today = new Date().toISOString().split("T")[0];
    checkin.setAttribute("min", today);
    checkout.setAttribute("min", today);

    // Adjust checkout when checkin changes
    checkin.addEventListener("change", function () {
        checkout.value = "";
        checkout.setAttribute("min", checkin.value);
        checkinError.textContent = "";
        checkoutError.textContent = "";
    });

    form.addEventListener("submit", function (e) {

        e.preventDefault(); // Prevent default submission

        let isValid = true;

        const checkinDate = new Date(checkin.value);
        const checkoutDate = new Date(checkout.value);

        // Clear previous errors
        checkinError.textContent = "";
        checkoutError.textContent = "";
        roomError.textContent = "";
        guestError.textContent = "";

        // Check-in validation
        if (!checkin.value) {
            checkinError.textContent = "Please select a check-in date.";
            isValid = false;
        }

        // Check-out validation
        if (!checkout.value) {
            checkoutError.textContent = "Please select a check-out date.";
            isValid = false;
        }

        if (checkout.value && checkin.value && checkoutDate <= checkinDate) {
            checkoutError.textContent = "Check-out must be after check-in.";
            isValid = false;
        }

        // Room validation
        if (!roomType.value) {
            roomError.textContent = "Please select a room type.";
            isValid = false;
        }

        // Guest validation
        if (!guests.value || guests.value < 1) {
            guestError.textContent = "Please enter a valid number of guests.";
            isValid = false;
        }

        if (isValid) {

            // Calculate nights
            const timeDiff = checkoutDate - checkinDate;
            const nights = timeDiff / (1000 * 60 * 60 * 24);

            // Calculate price
            const selectedRoom = roomType.value;
            const pricePerNight = roomPrices[selectedRoom];
            const totalPrice = nights * pricePerNight;

            // Update summary
            summaryRoom.textContent = selectedRoom;
            summaryNights.textContent = nights;
            summaryPrice.textContent = totalPrice;

            summary.style.display = "block";
        }
    });

});