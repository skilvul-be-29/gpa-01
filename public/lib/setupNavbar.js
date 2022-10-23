import { Auth } from './Auth.js';

export function setupNavbar(body) {
  body.innerHTML = `
    <nav>
      <div class="nav-logo">
        <a href="/">
          <img src="/assets/carkus.svg" alt="logo carkus" />
        </a>
      </div>
      <a class="text-black fw-600" href="/campus/">Campus</a>
      <a class="text-black fw-600" href="/threads/">Threads</a>
    </nav>
    ${body.innerHTML}
  `;

  const nav = document.querySelector('nav');
  if (Auth.currentUser) {
    nav.innerHTML += `
      <div class="avatar">
        <details>
          <summary>
            <img src="${Auth.currentUser.avatar}" height="32" width="32" />
          </summary>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="/signout/">Sign Out</a>
          </div>
        </details>
      </div>
    `;
  } else {
    nav.innerHTML += `<button onclick="window.location.href='/signin/'">Sign In</button>`;
  }
}
