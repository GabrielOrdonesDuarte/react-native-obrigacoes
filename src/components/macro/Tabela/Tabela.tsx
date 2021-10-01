import * as React from "react";
import { StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";

interface TabelaProps {
   rows: Array<object>;
   cols: Array<string>;
   colSorted: string;
}

const Tabela: React.FC<TabelaProps> = ({ rows, cols, colSorted }) => {
   // Hooks
   const [sortAscending, setSortAscending] = React.useState<boolean>(true);
   const [page, setPage] = React.useState<number>(0);
   const [numberOfItemsPerPageList] = React.useState([2, 5, 10, 50]);
   const [itemsPerPage, onItemsPerPageChange] = React.useState(
      numberOfItemsPerPageList[0]
   );

   // Consts
   const sortedItems = rows
      .slice()
      .sort((item1: any, item2: any) =>
         (
            sortAscending
               ? item1.Obrigacao < item2.Obrigacao
               : item2.Obrigacao < item1.Obrigacao
         )
            ? 1
            : -1
      );
   const from = page * itemsPerPage;
   const to = Math.min((page + 1) * itemsPerPage, rows.length);

   // UseEffect
   React.useEffect(() => {
      setPage(0);
   }, [itemsPerPage]);

   return (
      <DataTable>
         <DataTable.Header>
            <DataTable.Title
               key={colSorted}
               sortDirection={sortAscending ? "ascending" : "descending"}
               onPress={() => setSortAscending(!sortAscending)}
               style={styles.first}
            >
               {colSorted}
            </DataTable.Title>
            {cols.map((col, index) => (
               <DataTable.Title key={index}>{col}</DataTable.Title>
            ))}
         </DataTable.Header>

         {sortedItems.slice(from, to).map((item: any) => (
            <DataTable.Row key={item.key}>
               <DataTable.Cell style={styles.first}>
                  {item.Razao_Social}
               </DataTable.Cell>
               <DataTable.Cell>{item.CNPJ}</DataTable.Cell>
               <DataTable.Cell>{item.Tributacao}</DataTable.Cell>
               <DataTable.Cell>{item.Obrigacao}</DataTable.Cell>
               <DataTable.Cell>{item.Competencia}</DataTable.Cell>
            </DataTable.Row>
         ))}

         <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(sortedItems.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} de ${sortedItems.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={"Linhas por pagina"}
         />
      </DataTable>
   );
};

const styles = StyleSheet.create({
   content: {
      padding: 8,
   },
   first: {
      flex: 3,
   },
});

export default Tabela;
