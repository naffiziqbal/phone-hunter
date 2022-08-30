const spinner = document.getElementById('spinner')


const loadPhones = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data);
}

// const loadPhones = (searchText) => {
//     fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
//         .then(res => res.json())
//         .then(data => displayPhone(data.data))
// }



const displayPhone = phones => {
    const phoneContainer = document.getElementById("phone-container");
    const noPhoneMessage =  document.getElementById("no-phone-message");
    phoneContainer.innerHTML = ` `;
    phones = phones.slice(0, 10);

    // Retun Error Message If No Matching Found 
    if(phones.length === 0){
       noPhoneMessage.classList.remove('d-none');

    }else{
        noPhoneMessage.classList.add('d-none')

    }

    phones.forEach(phone => {

        const newContainer = document.createElement('div');
        newContainer.classList.add('col')
        newContainer.innerHTML = ` 
        <div class="card text-center p-5">
        <img src="${phone.image}" class="card-img-top img-fluid w-75 " alt="...">
        <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
        </div>
        `;
        phoneContainer.appendChild(newContainer);
        spinner.classList.add('d-none')

    });

}

const searchPhone = () => {
    spinner.classList.remove('d-none')
    const searchFiled = document.getElementById('search-filed');
    const searchText = searchFiled.value;
    loadPhones(searchText)
}
loadPhones('phone')

