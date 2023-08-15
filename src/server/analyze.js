const axios = require("axios");
const meaningCloud = 'https://api.meaningcloud.com/sentiment-2.1';


const analyze = async(url, key) => {


    const data = await axios.get(`${meaningCloud}?key=${key}&url=${url}&lang=en`);;

    /*
        .then(data => {
            console.log(data.data);
            console.log("==========")
            console.log(data.data.sentence_list)
            return data.data.sentence_list;
        });
*/
    console.log("other:", data.data);

    return {
        subjectivity: data.data.subjectivity,
        irony: data.data.irony,
        sentence_list: data.data.sentence_list
    }
};

module.exports = { analyze };