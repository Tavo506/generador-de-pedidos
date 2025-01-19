import {Item} from "../types/types";
import {MaybeRef, useLocalStorage} from "@vueuse/core";

export function useFileWriter() {

    const storageCommerce = useLocalStorage('preferences-commerce', '')
    const storageName = useLocalStorage('preferences-name', '')
    const storagePhone = useLocalStorage('preferences-phone', '')
    const storageEmail = useLocalStorage('preferences-email', '')

    function exportOrderAsTxt(items: Item[], fileName: string) {
        const commerce = storageCommerce.value ? `${storageCommerce.value}\n` : ''
        const name = storageName.value ? `${storageName.value}\n` : ''
        const phone = storagePhone.value ? `Tel: ${storagePhone.value}\n` : ''
        const email = storageEmail.value ? `Email: ${storageEmail.value}\n` : ''

        const header = commerce + name + phone + email
        const content = items.map(item => `${item.quantity} : ${item.name}`).join('\n')
        const fileContent = header ? `${header}\n${content}` : content // If there is content for the header, append a last new line

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
