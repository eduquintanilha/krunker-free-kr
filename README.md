

# Krunker Free KR Claim

### A simple automated [Selenium](https://selenium.dev/) script to claim your FreeKR on [Krunker.io](https://krunker.io) game.

## Using
- **After set User and Password environment variables, open terminal and execute:**
```
    npm i --save
```
- **after, execute:**
```
    node src/index.js
```

## Chromedriver Issues
### For Debian based distros, do:

- Go to https://chromedriver.storage.googleapis.com/index.html?path=78.0.3904.70/ and download according your OS and put in ~/Downloads

- **Open therminal in ~/Downloads folder and unzip**
```bash
    unzip ~/Downloads/chromedriver_linux64.zip -d ~/Downloads
```
- **Copy the extracted file to two places**
```bash
    sudo cp -f chromedriver_linux64/chromedriver /usr/local/bin/chromedriver
```
**and**
```bash
    sudo cp -f chromedriver_linux64/chromedriver /usr/bin/chromedriver
```

- **Relaunch your code editor and run the code again ;)**

# License MIT
[MIT](https://choosealicense.com/licenses/mit/)
