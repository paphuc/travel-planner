function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let placeText = document.getElementById('place').value
    let departingText = document.getElementById('departing').value

    Client.checkForDate(departingText)
    
    console.log("::: Form Submitted :::")
    let payload = {
        place: placeText,
        departing: departingText
    };
    fetch(" http://localhost:8080/plan?city="+placeText+"&departing="+departingText)
    .then(res => res.json())
    .then(function(res) {
        console.log(res.daysaway)
        document.getElementById('weather').innerHTML = "Weather: "+ res.weather
        document.getElementById('temp').innerHTML = "Temp: "+ res.temp
        document.getElementById('daysaway').innerHTML = placeText + " is "+ res.daysaway+ " days away"
        var img = document.createElement('img');
        img.src =  res.placeImage;
        document.getElementsByClassName('item3')[0].appendChild(img);
    })
    
}

export { handleSubmit }
