/**
 * Allowed collections
*/

/**
 * @param {name of the collection where going to be inserted} collection string
 * @param {array of collection allowed} collections array[string]
 * @returns boolean !If the collection es in the collections array!
 */
const allowedCollection = (collection = '', collections = []) => {

    const included = collections.includes(collection) //* If the collection is in the collections array

    if(!included){
        throw new Error(`The collection ${collection} isn't allowed`)
    }

    return true

}

export const collections = { allowedCollection }