# Weather Now

**Weather Now** is a weather forecasting application built to quickly check current weather conditions for any city. The app provides real-time weather updates with user-friendly visuals and interactive features to enhance the user experience.

---

## Features

### 1. **Search for Weather by City**
- Enter the name of a city to fetch its current weather conditions.
- Autocompletes and displays results for accurate city identification.

### 2. **Real-Time Weather Details**
- Displays current temperature, wind speed, and humidity levels.
- Indicates whether it's daytime or nighttime using weather icons and metadata.

### 3. **Responsive Design**
- A visually appealing design that adapts seamlessly to devices of all sizes.
- Intuitive UI with an animated header for a fun user experience.


---

## Technology Stack

1. **Frontend**
   - **React**: For creating reusable components and managing state.
   - **CSS**: For styling, including responsive designs and animations.
   - **Lucide Icons**: For clean, visually appealing icons (e.g., search, wind, location).
   
2. **API**
   - **Open-Meteo API**: Provides weather data including real-time conditions, hourly forecasts, and location-specific metrics.

3. **Geocoding**
   - Geocoding API integrated for city-to-latitude/longitude conversion for precise weather data retrieval.

---

## How It Works

### 1. **City Search**
When the user types a city name, the application fetches the latitude and longitude using the Geocoding API. If the city is not found, an error message is displayed.

### 2. **Fetch Weather Data**
The app uses the retrieved coordinates to make a request to the Open-Meteo API for real-time weather data. This includes:
- **Current Temperature**: Displayed in Celsius.
- **Humidity**: Indicates moisture levels in the atmosphere.
- **Wind Speed**: Highlights the current wind conditions.

### 3. **Responsive Weather Display**
The weather information is displayed in a clean and organized layout:
- The city and region appear prominently.
- Weather stats (temperature, humidity, and wind speed) are visualized with relevant icons.

---

## Setup Instructions

1. ```git clone git@github.com:akshayamaram/weather-now.git```
2. ```cd weather-app```
3. ```npm install```
4. ```npm run dev```
