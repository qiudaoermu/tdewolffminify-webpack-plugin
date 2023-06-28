import {  string } from '@tdewolff/minify';

const s = string('text/html', '<span style="color:#ff0000;" class="text">Some  text</span>')
const js = string('application/javascript', 'function testAdd(pre,cur) {return pre + cur;}')
console.log(s)  // <span style=color:red class=text>Some text</span>
console.log(js)