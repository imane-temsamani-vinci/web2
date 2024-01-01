const HomePage = () => {
  const main = document.querySelector('main');
  main.innerHTML = 'Deal with the content of your HomePage';
  fetch('https://v2.jokeapi.dev/joke/Programming?type=single')
  .then((response) => {
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    return response.json();
  })
  .then((joke) => {
    main.innerHTML += `
    <p>Category : ${joke.category}</p>
    <p>Joke : ${joke.joke}</p>
    `;
  })
  .catch((err) => {
    console.error('HomePage::error: ', err);
  });
};

export default HomePage;
