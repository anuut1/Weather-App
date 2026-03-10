    const API_KEY = "ccd74a22b10b796955f78438d002cb1e";
    let unit = "metric";
    let currentCity = "";

    const searchInput = document.getElementById("searchInput");
    const searchBtn   = document.getElementById("searchBtn");
    const geoBtn      = document.getElementById("geoBtn");
    const unitBtn     = document.getElementById("unitBtn");
    const errorMsg    = document.getElementById("errorMsg");
    const loading     = document.getElementById("loading");
    const weatherCard = document.getElementById("weatherCard");

    function unitLabel()  { return unit === "metric" ? "°C" : "°F"; }
    function speedLabel() { return unit === "metric" ? "m/s" : "mph"; }
    function iconUrl(code){ return `https://openweathermap.org/img/wn/${code}@2x.png`; }

    function showLoading() {
      loading.style.display = "flex";
      weatherCard.style.display = "none";
      errorMsg.style.display = "none";
    }
    function hideLoading() { loading.style.display = "none"; }
    function showError(msg) {
      hideLoading();
      errorMsg.textContent = "⚠ " + msg;
      errorMsg.style.display = "block";
      weatherCard.style.display = "none";
    }

    const AQI_INFO = [
      null,
      { label: "Good",      desc: "Air quality is satisfactory with little or no risk.",               color: "#3fb950" },
      { label: "Fair",      desc: "Acceptable; some pollutants may be a minor concern.",                color: "#c9b458" },
      { label: "Moderate",  desc: "Sensitive individuals may experience some health effects.",          color: "#f0883e" },
      { label: "Poor",      desc: "Everyone may begin to experience health effects.",                   color: "#f85149" },
      { label: "Very Poor", desc: "Health warnings — emergency conditions for the entire population.", color: "#b03030" }
    ];

    async function fetchWeather(city) {
      currentCity = city;
      showLoading();
      try {
        const [weatherRes, forecastRes] = await Promise.all([
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`),
          fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}&cnt=40`)
        ]);
        if (!weatherRes.ok) { showError("City not found. Please check the spelling."); return; }
        const weather  = await weatherRes.json();
        const forecast = await forecastRes.json();
        const { lat, lon } = weather.coord;
        const aqiRes  = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const aqiData = aqiRes.ok ? await aqiRes.json() : null;
        hideLoading();
        renderWeather(weather);
        renderSunriseSunset(weather);
        if (aqiData) renderAQI(aqiData);
        renderForecast(forecast);
        weatherCard.style.display = "block";
      } catch(e) {
        showError("Network error. Please check your connection and try again.");
      }
    }

    async function fetchByCoords(lat, lon) {
      showLoading();
      try {
        const [weatherRes, forecastRes, aqiRes] = await Promise.all([
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`),
          fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}&cnt=40`),
          fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        ]);
        if (!weatherRes.ok) { showError("Could not fetch weather for your location."); return; }
        const weather  = await weatherRes.json();
        const forecast = await forecastRes.json();
        const aqiData  = aqiRes.ok ? await aqiRes.json() : null;
        currentCity = weather.name;
        searchInput.value = weather.name;
        hideLoading();
        renderWeather(weather);
        renderSunriseSunset(weather);
        if (aqiData) renderAQI(aqiData);
        renderForecast(forecast);
        weatherCard.style.display = "block";
      } catch(e) {
        showError("Network error. Please check your connection and try again.");
      }
    }

    function renderWeather(data) {
      document.getElementById("cityName").textContent    = data.name;
      document.getElementById("countryName").textContent = data.sys.country || "";
      document.getElementById("tempBig").textContent     = Math.round(data.main.temp) + unitLabel();
      document.getElementById("feelsLike").textContent   = `Feels like ${Math.round(data.main.feels_like)}${unitLabel()}`;
      document.getElementById("description").textContent = data.weather[0].description;
      document.getElementById("weatherIcon").src         = iconUrl(data.weather[0].icon);
      document.getElementById("humidity").textContent    = data.main.humidity + "%";
      document.getElementById("wind").textContent        = data.wind.speed + " " + speedLabel();
      document.getElementById("visibility").textContent  = data.visibility ? (data.visibility / 1000).toFixed(1) + " km" : "N/A";
      document.getElementById("pressure").textContent    = data.main.pressure + " hPa";
    }

    function renderSunriseSunset(data) {
      const sunrise = new Date(data.sys.sunrise * 1000);
      const sunset  = new Date(data.sys.sunset  * 1000);
      const now     = new Date();
      const fmt = t => t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      document.getElementById("sunriseTime").textContent = fmt(sunrise);
      document.getElementById("sunsetTime").textContent  = fmt(sunset);
      const diffMs = sunset - sunrise;
      const diffH  = Math.floor(diffMs / 3600000);
      const diffM  = Math.floor((diffMs % 3600000) / 60000);
      document.getElementById("dayLength").textContent = `${diffH}h ${diffM}m daylight`;
      const total   = sunset - sunrise;
      const elapsed = now    - sunrise;
      let   pct     = Math.max(0, Math.min(1, elapsed / total));
      if (now < sunrise) pct = 0;
      if (now > sunset)  pct = 1;
      // Animate arc stroke
      document.getElementById("arcTraveled").style.strokeDashoffset = 1000 * (1 - pct);
      // Move dot along quadratic bezier P(t)
      const t  = pct;
      const P0 = { x: 20,  y: 45  };
      const P1 = { x: 200, y: -20 };
      const P2 = { x: 380, y: 45  };
      const sx = (1-t)*(1-t)*P0.x + 2*t*(1-t)*P1.x + t*t*P2.x;
      const sy = (1-t)*(1-t)*P0.y + 2*t*(1-t)*P1.y + t*t*P2.y;
      document.getElementById("sunDot").setAttribute("cx", sx.toFixed(2));
      document.getElementById("sunDot").setAttribute("cy", sy.toFixed(2));
    }

    function renderAQI(data) {
      const aqi  = data.list[0].main.aqi;
      const comp = data.list[0].components;
      const info = AQI_INFO[aqi];
      const badge = document.getElementById("aqiBadge");
      badge.className = `aqi-badge aqi-${aqi}`;
      document.getElementById("aqiNum").textContent   = aqi;
      document.getElementById("aqiLabel").textContent = info.label;
      document.getElementById("aqiLabel").style.color = info.color;
      document.getElementById("aqiDesc").textContent  = info.desc;
      // Marker position: aqi 1–5 → 10%–90%
      const pct = 10 + ((aqi - 1) / 4) * 80;
      const marker = document.getElementById("aqiMarker");
      marker.style.left       = pct + "%";
      marker.style.background = info.color;
      marker.style.boxShadow  = `0 0 6px ${info.color}`;
      // Pollutant breakdown
      const pollutants = [
        { name: "PM2.5", val: comp.pm2_5 },
        { name: "PM10",  val: comp.pm10  },
        { name: "O₃",    val: comp.o3    },
        { name: "NO₂",   val: comp.no2   },
        { name: "SO₂",   val: comp.so2   },
        { name: "CO",    val: comp.co    },
      ];
      document.getElementById("aqiPollutants").innerHTML = pollutants.map(p => `
        <div class="pollutant">
          <div class="p-name">${p.name}</div>
          <div class="p-val">${p.val !== undefined ? p.val.toFixed(1) : "—"}<span class="p-unit"> μg/m³</span></div>
        </div>
      `).join("");
    }

    function renderForecast(data) {
      const today  = new Date().toLocaleDateString("en-CA");
      const dayMap = {};
      for (const item of data.list) {
        const date = item.dt_txt.split(" ")[0];
        if (date === today) continue;
        if (!dayMap[date]) dayMap[date] = [];
        dayMap[date].push(item);
      }
      const days = Object.keys(dayMap).slice(0, 5);
      const grid = document.getElementById("forecastGrid");
      grid.innerHTML = "";
      for (const date of days) {
        const entries = dayMap[date];
        const entry   = entries.find(e => e.dt_txt.includes("12:00:00")) || entries[Math.floor(entries.length / 2)];
        const minTemp = Math.min(...entries.map(e => e.main.temp_min));
        const maxTemp = Math.max(...entries.map(e => e.main.temp_max));
        const dayName = new Date(date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short" });
        const card = document.createElement("div");
        card.className = "forecast-card";
        card.innerHTML = `
          <div class="day">${dayName}</div>
          <img src="${iconUrl(entry.weather[0].icon)}" alt="${entry.weather[0].description}" />
          <div class="fc-temp">${Math.round(maxTemp)}${unitLabel()}</div>
          <div class="fc-low">${Math.round(minTemp)}${unitLabel()}</div>
          <div class="fc-desc">${entry.weather[0].description}</div>
        `;
        grid.appendChild(card);
      }
    }

    // Events
    searchBtn.addEventListener("click", () => {
      const city = searchInput.value.trim();
      if (city) fetchWeather(city);
    });
    searchInput.addEventListener("keypress", e => {
      if (e.key === "Enter") { const city = searchInput.value.trim(); if (city) fetchWeather(city); }
    });
    unitBtn.addEventListener("click", () => {
      unit = unit === "metric" ? "imperial" : "metric";
      unitBtn.textContent = unit === "metric" ? "Switch to °F" : "Switch to °C";
      if (currentCity) fetchWeather(currentCity);
    });
    geoBtn.addEventListener("click", () => {
      if (!navigator.geolocation) { showError("Geolocation is not supported by your browser."); return; }
      geoBtn.textContent = "⏳";
      geoBtn.disabled = true;
      navigator.geolocation.getCurrentPosition(
        pos => {
          geoBtn.textContent = "📍";
          geoBtn.disabled = false;
          fetchByCoords(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          geoBtn.textContent = "📍";
          geoBtn.disabled = false;
          showError("Location access denied. Please search manually.");
        }
      );
    });