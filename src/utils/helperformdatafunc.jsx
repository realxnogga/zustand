

export const HelperFormDataFunc = (credential, imagecredential) => {
    const formData = new FormData();
    formData.append('credential', JSON.stringify(credential));
    formData.append('imagecredential', imagecredential);
    return formData;
};