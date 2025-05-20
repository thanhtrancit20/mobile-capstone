export const replaceLocalhost = (url: string): string => {
    return url.replace("http://localhost:8085", "http://192.168.2.10:8085");
};