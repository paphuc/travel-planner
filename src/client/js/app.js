function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let placeText = document.getElementById("place").value;
  let departingText = document.getElementById("departing").value;

  Client.checkForDate(departingText);

  console.log("::: Form Submitted :::");
  fetch(
    " http://localhost:8080/plan?city=" +
      placeText +
      "&departing=" +
      departingText
  )
    .then((res) => res.json())
    .then(function (res) {
      if (res.hasOwnProperty('err')) {
        document.getElementById("err").innerHTML = "Notice: " + res.err;
        document.getElementById("weather").innerHTML = "";
        document.getElementById("temp").innerHTML = "";
        document.getElementById("daysaway").innerHTML = "";
        var elem = document.getElementById("pic");
        if (elem !== null && elem !== "undefined") {
            elem.src = "";
          } 
      } else {
        document.getElementById("err").innerHTML = "";
        document.getElementById("weather").innerHTML =
          "Weather: " + res.weather;
        document.getElementById("temp").innerHTML = "Temp: " + res.temp;
        document.getElementById("daysaway").innerHTML =
          placeText + " is " + res.daysaway + " days away";
        var elem = document.getElementById("pic");
        if (elem !== null && elem !== "undefined") {
          elem.src = res.placeImage;
        } else {
          var img = document.createElement("img");
          img.src = res.placeImage;
          img.setAttribute("id", "pic");
          document.getElementsByClassName("item3")[0].appendChild(img);
        }
      }
    });
}

export { handleSubmit };
