import axios from 'axios';
import xpath from 'xpath';
import { DOMParser } from 'xmldom';

axios.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vRwLysnh2Tf7h2yHBc_bpZLQh6DiFZtDqyhHLYP022xolQUPUHkSModV31E5Y7cLh_8LZGexpXy2VuH/pubhtml?gid=1420050773&single=true&widget=true&headers=false')
    .then(response => {
        const htmlContent = response.data;
        const doc = new DOMParser().parseFromString(htmlContent, 'text/html');
        const nodes = xpath.select("your-xpath-expression", doc);

        for (let i = 0; i < nodes.length; i++) {
            console.log(nodes[i].textContent);
        }
    })
    .catch(error => {
        console.error('Error downloading the website:', error);
    });
