/** Componente de acesso as rotas
 */
 import React from "react";

 import { NavigationContainer } from "@react-navigation/native";
 import RootNavigator, { navigationRef } from "./routes/RootNavigator";
 import { LocationProvider } from "./context/LocationContext";
 
 export default function () {
   return (
     <NavigationContainer ref={navigationRef}>
       <LocationProvider>
         <RootNavigator />
       </LocationProvider>
     </NavigationContainer>
   );
 }
 