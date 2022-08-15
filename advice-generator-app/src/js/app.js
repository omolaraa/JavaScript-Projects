const cardBodyAdvice = document.querySelector('section .card-body p');
const adviceNumber = document.querySelector('section .card-body h1 span')

async function getAdvice() {
    const res = await axios.get('https://api.adviceslip.com/advice');
    const data = res.data;
    console.log(data.slip);
    cardBodyAdvice.innerText = `"${data.slip.advice}"`;
    adviceNumber.innerText = `#${data.slip.id}`;
}


const dice = document.querySelector('section .dice');
dice.addEventListener('click', () => {
    getAdvice()
    .catch((err) => {
        console.log(err);
    });
})
