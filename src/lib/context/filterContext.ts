import { createContext } from "react";
import { Filter } from '@annotations/filter';
export const filterContext = createContext<Filter>(Filter.Daily);
