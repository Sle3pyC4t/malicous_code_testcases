const {
      default: makeWASocket,
      useMultiFileAuthState,
      DisconnectReason,
      fetchLatestBaileysVersion,
      Browsers,
    } = require('@whiskeysockets/baileys');
    const fs = require('fs');
    const path = require('path'); 
    const P = require('pino');
    const express = require('express');
    const { readEnv } = require('./lib/database');
    const { sms } = require('./lib/msg');
    const config = require('./config');
    const { commands } = require('./command');

    global.startTime = Date.now();

  
    const plugins = fs.readdirSync(path.join(__dirname, 'mplugins')).filter(file => file.endsWith('.js'));
    for (const file of plugins) {
      require(`./mplugins/${file}`);
    }

    const app = express();
    const port = process.env.PORT || 8000;

    if (!config.SESSION_ID) throw new Error('Please set your SESSION_ID in Heroku config vars.');
    if (!config.OWNER_NUMBER) console.warn('WARNING: OWNER_NUMBER not set. Owner commands will fail.');
    else console.log(`[Setup] OWNER_NUMBER: ${config.OWNER_NUMBER}`);

    const sessionPath = './temp/auth';
    if (!fs.existsSync(sessionPath)) {
      fs.mkdirSync(sessionPath, { recursive: true });
    }

    
    let sessionData;
    try {
      const sessionDataJson = Buffer.from(config.SESSION_ID, 'base64').toString('utf-8');
      sessionData = JSON.parse(sessionDataJson);
 
      fs.writeFileSync(`${sessionPath}/creds.json`, JSON.stringify(sessionData, null, 2));
    } catch (e) {
      console.error(`[Session Error] Failed to decode SESSION_ID: ${e.message}`);
      throw new Error('Invalid SESSION_ID format. Ensure it’s valid base64-encoded JSON.');
    }

    async function connectToWA() {
      const envConfig = await readEnv();
      const prefix = envConfig.PREFIX;
      const alwaysOnline = envConfig.ALWAYS_ONLINE;
      const autoLikeStatus = envConfig.AUTO_LIKE_STATUS;

      console.log(`[Setup] ALWAYS_ONLINE: ${alwaysOnline}`);
      console.log(`[Setup] AUTO_LIKE_STATUS: ${autoLikeStatus}`);

      console.log('Connecting MBUVI MD...');
      const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
      const { version } = await fetchLatestBaileysVersion();

      const conn = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: true,
        browser: Browsers.macOS('Chrome'),
        syncFullHistory: true,
        auth: state,
        version,
        defaultQueryTimeoutMs: 60000,
        keepAliveIntervalMs: 30000,
      });

      conn.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        console.log(`Connection status: ${connection}`);

        if (connection === 'close') {
          console.log('Connection closed! Reconnecting...');
          if (lastDisconnect.error?.output.statusCode !== DisconnectReason.loggedOut) {
            connectToWA();
          }
        } else if (connection === 'open') {
          console.log('📡 Connected to WhatsApp!');
          if (config.OWNER_NUMBER) {
            const ownerJid = `${config.OWNER_NUMBER}@s.whatsapp.net`;
            const welcomeMessage = `
    ╔═══════════════════◇
    ║『 MBUVI MD CONNECTED』
    ║ ✨MBUVI-MD🔷
    ║ ✨Mbuvi Tech🔷
    ╚══════════════════╝
    ________________________
    ╔═════════════════════◇
    ║『 MBUVI MD ONLINE 』
    ║ ❍ Botname - MBUVI MD
    ║ ❍ Prefix  - .

    ╚═══════════════════╝
    ╔════════════════════◇
    ║『••• _V𝗶𝘀𝗶𝘁 𝗙𝗼𝗿_H𝗲𝗹𝗽 •••』 
    ║ ❍ 𝐎𝐰𝐧𝐞𝐫: _https://wa.me/254746440595_
    ║ ❍ 𝐑𝐞𝐩𝐨: _https://github.com/cheekydavy/mbuvimd_
    ║ ❍ 𝐖𝐚�{G}𝐫𝐨𝐮𝐩: _https://chat.whatsapp.com/JZxR4t6JcMv66OEiRRCB2P_
    ║ ❍ 𝐖𝐚𝐂𝐡𝐚𝐧𝐧𝐞𝐬𝐥: _https://whatsapp.com/channel/0029VaPZWbY1iUxVVRIIOm0D_
    ║ ❍ 𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦: _https://www.instagram.com/_mbuvi_
    ║ ☬ ☬ ☬ ☬
    ╚═══════════════════╝ 
     𒂀 MBUVI MD
    ______________________________`;
            try {
              await conn.sendMessage(ownerJid, { text: welcomeMessage }, { timeout: 60000 });
            } catch (e) {
              console.error(`[Welcome Error] Failed: ${e.message}`);
            }
          }

          if (alwaysOnline) {
            setInterval(async () => {
              try {
                if (conn.user && conn.ws && conn.ws.readyState === 1) {
                  await conn.sendPresenceUpdate('available');
                }
              } catch (e) {
                console.error(`[Always Online Error] ${e.message}`);
              }
            }, 10000);
          }
        }
      });

      conn.ev.on('creds.update', saveCreds);

      conn.ev.on('messages.upsert', async (mek) => {
        const msg = mek.messages[0];
        
        // Handle button replies
        if (msg.message?.buttonsResponseMessage) {
          const buttonId = msg.message.buttonsResponseMessage.selectedButtonId;
          const from = msg.key.remoteJid;
          const sender = msg.key.fromMe ? conn.user.id : msg.key.participant || msg.key.remoteJid;
          const senderNumber = sender.split('@')[0].split(':')[0];
          const botNumber = conn.user.id.split(':')[0];
          const botNumber2 = conn.user.id;
          const pushname = msg.pushName || 'unknown';
          const isOwner = senderNumber === config.OWNER_NUMBER || senderNumber === botNumber;

          const reply = async (text) => {
            try {
              await sms(conn, from, text, msg, { timeout: 60000 });
            } catch (e) {
              console.error(`[Button Reply Error] Failed: ${e.message}`);
            }
          };

          let commandPattern;
          if (buttonId === 'menu_btn') commandPattern = 'menu';
          else if (buttonId === 'help_btn') commandPattern = 'help';
          else if (buttonId === 'alive_btn') commandPattern = 'alive';
          else return;

          const matchedCmd = commands.find(cmd => cmd.pattern === commandPattern);
          if (!matchedCmd) {
            await reply(`❌ Command ${commandPattern} not found.`);
            return;
          }

          if (matchedCmd.category === 'owner' && !isOwner) {
            await reply('⚠️ This command is restricted to the bot owner only.');
            return;
          }

          try {
            await matchedCmd.function(conn, msg, msg, {
              from, quoted: msg, body: prefix + commandPattern, isCmd: true, command: commandPattern,
              args: [], q: '', sender, senderNumber, botNumber2, botNumber, pushname, isOwner, reply
            });
          } catch (e) {
            console.error(`[Button Command Error] ${commandPattern}: ${e.message}`);
            await reply(`❌ Error: ${e.message}`);
          }
          return;
        }

        // Existing message handler
        if (msg.key && msg.key.remoteJid === 'status@broadcast') {
          try {
            await conn.readMessages([msg.key]);

            if (autoLikeStatus && msg.key.participant) {
              const likeEmoji = process.env.AUTO_STATUS_LIKE_EMOJI || '❤️';
              try {
                await conn.sendMessage(
                  'status@broadcast',
                  {
                    react: {
                      text: likeEmoji,
                      key: msg.key
                    }
                  },
                  {
                    statusJidList: [msg.key.participant, conn.user.id.split(':')[0] + '@s.whatsapp.net']
                  }
                );
              } catch (e) {
                // Silent failure
              }
            }
          } catch (e) {
            // Silent failure
          }
          return;
        }

        if (!msg.message || msg.key.remoteJid === 'status@broadcast') return;

        const m = msg;
        const from = msg.key.remoteJid;
        const sender = msg.key.fromMe ? conn.user.id : msg.key.participant || msg.key.remoteJid;
        const senderNumber = sender.split('@')[0].split(':')[0];
        const botNumber = conn.user.id.split(':')[0];
        const botNumber2 = conn.user.id;
        const pushname = msg.pushName || 'unknown';
        const body = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
        const args = body.trim().split(/ +/).slice(1);
        const command = body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase();
        const isCmd = body.startsWith(prefix);
        const q = args.join(' ');

        const reply = async (text) => {
          try {
            await sms(conn, from, text, msg, { timeout: 60000 });
          } catch (e) {
            console.error(`[Reply Error] Failed: ${e.message}`);
          }
        };

        if (!isCmd) return;

        const matchedCmd = commands.find(cmd => cmd.pattern === command);
        if (!matchedCmd) return;

        const isOwner = senderNumber === config.OWNER_NUMBER || senderNumber === botNumber;
        if (matchedCmd.category === 'owner' && !isOwner) {
          await reply('⚠️ This command is restricted to the bot owner only.');
          return;
        }

        try {
          await matchedCmd.function(conn, msg, m, {
            from, quoted: msg, body, isCmd, command, args, q, sender,
            senderNumber, botNumber2, botNumber, pushname, isOwner, reply
          });
        } catch (e) {
          console.error(`[Command Error] ${command}: ${e.message}`);
          await reply(`❌ Error: ${e.message}`);
        }
      });
    }

    app.get('/', (req, res) => res.send('MBUVI MD started ✅'));

    app.listen(port, () => console.log(`Server running on port ${port}`));

    setTimeout(() => connectToWA(), 4000);
