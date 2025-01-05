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

    return {
        readExcel
    }
}

export default useFileReader
