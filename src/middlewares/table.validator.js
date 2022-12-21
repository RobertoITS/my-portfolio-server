/**
 * Allowed tables
*/

/**
 * @param {name of the table where going to be inserted} table string
 * @param {array of table allowed} tables array[string]
 * @returns boolean !If the table es in the tables array!
 */
const allowedTable = (table = '', tables = []) => {

    const included = tables.includes(table) //* If the table is in the tables array

    if(!included){
        throw new Error(`The table ${table} isn't allowed`)
    }

    return true

}

export const tables = { allowedTable }