 // JavaScript to toggle payment options based on selection
 document.getElementById('monthlyBtn').addEventListener('click', function() {
    showPaymentOptions('monthly');
  });

  document.getElementById('onceBtn').addEventListener('click', function() {
    showPaymentOptions('once');
  });

  function showPaymentOptions(type) {
    // Show payment buttons and text
    document.getElementById('paymentOptions').style.display = 'block';

    // Update the text based on the selected type
    const donationText = document.getElementById('donationText');
    if (type === 'monthly') {
      donationText.textContent = 'How would you like to donate on a monthly basis?';
    } else if (type === 'once') {
      donationText.textContent = 'How would you like to make a one-time donation?';
    }

    // Update PayPal and Visa links based on type
    const paypalBtn = document.getElementById('paypalBtn');
    const visaBtn = document.getElementById('visaBtn');
    
    if (type === 'monthly') {
      paypalBtn.onclick = function() { window.location.href = 'https://www.paypal.me/HamDogsShelter'; };
      visaBtn.onclick = function() { window.location.href = 'https://www.paypal.me/HamDogsShelter'; };
    } else if (type === 'once') {
      paypalBtn.onclick = function() { window.location.href = 'https://example.com/donate/once/paypal'; };
      visaBtn.onclick = function() { window.location.href = 'https://example.com/donate/once/visa'; };
    }
  }