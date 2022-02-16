# Personal Project for DevMountain course

This is a trip planning app that I created for my DevMountain bootcamp.
## Things you can do
- Login and registration modal, logout button
![homepage](https://github.com/Ovorp/personal-project-trip-planner/blob/main/screenshots/home.JPG?raw=true)
- Check the weather by entering in a zipcode
![zicode](https://github.com/Ovorp/personal-project-trip-planner/blob/main/screenshots/zipcode.JPG?raw=true)
- Creating and selecting new trips
![trips](https://github.com/Ovorp/personal-project-trip-planner/blob/main/screenshots/trip.JPG?raw=true)
  - Each trip has the following pages
![summary](https://github.com/Ovorp/personal-project-trip-planner/blob/main/screenshots/summary.JPG?raw=true)
  - Summary page 
    - with thing that still need to be done
    - A list of people coming on the trip
  - To do list page
    - Can add items to the list
    - Can mark items as complete or unmark them
  - People page
    - Form to add people to the trip (First and Last name, email and phone number)
    - Button to send a reminder text 
  - Trip Picture page
    - Able to added pictures from local storage
![summary](https://github.com/Ovorp/personal-project-trip-planner/blob/main/screenshots/pictureslist.JPG?raw=true)

## The backend is an Express server
- Postgres relational database
- AWS S3 buckets to host images
- Twilio to send out text messages

## Frontend is built with React
- Bootstrap framework
- Axios for API calls
- Redux for state management

## Mobile is built with React Native
- Used Expo as a framework
