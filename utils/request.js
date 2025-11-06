let axios = require("axios")

module.exports = async (model,text,mode) => {
    let data = JSON.stringify({
        "model": model,
        "messages": [
            {
                "role": "system",
                "content": text
            }
        ],
        "temperature": mode,
        "max_tokens": 100
    });
    let response = await axios.request({
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.one-api.ir/openai/v1/chat/completions',
        headers: {
            'accept': 'application/json',
            'one-api-token': process.env.ONE_API_TOKEN,
            'Content-Type': 'application/json'
        },
        data: data
    }).then((response) => {        
        if (response.data.status == 200) {
            return response.data.result.choices[0].message.content
        } else {
            return {
                error: true
            }
        }
    })
    return response;
}