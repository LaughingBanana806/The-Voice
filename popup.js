function askForApiKey() {
    let apiKey = prompt("Please enter your OpenAI GPT API key:");
    if (apiKey !== null && apiKey !== '') {
       localStorage.setItem('openai_api_key', apiKey);
    }
 }
 
async function extractVoiceDescription(text) {
    const openai = require('openai');
    const api_key = localStorage.getItem('openai_api_key');
    openai.api_key = api_key;
 
    const prompt = 'Extract voice description: ' + text;
    const completions = await openai.completions.create({
       engine: 'davinci',
       prompt: prompt,
       max_tokens: 10,
    });
 
    const voice = completions.choices[0].text.trim();
    return voice;
 }
 async function readText() {
    let text = document.querySelector('#text').value;
    let voice = await extractVoiceDescription(text);
    chrome.tts.speak(text, {'voiceName': voice});
 }
 