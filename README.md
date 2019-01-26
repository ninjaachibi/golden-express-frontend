# Front-end for Golden Express app

Golden Express connects consumers of Asian groceries to the nearest Asian grocery store and offers on-demand grocery delivery service to your doorstep.

## The app

This React Native app is built using Expo.

## How to run

Expo should be installed. 
In your directory, run `expo start` and the app should be running on an expo server

Note: this is broken at the moment for unknown reasons. Working on a fix! -Robert

## File Structure
```
.
+-- _config.yml
+-- assets
|   +-- Beverages.png
|   ...
+-- Components
|   +-- AccountNavigator.js
|   +-- AddressScreen.js
|   ...
+-- public
|   +-- Inventory
|   ...
|   +-- New_Inventory
|   ...
+-- App.js
+-- app.json
+-- package-lock.json
+-- package.json
+-- app.json
```

Below are the folders you care about: 

### Components
This folder contains all the React components of the app. I wish it was a bit more well-organized, but generally, componenets come in two general flavors:

1. Functional Components

    These are the actual components, or "screens", that show the data we get from the backend. `ProductScreen.js` is a pretty good example of this, although it can be convoluted at parts. (needs to be cleaned up a bit). Other good examples are ``


2. Navigation and Organizational components

    Our entry way is `App.js`, which contains all of our highest level `StackNavigator`. Think of it as all the highest level modals we can see at any time. The logic is that we would want our `cart` and `checkout` to be high modals that can go above a screen. (The React Navigation API now supports modals, so we gotta update this.) 
    
    Next we go to `DrawNavigator.js`. This is our drawer, and the organization is kinda confusing; however, see that in this file we have `Interface.js`. Go to this file. Then see that we have 3 tabs across the bottom of our app. Which is the crux of our app: Home, Categories, and Search. Go take a look at these, and see that the structure is similar.


You can ignore `scripts.js`, `webpack.config.js`

## Usage Walkthrough 

[Google slide's walkthough of the mobile app](https://docs.google.com/presentation/d/1PZirkY8aWx1wD_0ech_jMaPf5K8nPcQ7hbxHgIznqAg/edit?usp=sharing "Golden Express Mobile App Walkthrough")
