import readXlsxFile from 'read-excel-file'

export function useFileReader() {

    /**
     * Read an Excel and return an array with the content of the first column
     * @param file
     */
    async function readExcel(file: File) {
        // The response is an array of arrays, an array of every row,
        // we only want the first column, the index 0 of each row
        const rows = await readXlsxFile(file)
        return rows.map((row: string[]) => row[0])
    }

    /**
     * Read a Txt and return an array with the content of the order
     * Used to load existing orders
     * @param file
     */
    async function readText(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = function (event) {
                resolve(event.target.result)
            }

            reader.onerror = function () {
                reject("Error al leer el archivo")
            }

            reader.readAsText(file)
        })
    }

    return {
        readExcel,
        readText,
    }
}

export default useFileReader
