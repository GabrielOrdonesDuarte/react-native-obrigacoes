import React, { useEffect } from "react";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { buscaClientes } from "../../../helpers/requisicoesHttp/clientes/clientesRequisicoes";
import SelectField from "../../micro/SelectField/SelectField";
import { Container } from "../../styles/styles";
import { Downgraded, useState } from "@hookstate/core";

const Obrigacoes: any = () => {
   // Hooks
   const loading = useState(true);
   const clientesValue = useState("");
   const clientes = useState([{ value: 0, label: "Carregando...", key: 0 }]);

   // Consts
   const formatarParaSelect = (clientesArrayObj: any) => {
      const exibe = clientesArrayObj.map((cliente: any) => {
         const formatarCliente = { value: null, label: "", key: null };
         formatarCliente.value = cliente.ID;
         formatarCliente.key = cliente.ID;
         formatarCliente.label = cliente.Razao_Social;
         return formatarCliente;
      });
      return exibe;
   };

   // UseEffect
   useEffect(() => {
      (async function fetch() {
         try {
            const getClientes = await buscaClientes();
            clientes.set(formatarParaSelect(getClientes));
            loading.set(false);
         } catch (error) {
            console.log(error);
         }
      })();
   }, []);

   return (
      <Container>
         {/* <TextInput
            label="Username"
            onChangeText={(text) => console.log(text)}
         /> */}
         {loading.get() ? (
            <ActivityIndicator />
         ) : (
            <SelectField
               label="Selecione um Cliente..."
               items={clientes.attach(Downgraded).get()}
               selectValue={clientesValue}
            />
         )}
      </Container>
   );
};

export default Obrigacoes;
