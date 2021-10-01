import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Obrigacoes from "../components/macro/Obrigacoes/Obrigacoes";

const Drawer = createDrawerNavigator();

const Routes = () => {
   return (
      <Drawer.Navigator>
         <Drawer.Screen name="Obrigações" component={Obrigacoes} />
      </Drawer.Navigator>
   );
};

export default Routes;
