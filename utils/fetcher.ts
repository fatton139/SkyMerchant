import axios from "axios";

export const postFetcher = async (url: string) => {
    return (await axios.post(url)).data;
};

export const getFetcher = async (url: string) => {
    return (await axios.get(url)).data;
};
