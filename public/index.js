import { getCampuses } from './lib/campus.js';
import { debounce } from './lib/debounce.js';
import { setupNavbar } from './lib/setupNavbar.js';

setupNavbar(document.body);

const campuses = await getCampuses();
const main = document.querySelector('main');

renderCampuses(campuses);

let results = campuses;

document.getElementById('query').addEventListener(
  'input',
  debounce((event) => {
    const q = event.target.value;
    results = campuses.filter((campus) => {
      return campus.name.toLowerCase().includes(q.toLowerCase());
    });
    renderCampuses(results);
  })
);

function renderCampuses(campuses) {
  main.innerHTML = ``;
  campuses.forEach((campus) => {
    const { id, name, address, description, logo } = campus;
    main.innerHTML += `
        <div class="card">
          <img class="logo" src="${logo}" alt="${name}" width="128" height="128" />
          <div class="details">
            <a class="text-black" href="/campus/?id=${id}">
              <h2 class="fw-bold">${name}</h2>
            </a>
            <p class="text-grey">${address}</p>
            <p>${description.slice(0, 177).trim()}...</p>
          </div>
        </div>
      `;
  });
}
