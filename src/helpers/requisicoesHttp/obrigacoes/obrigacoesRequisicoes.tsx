import axios from "axios";

const url = "http://192.168.0.87:3005/v2/bd/obrigacoes"; // colocar o IP do Metro (quando der expo start aparece a msg)

export const getObrigacoesPendentes = async (
   Cliente_Id: string,
   dtDe: Date | undefined
) => {
   const dados = await axios.get(`${url}/get_obrigacoes_pendentes_data`, {
      params: { Cliente_Id, dtDe },
   });
   return dados.data;
};
