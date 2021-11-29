import { useTable, useSortBy } from 'react-table'

import Sort from 'style/Icon/Sort'
import './Table.scss'

type Props = {
  columns: Array<{ Header: string, accessor: string }>
  data: Array<{[key: string]: any}>
}

const Table: React.FC<Props> = ({ columns, data }) => {
  const tableInstance = useTable({ columns, data}, useSortBy)
  // const ok = useSortBy()

   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance

   return (
      <div className="TableWrapper">  
        <table {...getTableProps()} className="Table">
          <thead>
              {headerGroups.map(({ headers, ...headerGroup }) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headers.map(column => {
                    const { getSortByToggleProps, isSortedDesc, defaultCanSort } = column as any
                    return defaultCanSort ? (
                      <th {...column.getHeaderProps(getSortByToggleProps())}>
                        <span>
                          <Sort isSortedDesc={isSortedDesc}/>
                          {column.render('Header')}
                        </span>
                      </th>
                    ) : (
                      <th {...column.getHeaderProps()}>
                        {column.render('Header')}
                      </th>
                    )})}
                </tr>
              ))}
          </thead>
          <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                )
              })}
            <tr>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
   )
    
}

export default Table