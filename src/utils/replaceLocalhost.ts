export const replaceLocalhost = (url: string): string => {
    return url.replace("http://localhost:8085", "http://10.0.2.2:8085");
};