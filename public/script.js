const subBtn =  document.getElementById("subBtn");

const handleBtn = () => {
    if ("geolocation" in navigator) {
        //console.log('geolocation avaialble')
        navigator.geolocation.getCurrentPosition( async (position) => {
            //console.log(position);
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            document.getElementById("latitude").textContent = lat;
            document.getElementById("longitude").textContent = long;

            const api_url=`/weather/${lat},${long}`;
        
            const response = await fetch(api_url);
            const jsondata = await response.json();
            console.log(jsondata);

            const data = { lat, long, position };
            const options = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }

            const res = await fetch('/api', options);
            const json = await res.json();
            console.log(json);
        });
    
    } else {
        console.log('geolocation not avaialble')
    } 
}

subBtn.addEventListener("click", handleBtn);