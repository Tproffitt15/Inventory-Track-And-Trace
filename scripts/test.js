let metatdata = '{"name":"Spongebob Cowboy Pants","description":"A silent hero. A watchful protector.","image":"https://i.imgur.com/v7U019j.png","strengthLevel":78,"bestFriend":"Patrick"}'

let objJsonStr = JSON.stringify(metatdata);

let objJsonB64 = Buffer.from(objJsonStr).toString("base64");

console.log(objJsonB64)