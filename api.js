// Calling API From The API DataBase  
const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
}

const displayPhone = (phones, dataLimit) => {
    const viewAll = document.getElementById('view-all')
    const phoneContainer = document.getElementById("phone-container");
    const noPhoneMessage = document.getElementById("no-phone-message");
    phoneContainer.innerHTML = ` `;

    // Only Show 10 Phones At a Time 
    if (dataLimit && phones.length >= 10) {
        phones = phones.slice(0, 10);
        viewAll.classList.remove('d-none')

    } else {
        viewAll.classList.add('d-none')
    }

    // Retun Error Message If No Matching Found 
    if (phones.length === 0) {
        noPhoneMessage.classList.remove('d-none');

    } else {
        noPhoneMessage.classList.add('d-none')

    };



    // Making Phone Container  
    phones.forEach(phone => {

        const newContainer = document.createElement('div');
        newContainer.classList.add('col')
        newContainer.innerHTML = ` 
        <div class="card text-center p-5">
            <img src="${phone.image}" class="card-img-top img-fluid w-75 " alt="...">
            <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <button id = "details-btn" class = "btn btn-primary" onclick = "loadPhoneDetails('${phone.slug}')" data-bs-toggle="modal" data-bs-target="#displayModalDetails">Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(newContainer);
        toogleSpinner(false);
    });

}

// Intrigating loading Spinner  
const toogleSpinner = isLoading => {
    const spinner = document.getElementById('spinner')
    if (isLoading) {
        spinner.classList.remove('d-none')
    }
    else {
        spinner.classList.add('d-none')
    }
}

// Phone Searching Function  
const searchPhone = () => {
    searchProgress(10)
}



// Functionallize View All Button   




const searchProgress = (dataLimit) => {
    toogleSpinner(true);
    const searchFiled = document.getElementById('search-filed');
    const searchText = searchFiled.value;
    loadPhones(searchText, dataLimit);
    console.log(dataLimit);

}
document.getElementById('view-all').addEventListener('click', () => {
    searchProgress();
})

document.getElementById('search-filed').addEventListener("keypress", e => {
    console.log(e.key);
    if (e.key === 'Enter') {
        searchProgress(10);

    }
})




const loadPhoneDetails = async id => {

    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();

    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {

    // const displayModalDetailsLabel = document.getElementById('displayModalDetailsLabel');
    // displayModalDetailsLabel.innerText = phone.name;

    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `  
    <div class="modal-header">
      <h5 class="modal-title" id="displayModalDetailsLabel">${phone.name}</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <img src ='${phone.image}' class = 'img-fluid'>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
  </div>`;

}


// Inntially Load All Phone 
loadPhones('phone')
