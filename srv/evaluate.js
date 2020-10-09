const fs = require('fs');

const table = {};
const fengtable = {};

fs.readFile(__dirname + '/resources/majiang_ai.txt', 'utf-8', (err, data) => {
    if (!err) {
        let arr = data.split("\n");
        for (let x of arr) {
            let tmp = x.split(" ");
            table[tmp[0].padStart(9, "0")] = tmp.splice(1, 2).map(Number.parseFloat);
        }
        console.log("已載入", arr.length, table['0'], table['000000000'], table["0".padStart(9, "0")]);
    } else {
        console.error(err);
    }
});

fs.readFile(__dirname + '/resources/majiang_feng.txt', 'utf-8', (err, data) => {
    if (!err) {
        let arr = data.split("\n");
        for (let x of arr) {
            let tmp = x.split(" ");
            fengtable[tmp[0].padStart(7, "0")] = tmp.splice(1, 2).map(Number.parseFloat);
        }
        console.log("已載入", arr.length);
    } else {
        console.error(err);
    }
});

function encodeHands(hands) {
    let result = Array(38).fill(0);
    for (let x of hands) {
        result[x]++;
    }
    result.splice(30, 1);
    result.splice(20, 1);
    result.splice(10, 1);
    result.splice(0, 1);

    return result.join("");
}

function indexToCid(index) {
    let cnt = 0;
    while (index >= (cnt++) * 10)
        index += 1;
    return index;
}

function evaluate(s) {
    let hands = s.split("");
    let arr = Array(4).fill(0).map(() => { return hands.splice(0, 9); });
    // 有將的在哪個花色
    let result = 0;
    for (let i = 0; i < arr.length; i++) {
        let score = 0;
        for (let j = 0; j < arr.length; j++) {
            let c = arr[j].join('');
            try {
                score += (j == 3 ? fengtable : table)[c][i == j ? 0 : 1];
            } catch (error) {
                console.log(c)
            }
        }
        console.log(i, score);
        result = Math.max(result, score);
    }
    return result;
}

function decide(ehands) {
    let out = [];
    let v = -1;
    let s = ehands.split("");
    if (evaluate(s.join("")) !== 4)
        for (let i = 0; i < s.length; i++) {
            if (s[i] > 0) {
                s[i] = s[i] - 1;
                let value = evaluate(s.join(""));
                if (value >= v) {
                    let cid = indexToCid(i);
                    if (value == v)
                        out.push(cid);
                    else
                        out = [cid];
                    v = value;
                }
                console.log(s.join(""), value, out);
                s[i] = s[i] + 1;
            }
        }
    return out;
}

module.exports = decide;