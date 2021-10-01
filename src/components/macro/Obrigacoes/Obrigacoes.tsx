import React, { useEffect, useState as useStateReact } from "react";
import {
   ActivityIndicator,
   TextInput,
   Button,
   DataTable,
} from "react-native-paper";
import { StyleSheet } from "react-native";
import { buscaClientes } from "../../../helpers/requisicoesHttp/clientes/clientesRequisicoes";
import SelectField from "../../micro/SelectField/SelectField";
import { Container } from "../../styles/styles";
import { Downgraded, useState } from "@hookstate/core";

import { DatePicker } from "react-native-woodpicker";
import { getObrigacoesPendentes } from "../../../helpers/requisicoesHttp/obrigacoes/obrigacoesRequisicoes";
import Tabela from "../Tabela/Tabela";

const Obrigacoes: any = () => {
   // Hooks
   const clientesLoading = useState(true);
   const botaoLoading = useState(false);
   const clientes = useState([{ value: 0, label: "Carregando...", key: 0 }]);
   const rowsFixo = useState([{}]);

   // Estados valores dos inputs/select
   const clientesValue = useState("");
   const [competenciaDeValue, setCompetenciaDeValue] = useStateReact<Date>();

   // Consts Input 'Competencia De'
   const handleText = (): string =>
      competenciaDeValue
         ? competenciaDeValue.toDateString()
         : "Competência (de)";

   const handleDateChange = (value: any) => {
      setCompetenciaDeValue(value);
   };
   //

   // UseEffect
   useEffect(() => {
      (async function fetch() {
         try {
            const getClientes = await buscaClientes();
            clientes.set(formatarParaSelect(getClientes));
            clientesLoading.set(false);
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
         {clientesLoading.get() ? (
            <ActivityIndicator />
         ) : (
            <SelectField
               label="Selecione um Cliente..."
               items={clientes.attach(Downgraded).get()}
               selectValue={clientesValue}
            />
         )}
         <DatePicker
            value={competenciaDeValue as any}
            onDateChange={(value) => handleDateChange(value)}
            title="Date Picker"
            text={handleText()}
            isNullable
            iosDisplay="inline"
            locale="pt-BR"
         />
         <Button
            icon="camera"
            mode="contained"
            loading={botaoLoading.get()}
            onPress={async () => {
               try {
                  botaoLoading.set(true);
                  const obrigacoesPendentes = await getObrigacoesPendentes(
                     clientesValue.get(),
                     competenciaDeValue
                  );
                  // console.log(obrigacoesPendentes);
                  rowsFixo.set(obrigacoesPendentes);
                  botaoLoading.set(false);
               } catch (error) {
                  console.log(error);
               }
            }}
         >
            Press me
         </Button>
         <Tabela
            rows={rowsFixo.attach(Downgraded).get()}
            colSorted="Razão Social"
            cols={["CNPJ", "Tributação", "Obrigação", "Competência"]}
         />
      </Container>
   );
};

const styles = StyleSheet.create({
   content: {
      padding: 8,
   },
   first: {
      flex: 2,
   },
});

export default Obrigacoes;

// Consts Select
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
