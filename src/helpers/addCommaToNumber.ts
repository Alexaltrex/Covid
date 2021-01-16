export const addCommaToNumber = (n: number): string => {
    let nString: string = `${n}`;
    let length = nString.length;
    let result = '';
    while (length > 3) {
        result = '.' + nString.slice(length - 3) + result; // добавили к результату
        nString = nString.slice(0, length - 3); //отрезали
        length = length - 3;
    }
    result = nString + result;
    return result;
};