export const bytes64ToAscii = (data: string) => {
    const buffer = Buffer.from(data, "base64");
    return buffer.toString("ascii");
};

export const toSvg = (data: string) => {
    const dataIndex = data.indexOf(",") + 1;
    const jsonText = bytes64ToAscii(data.substr(dataIndex));
    if (jsonText === "") {
        return "";
    }
    const json = JSON.parse(jsonText);
    const svgEncrypted = json.image.substr(json.image.indexOf(",") + 1);
    return bytes64ToAscii(svgEncrypted);
};

export const toJSON = (data: string) => {
    const dataIndex = data.indexOf(",") + 1;
    const jsonText = bytes64ToAscii(data.substr(dataIndex));
    return JSON.parse(jsonText);
};
