const weather = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');
const msg3 = document.querySelector('#msg3');
const msg4 = document.querySelector('#msg4');

weather.addEventListener('submit',(e) => {
    e.preventDefault();
    const location = search.value;
    console.log(location);
    msg1.textContent = 'Loading.....';
    msg2.textContent = '';
    msg3.textContent = '';
    msg4.textContent = '';
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                msg1.textContent = data.error;
            }
            else{
                msg1.textContent = 'Weather description: '+data.forecast;
                msg2.textContent = 'Location: '+data.location;
                msg3.textContent = 'Precipitation: '+ data.precip+'% Chance';
                msg4.textContent = 'वर्तमान मे ' + data.temperature +'°C तापमान बाहर है। यह '+data.feelslike+'°C की तरह लगता है।';
            }
        })
})
})