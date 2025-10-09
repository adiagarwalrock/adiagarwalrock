<template>
  <div class="about-app">
    <h2>About This Project</h2>
    <p>This is a retro OS-themed portfolio website built with Vue.js, Vite, and Pinia.</p>
    <p>It uses 98.css for the styling and WinBox.js for the windowing system.</p>
    <p>The source code is available on <a href="https://github.com/adiagarwalrock/adiagarwalrock" target="_blank">GitHub</a>.</p>

    <p><em>A personal note: I'm grateful for a fun childhood with classics like Tetris and Clippy, which inspired parts of this project.</em></p>

    <h3>Legal Disclaimer</h3>
    <p>
      This project is a personal portfolio created for non-commercial, educational, and demonstration purposes only. It is not a commercial product.
    </p>
    <p class="legal-notice">
      <strong>AS-IS-WARRANTY:</strong> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE SOFTWARE IS WITH YOU.
    </p>
    <p class="legal-notice">
      <strong>LIMITATION OF LIABILITY:</strong> IN NO EVENT SHALL THE AUTHOR OR COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    </p>
    
    <h4>Attributions & Third-Party Assets</h4>
    <p>
      All third-party assets, trademarks, and copyrights are the property of their respective owners. This project does not claim any ownership over them. The use of these assets is for identification and commentary purposes only and does not imply endorsement.
    </p>
    <ul>
      <li>The Tetris game logic is inspired by the classic game.</li>
      <li>Design elements, icons, and the overall user experience are inspired by Microsoft Windows. "Microsoft" and "Windows" are trademarks of Microsoft Corporation.</li>
      <li>Some icons are sourced from <a href="https://icons8.com" target="_blank">Icons8</a>.</li>
    </ul>
  </div>
</template>

<style scoped>
.about-app {
  padding: 20px;
  font-size: 12px;
  line-height: 1.6;
}
.about-app h2 {
  font-size: 16px;
}
.about-app h3 {
  font-size: 14px;
  margin-top: 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
}
.about-app h4 {
  font-size: 12px;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 5px;
}
.about-app p {
  margin-bottom: 10px;
}
.about-app ul {
  margin-left: 20px;
  margin-bottom: 10px;
}
.about-app strong {
  font-weight: bold;
}
.about-app em {
  font-style: italic;
}
.legal-notice {
  font-size: 10px;
  color: #444;
  text-transform: uppercase;
}
</style>