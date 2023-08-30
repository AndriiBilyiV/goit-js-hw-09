import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    setTimeout(() => {
      return Promise.resolve({position, delay}).then(({position, delay}) => Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`))
  },delay)
  } else {
    setTimeout(() => {
      return Promise.reject({position, delay}).catch(({position, delay}) => Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`))
    },delay)
  }  
}


function start(currentDelay, delayStep, amount) {
  console.log(currentDelay, delayStep, amount, typeof(amount));
  for (let i = 1; i <= amount; i += 1) {
    console.log(i)
      console.log('time')
      createPromise(i, currentDelay);
      currentDelay += delayStep;
  }
}


const btn = document.querySelector('button[type="submit"]');

btn.addEventListener('click', (ent) => {
  ent.preventDefault();
  const amountValue = Number(document.querySelector('input[name="amount"]').value);
  const stepValue = Number(document.querySelector('input[name="step"]').value);
  const delayValue = Number(document.querySelector('input[name="delay"]').value);
  start(delayValue, stepValue, amountValue)
})

