import axios from "axios"


const input = document.querySelector("form input")
const form = document.querySelector("form")

const handleSubmit = async(event) => {
    event.preventDefault();
    console.log("am i sending", document.querySelector("#URI").value);
    document.querySelector("#error").innerHTML = "";
    let formInput = document.querySelector("#URI").value;


    var expression = "(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})";

    var regex = new RegExp(expression);



    if (formInput.match(regex)) {
        console.log("Successful match");









    } else {
        console.log("No match");
        document.querySelector("#error").innerHTML = "Please Enter a valid URL";
        document.querySelector("#error").style.display = "block";

        return
    }




    const response = await axios.post('http://localhost:8000/', {


        input: document.querySelector("#URI").value

    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    console.log("return data", response)
    const { agreement, confidence, score_tag, text, segment_list } = response.data.sentence_list[0];
    const { polarity_term_list } = segment_list[0];
    //const irony = response.data.irony;
    const subjectivity = response.data.subjectivity;



    if (polarity_term_list.length === 0) {
        document.querySelector("#polarity").innerHTML = "Polarity: " + "Negative";
    } else {
        document.querySelector("#polarity").innerHTML = "Polarity: " + "Positive";
    }

    //document.querySelector("#agreement").innerHTML = "Agreeement: " + agreement;
    document.querySelector("#subjectivity").innerHTML = "Subjectivty: " + subjectivity;
    //document.querySelector("#confidence").innerHTML = "Confidence: " + confidence;
    //document.querySelector("#irony").innerHTML = "Irony: " + irony;
    //document.querySelector("#score_tag").innerHTML = "Score Tag:" + score_tag;
    document.querySelector("#text").innerHTML = "Text:" + text;

    return true
}



export { handleSubmit }