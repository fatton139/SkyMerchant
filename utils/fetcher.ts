import axios from "axios";

export const postFetcher = async (url: string) => {
    return (await axios.post(url)).data;
};
