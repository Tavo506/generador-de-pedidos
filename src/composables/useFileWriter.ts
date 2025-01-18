import {Item} from "../types/types";

export function useFileWriter() {
    function exportOrderAsTxt(items: Item[], fileName: string) {
        const header = `SUPER MARÍA AUXILIADORA\nGustavo Blanco Rojas\nTel: 2463-1546\nCorreo: tavobr1971@gmail.com\n\n` // TODO Load from preferences
        const content = items.map(item => `${item.quantity} : ${item.name}`).join('\n')
        const fileContent = header + content
        // Create the content as a Blob
        const blob = new Blob([fileContent], {type: "text/plain"});
        const url = URL.createObjectURL(blob);

        // Create the download link
        const a = document.createElement("a");
        a.href = url;
        a.download = `${fileName}.txt`;
        document.body.appendChild(a);
        a.click();

        // Clear
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    return {
        exportOrderAsTxt
    }
}
