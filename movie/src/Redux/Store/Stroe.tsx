import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk"; // Correct import without curly braces
import { movieReduce } from "../Reduce/MovieReduce";

// Create the store with the reducer and middleware
export const movieStore = createStore(
  movieReduce,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof movieStore.getState>;
export type AppDispatch = typeof movieStore.dispatch;
