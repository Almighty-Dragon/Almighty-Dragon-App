const express = require('express');
const app = express();
const port = 80; // Change port to 80

app.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <title>The Almighty Dragon Cult</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    color: #333;
                }
                .container {
                    width: 80%;
                    max-width: 1200px;
                    background-color: #fff;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    overflow: auto;
                }
                h1 {
                    color: #4CAF50;
                    font-size: 2.5em;
                    margin-top: 0;
                    margin-bottom: 20px;
                }
                h2 {
                    color: #FF5722;
                    font-size: 1.8em;
                    margin-top: 20px;
                    margin-bottom: 10px;
                }
                p {
                    margin: 10px 0;
                    font-size: 1.1em;
                }
                ul {
                    list-style-type: disc;
                    margin-left: 20px;
                    text-align: left;
                    display: inline-block;
                }
                .centered {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    min-height: 100vh;
                    width: 100%;
                }
            </style>
        </head>
        <body>
            <div class="centered">
                <div class="container">
                    <h1>The Almighty Dragon Cult</h1>
                    <h2>Overview:</h2>
                    <p>The Almighty Dragon Cult is an ancient and primordial religious order dedicated to the worship of the Almighty Dragon God, also known as Singularity. This deity is believed to be the origin of all creation, embodying the infinite power and wisdom of the cosmos.</p>
                    
                    <h2>Beliefs:</h2>
                    <ul>
                        <li><strong>Creation and Destruction:</strong> The Almighty Dragon God is revered as the ultimate creator and destroyer, capable of shaping and reshaping the universe at will.</li>
                        <li><strong>Eternal Cycle:</strong> Followers believe in the cyclical nature of existence, where life, death, and rebirth are continuous processes governed by the Almighty Dragon God.</li>
                        <li><strong>Divine Knowledge:</strong> The cult seeks to uncover the hidden truths of the universe, believing that enlightenment can be achieved through communion with Singularity.</li>
                    </ul>
                    
                    <h2>Practices:</h2>
                    <ul>
                        <li><strong>Rituals:</strong> Ceremonies often involve elaborate dragon-themed rituals, including offerings, chants, and dances meant to honor and invoke the presence of the Almighty Dragon God.</li>
                        <li><strong>Meditation:</strong> Deep meditation practices are central, aimed at connecting with the divine essence of Singularity and gaining insights into the mysteries of existence.</li>
                        <li><strong>Symbols:</strong> The dragon, often depicted in intricate and majestic forms, is the primary symbol of the cult, representing power, wisdom, and the eternal cycle.</li>
                    </ul>
                    
                    <h2>Hierarchy:</h2>
                    <ul>
                        <li><strong>High Priests:</strong> The cult is led by high priests who are believed to have a direct connection with the Almighty Dragon God. They guide the followers and interpret divine messages.</li>
                        <li><strong>Followers:</strong> Devotees of the cult come from all walks of life, united by their reverence for the Almighty Dragon God and their quest for enlightenment.</li>
                    </ul>
                    
                    <h2>Sacred Texts:</h2>
                    <ul>
                        <li><strong>The Scrolls of Singularity:</strong> The cult's teachings are preserved in ancient manuscripts known as the Scrolls of Singularity, which contain hymns, prophecies, and philosophical discourses on the nature of existence.</li>
                    </ul>
                    
                    <h2>Community:</h2>
                    <p>The cult fosters a close-knit community where members support each other in their spiritual journeys, sharing knowledge and experiences to deepen their collective understanding of the divine.</p>
                    
                    <p>For more information or to join the Almighty Dragon Cult, please contact the High Priest at the Temple of Singularity.</p>
                </div>
            </div>
        </body>
        </html>
    `);
   });

   app.listen(port, () => {
       console.log(`Server running on http://localhost:${port}`);
   });

