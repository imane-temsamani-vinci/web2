const MAXQUESTIONS = 3;
const HomePage = () => {
  const main = document.querySelector('main');
  main.innerHTML = '<form> </form>';

  fetch('http://localhost:3000/questions')
  .then((response) => {
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    return response.json();
  })
  .then((questions) => {
    renderQuestions(questions);
  })
  .catch((err) => {
    console.error('HomePage::error: ', err);
  });

};

function renderQuestions(questions) {
  const form = document.querySelector('form');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < MAXQUESTIONS; i++) {
    const index = getRandomInt(questions.length);
    form.innerHTML += `
      <h3><b> ${questions[index].question} </b></h3>
    `;
    questions[index].answers.forEach(element => {
      form.innerHTML += `
        <div>
          <label>${element.text} </label><input type="radio" name="answer"/>
        </div><br>
      `;
    });
  }
  form.innerHTML+= '<input type="submit" value="Calculate my score" />';
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default HomePage;
