const linebot = require('../index.js');

const bot = linebot({
  channelId: "2000515389",
  channelSecret: "4e04307c30eedcd1e301b88cff561098",
  channelAccessToken: "0VE30WAVhEGoiKBnsm4XPvJhB/JVA0Fwmh2/bQhG5F2zD+QsHcES1qH3Ji9LHG48IHfXrjQLrAI1K9PKj0Lf24QLd/wXl4P07hL258/FTVxZORfSMPL2gSV/EX1FJTYMOkK0BxZ2VIDgzoX00T5GZAdB04t89/1O/w1cDnyilFU=",
  verify: true // default=true
});


// 定义要推送的用户 ID
const userId = 'U0c401eb2c1dcf4fee7547e3ed11789c7';

// 定义要推送的水果列表
const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon'];

// 开始按顺序推送水果
// pushFruitsSequentially(fruits);

// // 递归函数按顺序推送水果
// function pushFruitsSequentially(fruitList) {
//   if (fruitList.length > 0) {
//     const currentFruit = fruitList.shift(); // 移除并获取列表的第一个水果

//     // 推送消息
//     bot.push(userId, currentFruit)
//       .then(() => {
//         console.log(`Pushed: ${currentFruit}`);

//         // 设置下一次推送的延迟（这里设置为1秒）
//         setTimeout(() => {
//           pushFruitsSequentially(fruitList); // 递归调用，继续下一个水果
//         }, 1000); // 1000毫秒 = 1秒
//       })
//       .catch((err) => {
//         console.error(`Error pushing: ${currentFruit}`, err);
//       });
//   }
// }


bot.on('message', function (event) {
  console.log(`event.message.type message: ${event.message.type}`);
  // bot.getUserProfile()
})


// bot.on('message', function (event) {
//   switch (event.message.type) {
//     case 'text':
//       switch (event.message.text) {
//         case 'Me':
//           event.source.profile().then(function (profile) {
//             return event.reply('Hello ' + profile.displayName + ' ' + profile.userId);
//           });
//           break;
//         case 'Member':
//           event.source.member().then(function (member) {
//             return event.reply(JSON.stringify(member));
//           });
//           break;
//         case 'Picture':
//           event.reply({
//             type: 'image',
//             originalContentUrl: 'https://d.line-scdn.net/stf/line-lp/family/en-US/190X190_line_me.png',
//             previewImageUrl: 'https://d.line-scdn.net/stf/line-lp/family/en-US/190X190_line_me.png'
//           });
//           break;
//         case 'Location':
//           event.reply({
//             type: 'location',
//             title: 'LINE Plus Corporation',
//             address: '1 Empire tower, Sathorn, Bangkok 10120, Thailand',
//             latitude: 13.7202068,
//             longitude: 100.5298698
//           });
//           break;
//         case 'Push':
//           bot.push('U17448c796a01b715d293c34810985a4c', ['Hey!', 'สวัสดี ' + String.fromCharCode(0xD83D, 0xDE01)]);
//           break;
//         case 'Push2':
//           bot.push('Cba71ba25dafbd6a1472c655fe22979e2', 'Push to group');
//           break;
//         case 'Multicast':
//           bot.push(['U17448c796a01b715d293c34810985a4c', 'Cba71ba25dafbd6a1472c655fe22979e2'], 'Multicast!');
//           break;
//         case 'Broadcast':
//           bot.broadcast('Broadcast!');
//           break;
//         case 'Confirm':
//           event.reply({
//             type: 'template',
//             altText: 'this is a confirm template',
//             template: {
//               type: 'confirm',
//               text: 'Are you sure?',
//               actions: [{
//                 type: 'message',
//                 label: 'Yes',
//                 text: 'yes'
//               }, {
//                 type: 'message',
//                 label: 'No',
//                 text: 'no'
//               }]
//             }
//           });
//           break;
//         case 'Multiple':
//           return event.reply(['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']);
//         case 'Total followers':
//           bot.getTotalFollowers().then((result) => {
//             event.reply('Total followers: ' + result.followers);
//           });
//           break;
//         case 'Quota':
//           bot.getQuota().then((result) => {
//             event.reply('Quota: ' + result.value);
//           });
//           break;
//         case 'Total reply':
//           bot.getTotalReplyMessages().then((result) => {
//             event.reply('Total reply messages: ' + result.success);
//           });
//           break;
//         case 'Version':
//           event.reply('linebot@' + require('../package.json').version);
//           break;
//         default:
//           event.reply(event.message.text).then(function (data) {
//             console.log('Success', data);
//           }).catch(function (error) {
//             console.log('Error', error);
//           });
//           break;
//       }
//       break;
//     case 'image':
//       event.message.content().then(function (data) {
//         const s = data.toString('hex').substring(0, 32);
//         return event.reply('Nice picture! ' + s);
//       }).catch(function (err) {
//         return event.reply(err.toString());
//       });
//       break;
//     case 'video':
//       event.reply('Nice video!');
//       break;
//     case 'audio':
//       event.reply('Nice audio!');
//       break;
//     case 'location':
//       event.reply(['That\'s a good location!', 'Lat:' + event.message.latitude, 'Long:' + event.message.longitude]);
//       break;
//     case 'sticker':
//       event.reply({
//         type: 'sticker',
//         packageId: 1,
//         stickerId: 1
//       });
//       break;
//     default:
//       event.reply('Unknown message: ' + JSON.stringify(event));
//       break;
//   }
// });

// bot.on('follow', function (event) {
//   event.reply('follow: ' + event.source.userId);
// });

// bot.on('unfollow', function (event) {
//   event.reply('unfollow: ' + event.source.userId);
// });

// bot.on('join', function (event) {
//   if(event.source.groupId) {
//     event.reply('join group: ' + event.source.groupId);
//   }
//   if(event.source.roomId) {
//     event.reply('join room: ' + event.source.roomId);
//   }
// });

// bot.on('leave', function (event) {
//   if(event.source.groupId) {
//     console.log('leave group: ' + event.source.groupId);
//   }
//   if(event.source.roomId) {
//     console.log('leave room: ' + event.source.roomId);
//   }
// });

// bot.on('memberJoined', function (event) {
//   event.source.profile().then(function (/*profile*/) {
//     if(event.source.type === 'group') {
//       event.reply('memberJoined: Welcome to the group.');
//     }
//     if(event.source.type === 'room') {
//       event.reply('memberJoined: Welcome to the room.');
//     }
//   });
// });

// bot.on('memberLeft', function (/*event*/) {
//   console.log('memberLeft: Goodbye.');
// });

// bot.on('postback', function (event) {
//   event.reply('postback: ' + event.postback.data);
// });

// bot.on('beacon', function (event) {
//   event.reply('beacon: ' + event.beacon.hwid);
// });

bot.listen('/linewebhook', process.env.PORT || 80, function () {
  console.log('LineBot is running.');
});
