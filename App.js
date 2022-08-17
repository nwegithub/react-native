
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainNavigator from './src/Route/Naviagator'

import rootReducer from './src/store/reducers';
import {createStore} from 'redux'
import {Provider} from 'react-redux'


const Store =  createStore(rootReducer)


const App = () =>{
  return(
    <Provider store={Store}>
    <MainNavigator/>
    </Provider>
  )
}
export default App