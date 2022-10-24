import { getCampus } from '../lib/campus.js';
import { setupNavbar } from '../lib/setupNavbar.js';

setupNavbar(document.body);

const params = new URLSearchParams(window.location.search);
const campusId = params.get('id');
if (!campusId) {
  window.location.replace('/');
}

const { name, description, address, accreditation, logo } = await getCampus(campusId);

document.title = name;

document.querySelector('main').innerHTML = `
  <img class="logo-large" src="${logo}" width="192" height="192" />
  <div class="details">
    <h2 class="fw-bold">${name}</h2>
    <p class="fw-bold">Akreditasi: ${accreditation}</p>
    <p class="text-grey">${address}</p>
    <br />
    <p>${description}</p>
  </div>
`;
