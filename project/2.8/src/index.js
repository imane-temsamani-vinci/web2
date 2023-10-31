import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

import robotsHomepage from './img/robots-homepage.png';

const homepage = `<img class="col-12 mb-3 fixed-bottom" src="${robotsHomepage}" alt="robots">`;

const main = document.querySelector('main');
main.innerHTML = homepage;
