
/**
 * Helper for file load
 */

const { v4: uuidv4 } = require('uuid')
const path = require('path')

/**
 * @param {file to be upload} fileToUpload res.body ** file
 * @param {extension accepted} extensions array: string
 * @param {path where the file going to be save (in the server)} pathLocation string
 * @returns string fileName
 */
const uploadFiles = (fileToUpload, extensions = ['jpg', 'jpeg', 'png', 'gif', 'bpm', 'svg'], pathLocation = '') => {
    return new Promise((resolve, rejected) => {
        const { file } = fileToUpload //* Get the file
        const extensionAndName = file.name.split('.') //* Get extension and file name (list)
        const extension = extensionAndName[extensionAndName.length - 1] //* Get extension only
        if(!extensions.includes(extension)) { //! Check that the extension is allowed
            return rejected({mgs: `Allowed extension: ${extensions}`});
        }
        const tempName = uuidv4() + '.' + extension //* Create a unique id for the file
        const uploadPath = path.join(__dirname, '../uploads/', pathLocation, tempName) //* File location
        file.mv(uploadPath, function(err) {
            if(err){
                rejected(err) //! Load errors
            }
            resolve(tempName) //* Return file name
        })
    })
}

export const files = { uploadFiles }