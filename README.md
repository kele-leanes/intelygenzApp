
<h1 align="center">
  Intelygenz App
</h1>

<h4 align="center">An React Native app written in Typescript to browse among Marvel super heroes.</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#dependencies">Dependencies</a> •
</p>

<p align="center">
<img src='https://user-images.githubusercontent.com/57466680/182824327-503ed695-68a2-4d7b-b66e-da44996c2c86.gif' />
</p>

## Key Features

* IOS and Android support
* Responsive design
* Backend integration
* Offline support

## How To Use

```bash
# Clone this repository
$ git clone git@github.com:kele-leanes/intelygenzApp.git

# Install dependencies
$ yarn

# Install pods
$ cd ios && pod-install

# Run the app
$ yarn ios or yarn android
```
## Create .env file

* Create a developer account in https://developer.marvel.com
* Get the keys
* Create a .env file adding the keys as we have in .env.example

## Summary

In order to avoid errors I started writing the app in TypeScript. I used to splice the code as much as is possible to get cleaner code and more maintainable. Is the reason why I use the following folder structure
```
component
    components.tsx
    index.ts
    types.ts
    hooks.ts
    styles.ts
```
In the case of dependencies I tried the fewer as possible.
* async-storage (Used for offline support)
* react-navigation (Used to create a root stack for the navigation, useful if app stars growing)
* axios (Good option to make a better error handling and others benefits as Interceptors)

Also I've implemented absolute paths in order to avoid long imports e.g: `../../../../Component/...` 


## Dependencies

This software uses the following open source packages:

- [react-native-async-storage/async-storage](https://github.com/react-native-async-storage/async-storage)
- [react-navigation](https://reactnavigation.org/)
- [axios](https://github.com/axios/axios)
