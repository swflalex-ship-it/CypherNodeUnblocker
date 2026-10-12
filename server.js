const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 8080;

// Main Interface - Dashboard & Masking Configurations
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            
            <!-- Google Drive Tab Masking (Fake Title & Icon) -->
            <title>My Drive - Google Drive</title>
            <link rel="icon" type="image/x-icon" href="https://gstatic.com">
            
            <style>
                :root { 
                    --bg: #06090e; 
                    --panel: #0d121a; 
                    --accent-petezah: #ff4757; /* Cosmic Crimson */
                    --accent-fern: #00ff88;    /* Radioactive Green */
                    --text: #f5f6fa; 
                    --muted: #8b9bb4; 
                }
                
                body { 
                    background-color: var(--bg); 
                    background-image: 
                        radial-gradient(circle at 10% 20%, rgba(255, 71, 87, 0.08) 0%, transparent 40%),
                        radial-gradient(circle at 90% 80%, rgba(0, 255, 136, 0.06) 0%, transparent 45%);
                    color: var(--text); 
                    font-family: 'Segoe UI', system-ui, sans-serif; 
                    margin: 0; 
                    padding: 20px; 
                    display: flex; 
                    flex-direction: column; 
                    align-items: center; 
                    min-height: 100vh; 
                    box-sizing: border-box; 
                }
                
                .container { width: 100%; max-width: 900px; text-align: center; }
                
                .brand-title {
                    font-size: 3.2rem;
                    font-weight: 900;
                    margin-bottom: 5px;
                    letter-spacing: 5px;
                    font-family: 'Courier New', Courier, monospace; 
                    background: linear-gradient(135deg, var(--accent-petezah), var(--accent-fern));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                
                .panic-banner {
                    background: rgba(255, 71, 87, 0.12);
                    border: 1px dashed var(--accent-petezah);
                    padding: 10px 18px;
                    border-radius: 8px;
                    font-size: 0.85rem;
                    display: inline-block;
                    margin-bottom: 30px;
                    color: #ff6b81;
                }
                
                .search-box { 
                    display: flex; 
                    background: var(--panel); 
                    border: 2px solid #1a2332; 
                    border-radius: 50px; 
                    padding: 6px 14px; 
                    width: 100%; 
                    max-width: 600px; 
                    margin: 0 auto 40px auto; 
                    box-shadow: 0 0 20px rgba(0, 255, 136, 0.05);
                    transition: all 0.3s;
                }
                .search-box:focus-within {
                    border-color: var(--accent-fern);
                    box-shadow: 0 0 25px rgba(0, 255, 136, 0.15);
                }
                
                .search-box input { flex: 1; border: none; background: transparent; padding: 12px; color: #fff; font-size: 16px; outline: none; }
                .search-box button { 
                    background: var(--accent-fern); 
                    border: none; 
                    color: #000; 
                    padding: 0 25px; 
                    border-radius: 25px; 
                    font-weight: bold; 
                    cursor: pointer; 
                    transition: all 0.2s; 
                }
                .search-box button:hover { transform: scale(1.03); background: #00cc6e; }
                
                .grid-title { text-align: left; font-size: 1.1rem; font-weight: 600; margin-bottom: 15px; color: var(--muted); border-bottom: 2px solid #1a2332; padding-bottom: 8px; }
                .app-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px; width: 100%; }
                
                .app-card { 
                    background: var(--panel); 
                    border: 1px solid #1a2332; 
                    border-radius: 12px; 
                    padding: 20px; 
                    text-align: center; 
                    cursor: pointer; 
                    transition: all 0.3s ease; 
                }
                .app-card:hover { 
                    transform: translateY(-4px); 
                    border-color: var(--accent-petezah); 
                    box-shadow: 0 8px 24px rgba(255, 71, 87, 0.15); 
                }
                
                .app-icon { font-size: 2.3rem; margin-bottom: 10px; display: inline-block; }
                .app-name { font-weight: bold; font-size: 1.1rem; margin-bottom: 5px; }
                .app-desc { font-size: 0.85rem; color: var(--muted); }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="brand-title">CYPHERNODE</div>
                <div class="panic-banner">🚨 <b>Panic Protocol:</b> Press the <b>tilde / backquote key ( ` )</b> at any time to turn this tab into Google Classroom instantly.</div>
                
                <div class="search-box">
                    <input type="text" id="urlInput" placeholder="Search freely or type web address..." onkeydown="if(event.key === 'Enter') launchProxy()">
                    <button onclick="launchProxy()">Execute</button>
                </div>

                <div class="grid-title">🕹️ Web Gaming Nodes & Emulators</div>
                <div class="app-grid">
                    <div class="app-card" onclick="appLaunch('https://archive.org')">
                        <span class="app-icon">🃏</span>
                        <div class="app-name">Deltarune Engine</div>
                        <div class="app-desc">Web browser port indexed via open archive arrays</div>
                    </div>
                    <div class="app-card" onclick="appLaunch('https://playclassic.games')">
                        <span class="app-icon">👾</span>
                        <div class="app-name">Retro Emulator</div>
                        <div class="app-desc">Run millions of open classic games directly in-app</div>
                    </div>
                    <div class="app-card" onclick="appLaunch('https://sneslive.com')">
                        <span class="app-icon">🎮</span>
                        <div class="app-name">16-Bit Legacy Arcade</div>
                        <div class="app-desc">Classic console structures staying completely inside the node</div>
                    </div>
                </div>

                <div class="grid-title">🎬 Public Domain Library Streams</div>
                <div class="app-grid">
                    <div class="app-card" onclick="appLaunch('https://archive.org')">
                        <span class="app-icon">🏛️</span>
                        <div class="app-name">Internet Archive</div>
                        <div class="app-desc">Thousands of open-source films and broadcasts safely hosted</div>
                    </div>
                    <div class="app-card" onclick="appLaunch('https://publicdomainmovie.net')">
                        <span class="app-icon">🎞️</span>
                        <div class="app-name">Public Domain Cinema</div>
                        <div class="app-desc">Classic features and historical programs 100% free of copyrights</div>
                    </div>
                </div>
            </div>

            <script>
                // PANIC PROTOCOL SCRIPT
                window.addEventListener('keydown', function(e) {
                    if (e.key === '`') { 
                        e.preventDefault();
                        window.location.replace('https://classroom.google.com');
                    }
                });

                function launchProxy() {
                    let query = document.getElementById('urlInput').value.trim();
                    if(!query) return;
                    
                    let targetUrl = query;
                    if (!query.includes('.') || query.includes(' ')) {
                        targetUrl = 'https://duckduckgo.com' + encodeURIComponent(query);
                    } else if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
                        targetUrl = 'https://' + targetUrl;
                    }
                    
                    window.location.href = '/proxy/v1?url=' + btoa(targetUrl);
                }

                function appLaunch(url) {
                    window.location.href = '/proxy/v1?url=' + btoa(url);
                }
            </script>
        </body>
        </html>
    `);
});

// Dynamic Route Handler Engine
app.use('/proxy/v1', (req, res, next) => {
    try {
        const encodedTarget = req.query.url;
        if (!encodedTarget) {
            return res.status(400).send('Missing endpoint reference.');
        }

        const decodedUrl = Buffer.from(encodedTarget, 'base64').toString('ascii');
        const parsedTarget = new URL(decodedUrl);
        const originUrl = parsedTarget.origin;

        const proxy = createProxyMiddleware({
            target: originUrl,
            changeOrigin: true,
followRedirects: true,
autoRewrite: true,
protocolRewrite: 'https',
selfHandleResponse: true,
onProxyReq: (proxyReq, req, res) => {
proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (X11; ChromeOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
proxyReq.setHeader('Accept-Encoding', 'identity');
proxyReq.setHeader('Referer', originUrl);
proxyReq.setHeader('Origin', originUrl);
},
onProxyRes: (proxyRes, req, res) => {
const contentType = proxyRes.headers['content-type'] || '';
let body = [];
proxyRes.on('data', (chunk) => body.push(chunk));
proxyRes.on('end', () => {
let responseBuffer = Buffer.concat(body);
if (contentType.includes('text/html') || contentType.includes('application/javascript') || contentType.includes('text/javascript')) {
let contentString = responseBuffer.toString('utf8');
const proxyPrefix = /proxy/v1?url=${encodedTarget}&file=;
contentString = contentString.replace(/(href|src|action)=["']/(?!/)/g, $1="${proxyPrefix}/);
res.writeHead(proxyRes.statusCode, proxyRes.headers);
res.end(contentString);
} else {
res.writeHead(proxyRes.statusCode, proxyRes.headers);
res.end(responseBuffer);
}
});
},
onError: (err, req, res) => {
res.status(500).send('Hub Node Error: The remote destination dropped the pipeline.');
}
});
proxy(req, res, next);
} catch (error) {
res.status(400).send('Base-Layer Mapping Exception Error.');
}
});
app.listen(PORT, () => {
console.log(CypherNode proxy engine processing on port: ${PORT});
});
