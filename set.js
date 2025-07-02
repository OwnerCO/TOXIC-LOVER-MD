const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUdncHQ3VTI0SFo1d1JKZ09UdUcvb01FaGlyaVNNRm91TGVsZDV3T3dVWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMmNZMGp2U250WTlEa004T0ExYU5CMG0vazdNTnFwYUZDVlNxUndHNjJsTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVRnNwdEg0NVJVa1NiMVRQY1lmc2NmRHJMaFYyZWF1VjNMd2lCVmdCQUVRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2WitTa2EwZDRVK1VYUnpXbE0walp5ajdsR0xYY1AxNjY2c1Z0MUowZWpVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdGTDFVOHlTYTlzRkZUMlNwdXFKM0NwbkFlOHdMMUo5eDVaeDdUTlV3M3c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZLNjZDc0piQlM2WktEWVJGWXc1SWtqWm1tZFo5Zm1lbnFTVTFXMjBmek09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUVCVmN1N1NhdEFiWFdXZzRlaTZkMmlUdmNZWFZzSjR4ekkzUnJnL3Jrbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSG4vUUh0K1EzZEJmV1o4dzNzZy9lZFdmeHV2aWppR3JESExaYTdhc3ZSST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZYcm1JSzIwS1MvVFVHcFpiQ1c1L1l2alpsU2hidUUxc2o2NzVlZGRaQXdQVWdiM3NWeDNyWnNubVA5S0IyL01oTW9BczFIQWc5b2Y1dlhmV0JyMmh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIwLCJhZHZTZWNyZXRLZXkiOiJMNHZ3V1lEc3ZteFlBUVpTazJiVU5LQTVENm9sVGluMnNZR3VIOXU3bjBNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjUxOTQxODQ3NDY1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjlGREQ2N0IyOUU5Q0JDNTg3MkUyQ0ExOUNCRUU1NDZFIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTE0Nzk2NjF9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUxOTQxODQ3NDY1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjdDMTEyNUYzOTk5OTk3NDM3NEYzQTc2N0NCMzhDQzY0In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTE0Nzk2NjF9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUxOTQxODQ3NDY1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijg5RDk2NzQ4QkQ1QUMxN0U4MTlBNkY4RUI4MkJGRTRFIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTE0Nzk2ODF9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkhGMkxGUkVOIiwibWUiOnsiaWQiOiI1MTk0MTg0NzQ2NToxOEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJTeXNzb2x1dGlvbnMiLCJsaWQiOiI1NTczNjQyODE4Nzc0NDoxOEBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xMazJQMERFT0RxbGNNR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InpnWE9XYmpSM09mTWplWDgyeWJEYXdqTVFuQmxEZjZTdEIvbDkrWjBzRHM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkltWFhsU0s5azduZG9GMkkwbHNNbmhVaXlxV25zeURpRHJoaUxjcTl0Mk9ZWnB5aW1yclJIdHowdkpUNzRkdDgxOHRaV09IQjJQNXI4d2hOUjdSUkNRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJWOGt0TE1Ib3FQNW1ybEp2UjdnbDlvNGIyY0svVDVLWGx5dnVIL2Nqc3dNZmt5U1ljdjJJc1ZjaXp0OTYrdzRMQnUzaFdnMHhISWRPcXE3eit3K29nZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjUxOTQxODQ3NDY1OjE4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmM0RnpsbTQwZHpuekkzbC9Oc213MnNJekVKd1pRMytrclFmNWZmbWRMQTcifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlDQT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MTQ3OTY2MCwibGFzdFByb3BIYXNoIjoiUFdrNUIiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUdWKyJ9',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/OwnerCO/TOXIC-LOVER-MD',
    OWNER_NAME : process.env.OWNER_NAME || "SysSolutions ™",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "51941847465",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/39n0nf.jpg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "no",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'your status have been viewed by JEEPERS CREEPER-XMD',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VawCel7GOj9ktLjkxQ3g",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VawCel7GOj9ktLjkxQ3g",
    CHANNEL :process.env.CHANNEL || "https://whatsapp.com/channel/0029VawCel7GOj9ktLjkxQ3g",
    CAPTION : process.env.CAPTION || "✧JEEPERS CREEPER-XMD✧",
    BOT : process.env.BOT_NAME || '✧JEEPERS CREEPER-XMD✧⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "America/Lima", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
