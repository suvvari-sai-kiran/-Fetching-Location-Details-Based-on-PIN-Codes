async function fetchLocationDetails() {
    const pincode = document.getElementById('pincode').value;
    const resultDiv = document.getElementById('result');
    
    if (pincode) {
        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            if (data[0].Status === 'Success') {
                const postOfficeDetails = data[0].PostOffice[0];
                const locationDetails = `
                    <p><strong>Post Office:-</strong> ${postOfficeDetails.Name}</p>
                    <p><strong>City:-</strong> ${postOfficeDetails.Block}</p>
                    <p><strong>District:-</strong> ${postOfficeDetails.District}</p>
                    <p><strong>State:-</strong> ${postOfficeDetails.State}</p>
                    <p><strong>Country:-</strong> ${postOfficeDetails.Country}</p>
                `;
                resultDiv.innerHTML = locationDetails;
            } else {
                resultDiv.innerHTML = '<p>Invalid PIN code or no data found.</p>';
            }
        } catch (error) {
            resultDiv.innerHTML = `<p>Error fetching location details: ${error.message}</p>`;
        }
    } else {
        resultDiv.innerHTML = '<p>Please enter a PIN code.</p>';
    }
}
