const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const dataParagraph = document.querySelector('.weather-data')
const errorParagraph = document.querySelector('.error-data')


weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location = search.value

    dataParagraph.textContent = 'loading...'
    errorParagraph .textContent = ''

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {

        response.json().then((data) => {

            if (data.error){


                dataParagraph.innerHTML= ''
                errorParagraph.innerHTML = data.error
                return
            }

            errorParagraph.innerHTML = ''
            dataParagraph.innerHTML = `${data.location }. <br> ${data.forecastData}`


        })
    })

})