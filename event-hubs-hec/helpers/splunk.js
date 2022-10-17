/*
Copyright 2020 Splunk Inc. 

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const axios = require('axios');

const getEpochTime = function(timeString) {
    try {
        let epochTime = new Date(timeString).getTime();
        return epochTime;
    } catch {
        return null;
    }
}

const getTimeStamp = function(message) {
    if(message.hasOwnProperty('time')) {
        return getEpochTime(message["time"]);
    }
    return null;
}

const getHECPayload = async function(message) {
    let payload = message
    return payload
}

const sendToHEC = async function(message) {

    let headers = {
        "Authorization": `Bearer ${process.env["SPLUNK_HEC_TOKEN"]}`
    }

    await getHECPayload(message)
        .then(payload => {
            return axios.post(process.env["SPLUNK_HEC_URL"], payload, {headers: headers});
        })
        .catch(err => {
            throw err;
    });
}

exports.sendToHEC = sendToHEC;
