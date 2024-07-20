
export const HelperFunction = async (url, method, formData, set, stateKey) => {

    const res = await fetch(url, {
        method: method,
        body: formData ? formData : undefined,
    });
    const data = await res.json();
    set({ [stateKey]: data });

};