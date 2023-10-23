// main.js
document.addEventListener('DOMContentLoaded', function () {
    fetch('https://vd-change-api.da-io.net/wards') // Use the actual API endpoint here
        .then(response => response.json())
        .then(data => {
            const wardsList = document.getElementById('wards-list');

            // Group wards by province
            const provinces = {};
            data.forEach(ward => {
                const province = ward.province; // Adjust to the actual property name
                if (!provinces[province]) {
                    provinces[province] = [];
                }
                provinces[province].push(ward);
            });

            // Generate the HTML for each province's wards
            for (const province in provinces) {
                const provinceHeading = document.createElement('h2');
                provinceHeading.textContent = province;
                wardsList.appendChild(provinceHeading);

                const provinceWards = provinces[province];
                provinceWards.forEach(ward => {
                    const wardLink = document.createElement('a');
                    wardLink.textContent = `${ward.municipality} ${ward.ward_number}`;
                    wardLink.href = `/ward/${ward.ward_code}`;
                    wardsList.appendChild(wardLink);
                });
            }
        });
});
