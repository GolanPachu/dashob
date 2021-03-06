import { combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import { createStore } from 'redux';
import boards from './boards/reducer';
import activeTab from './activeTab/reducer'

const rootReducer = combineReducers({
    boards,
    activeTab
});

const persistConfig = {
    transforms: [immutableTransform({
        whitelist: ['boards', 'activeTab']
      })],
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const persistor = persistStore(store)


export {
    store,
    persistor
}