const customerInfo = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1-555-1234",
    address: "123 Main St, Anytown, USA",
    image: "images/boy pfp.png",
    imagetwo: "images/pfp girl.png"
}


const CustomerPageContainer = document.querySelector(".js-customer-grid");
let customerPageHTML = "";

customerPageHTML += `
<div class="customer-card">
            <div class="image-container">
              <img src="${customerInfo.image}" alt="#" />
            </div>
            <h3>${customerInfo.name}</h3>
            <p>Email: ${customerInfo.email}</p>
            <p>Phone: ${customerInfo.phone}</p>
            <p>Address: ${customerInfo.address}</p>
          </div>

          <div class="customer-card">
            <div class="image-container">
              <img src="${customerInfo.imagetwo}" alt="#" />
            </div>
            <h3>${customerInfo.name}</h3>
            <p>Email: ${customerInfo.email}</p>
            <p>Phone: ${customerInfo.phone}</p>
            <p>Address: ${customerInfo.address}</p>
          </div>

          <div class="customer-card">
            <div class="image-container">
              <img src="${customerInfo.image}" alt="#" />
            </div>
            <h3>Customer Name</h3>
            <p>Email: customer@example.com</p>
            <p>Phone: 123-456-7890</p>
          </div>

          <div class="customer-card">
            <div class="image-container">
              <img src="${customerInfo.imagetwo}" alt="#" />
            </div>
            <h3>${customerInfo.name}</h3>
            <p>Email: ${customerInfo.email}</p>
            <p>Phone: ${customerInfo.phone}</p>
            <p>Address: ${customerInfo.address}</p>
          </div>

          <div class="customer-card">
            <div class="image-container">
              <img src="${customerInfo.imagetwo}" alt="#" />
            </div>
            <h3>${customerInfo.name}</h3>
            <p>Email: ${customerInfo.email}</p>
            <p>Phone: ${customerInfo.phone}</p>
            <p>Address: ${customerInfo.address}</p>
          </div>
`;
CustomerPageContainer.innerHTML = customerPageHTML; 



