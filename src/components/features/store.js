import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import boardSlice from "./boardSlice";
import modalSlice from "./modalSlice";
import themeSlice from './themeSlice'
import currentTask from './currentTask'
import APIres from "./response";
import columnId from "./columnId";
import currentModal from "./currentModal";
import status from "./statusSwitched";
import display  from "./displaySlice";
import changeBoardsInfo from "./boardsInfo";
import storage from "redux-persist/lib/storage";
import {persistReducer,persistStore,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from "redux-persist";

const persistConfig = {
    key:'root',
    storage,
}

const rootReducer = combineReducers(
    {
        data:dataSlice,
        board:boardSlice,
        modal:modalSlice,
        theme:themeSlice,
        current:currentTask,
        res:APIres,
        columnId:columnId,
        frame:currentModal,
        status:status,
        display:display,
        boardsInfo:changeBoardsInfo
    }
)

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:{
            ignoreActions:[  FLUSH, REHYDRATE, PAUSE, PERSIST,PURGE,REGISTER]
        }
    }),
})

export const persistor = persistStore(store)