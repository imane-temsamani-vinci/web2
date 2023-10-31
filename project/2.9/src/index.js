import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

import robotsHomepage from './img/robots-homepage.png';

const main = document.querySelector('main');

renderHomePage();

function renderHomePage() {
  const homepage = `
  <button type="button" class="btn btn-warning col-2">Login</button>
  <img class="col-12 mb-3 fixed-bottom" src="${robotsHomepage}" alt="robots">`;

  main.innerHTML = homepage;
  const button = document.querySelector('button');
  button.addEventListener('click', renderLoginPage);
}

function renderLoginPage() {
  const loginPage = `
    <!-- Pills navs -->
    <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
    <li class="nav-item" role="presentation">
        <a class="nav-link active" id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
        aria-controls="pills-login" aria-selected="true">Login</a>
    </li>
    <li class="nav-item" role="presentation">
        <a class="nav-link register" id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
        aria-controls="pills-register" aria-selected="false">Register</a>
    </li>
    </ul>
    <!-- Pills navs -->

    <!-- Pills content -->
    <div class="tab-content">
    <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
        <form>

        <!-- Email input -->
        <div class="form-outline mb-4">
            <input type="email" id="loginName" class="form-control" />
            <label class="form-label" for="loginName">Username</label>
        </div>

        <!-- Password input -->
        <div class="form-outline mb-4">
            <input type="password" id="loginPassword" class="form-control" />
            <label class="form-label" for="loginPassword">Password</label>
        </div>

        <!-- 2 column grid layout -->

        <!-- Submit button -->
        <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>
        </form>
    </div>`;
  main.innerHTML = loginPage;
  const button = document.querySelector('button');
  button.addEventListener('click', renderHomePage);

  const registerBtn = document.querySelector('.register');
  registerBtn.addEventListener('click', renderRegisterPage);
}

function renderRegisterPage() {
  const registerPage = `
  <!-- Pills navs -->
  <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
  <li class="nav-item" role="presentation">
      <a class="nav-link login" id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
      aria-controls="pills-login" aria-selected="true">Login</a>
  </li>
  <li class="nav-item" role="presentation">
      <a class="nav-link active" id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
      aria-controls="pills-register" aria-selected="false">Register</a>
  </li>
  </ul>
  <!-- Pills navs -->

  <!-- Pills content -->
  <div class="tab-content">
  <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
      <form>

      <!-- Username input -->
      <div class="form-outline mb-4">
          <input type="email" id="loginName" class="form-control" />
          <label class="form-label" for="loginName">Username</label>
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4">
          <input type="password" id="loginPassword" class="form-control" />
          <label class="form-label" for="loginPassword">Password</label>
      </div>

      <!-- Rewrite password input -->
      <div class="form-outline mb-4">
          <input type="password" id="loginPassword" class="form-control" />
          <label class="form-label" for="loginPassword">Rewrite password</label>
      </div>

      <!-- 2 column grid layout -->

      <!-- Submit button -->
      <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>
      </form>
  </div>`;
  main.innerHTML = registerPage;
  const button = document.querySelector('button');
  button.addEventListener('click', renderHomePage);

  const loginBtn = document.querySelector('.login');
  loginBtn.addEventListener('click', renderLoginPage);
}
