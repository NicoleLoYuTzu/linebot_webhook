// const express = require('express')
// const middleware = require('@line/bot-sdk').middleware
// const ngrok = require('ngrok');
// const crypto = require("crypto");


// // Compare x-line-signature request header and the signature


// const JSONParseError = require('@line/bot-sdk').JSONParseError
// const SignatureValidationFailed = require('@line/bot-sdk').SignatureValidationFailed

// const app = express()

// const config = {
//     channelSecret: '4e04307c30eedcd1e301b88cff561098', // 替换为您的Channel Secret
//     channelAccessToken: "W9Q1V8OHyMXA4CZ3iYwlr7U78PjOlHYmRPIrJlDkdJKrdCrtrR1CVnqE9cGqG3muIHfXrjQLrAI1K9PKj0Lf24QLd/wXl4P07hL258/FTVxYkndQu0cnSDfToIRo2ZlmSAvH0wSddSOYW+QO0/eTZwdB04t89/1O/w1cDnyilFU=" // 替换为您的Channel Access Token
// }

// app.use(middleware(config))
// app.post('/webhook', (req, res) => {
//     const channelSecret = '4e04307c30eedcd1e301b88cff561098'; // 替换为您的 Channel Secret
//     const body = JSON.stringify(req.body); // 获取请求体并转换为 JSON 字符串
//     console.log('Received webhook:', req.body);
//     const signature = crypto
//       .createHmac("SHA256", channelSecret)
//       .update(body)
//       .digest("base64");
    
//     // 获取 x-line-signature 请求头
//     const headerSignature = req.get('x-line-signature');
//     console.log('Header Signature:', headerSignature);
//     console.log(' Signature:', signature);
//     // 比较签名
//     if (signature === headerSignature) {
//         console.log('Header Signature:', headerSignature);
//       // 签名匹配，请求是有效的
//       // 在这里处理您的 LINE Bot 逻辑
//       res.sendStatus(200);
//     } else {
//       // 签名不匹配，请求无效
//       console.log('Header Signature:', headerSignature);
//       res.sendStatus(401);
//     }
// });


// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })


// app.use((err, req, res, next) => {
    
// console.log('Computed Signature:', err.signature);
//     if (err instanceof SignatureValidationFailed) {
//       res.status(401).send(err.signature)
//       return
//     } else if (err instanceof JSONParseError) {
//       res.status(400).send(err.raw)
//       return
//     }
//     next(err) // will throw default 500
//   })


// app.listen(8080, () => {
//     // 启动 ngrok 隧道
//     (async function () {
//       try {
//         const url = await ngrok.connect(8080); // 将端口号替换为您的 Express.js 服务器端口号
//         console.log(`Public URL: ${url}`);
//       } catch (error) {
//         console.error('Error starting ngrok:', error);
//       }
//     })();
//     console.log('Server is running on port 8080');
  


//   });
  
const crypto = require( 'crypto' );
const middleware = require('@line/bot-sdk').middleware
const express = require( 'express' );
const app = express();

const API_SECRET = 'secret';

const config = {
    channelSecret: '4e04307c30eedcd1e301b88cff561098', // 替换为您的Channel Secret
    channelAccessToken: "W9Q1V8OHyMXA4CZ3iYwlr7U78PjOlHYmRPIrJlDkdJKrdCrtrR1CVnqE9cGqG3muIHfXrjQLrAI1K9PKj0Lf24QLd/wXl4P07hL258/FTVxYkndQu0cnSDfToIRo2ZlmSAvH0wSddSOYW+QO0/eTZwdB04t89/1O/w1cDnyilFU=" // 替换为您的Channel Access Token
}

app.use( express.json( { verify: ( req, res, buffer ) => { req.rawBody = buffer; } } ) );
app.use(middleware(config));

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.post( '/', ( req, res ) => {
    const signature = _generateSignature( req.method, req.url, req.headers[ 'x-cs-timestamp' ], req.rawBody );

    if ( signature !== req.headers[ 'x-cs-signature' ] ) {
        return res.sendStatus( 401 );
    }

    console.log( 'received webhook', req.body );
    res.sendStatus( 200 );
} );

const port = 81; // 指定端口号

app.listen(port, () => {
    console.log(`Node.js server started on port ${port}.`);
});


function _generateSignature( method, url, timestamp, body ) {
    const hmac = crypto.createHmac( 'SHA256', API_SECRET );

    hmac.update( `${ method.toUpperCase() }${ url }${ timestamp }` );

    if ( body ) {
        hmac.update( body );
    }

    return hmac.digest( 'hex' );
}

