import axios from "axios";

const url = "http://192.168.0.87:3005/v2/bd/clientes"; // colocar o IP do Metro (quando der expo start aparece a msg)

export const buscaClientes = async (): Promise<any> => {
   try {
      const dados = await axios.get(`${url}/get_empresas`);
      return dados.data;
   } catch (error) {
      console.log(error);
   }
};
