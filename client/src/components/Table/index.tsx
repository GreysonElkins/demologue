import { useTable, useSortBy } from 'react-table'

import Sort from 'style/Icon/Sort'
import './Table.scss'

type Props = {
  columns: Array<{ Header: string; accessor: string }>
  data: Array<{ [key: string]: any }>
  className?: string
  getRowProps?: (row: { [key: string]: any }) => any
}

const Table: React.FC<Props> = ({ columns, data, className, getRowProps }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useSortBy
  )
  return (
    <div className="TableWrapper">
      <table {...getTableProps()} className={`Table ${className || ''}`}>
        <thead>
          {headerGroups.map(({ headers, ...headerGroup }) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headers.map((column) => {
                const { getSortByToggleProps, isSortedDesc, defaultCanSort } = column as any
                return defaultCanSort ? (
                  <th {...column.getHeaderProps(getSortByToggleProps())}>
                    <span>
                      {column.render('Header')}
                      <Sort isSortedDesc={isSortedDesc} />
                    </span>
                  </th>
                ) : (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps(getRowProps && getRowProps(row))}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
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
